"use server";
import { redirect } from "next/navigation";
import type {
  Locations,
  Coordinates,
  Profile,
  WeatherForecast,
  ClaudeAPIResponse,
  DbData,
  UpdatedLocations,
} from "./types";
import type { FormData } from "@/components/common/travel-form";
import { auth, currentUser } from "@clerk/nextjs";
import db from "./db";
import { itineraries, locations, trips } from "@/models/schema";
import { getDateFromStart, range } from "./utils";
import { fetchWeatherApi } from "openmeteo";
import { weatherCodes } from "./weathercodes";

export async function fetchCoords(locations: Locations) {
  const response = await fetch("/api/cartesian", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ locations }),
  });

  if (!response.ok) {
    throw new Error("Failed to get location coordinates");
  }

  const data = await response.json();
  return data.coordinates;
}

export async function generatePlan(formData: FormData) {
  const user = auth().protect();
  const { destination, style, budget, companion, date, start, end } = formData;

  // const coordinatesResponse = await fetch(
  //   process.env.NEXT_PUBLIC_SERVER_URL + "/api/cartesian",
  //   {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({ locations: { destination: [destination] } }),
  //   },
  // );

  // if (!coordinatesResponse.ok) {
  //   throw new Error("Failed to get destination coordinates");
  // }

  // const coordinatesData = await coordinatesResponse.json();
  // const destCoords = coordinatesData.coordinates[0][0];

  // Format date into YYYY-MM-DD
  const d1 = date.from?.toISOString().split("T")[0];
  const d2 = date.to?.toISOString().split("T")[0];
  let weather = [] as WeatherForecast[] | undefined;
  if (d1 && d2) {
    weather = await getWeatherForecast(
      destination.lat,
      destination.lng,
      d1,
      d2
    );
  }

  console.log("weather", weather);
  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/plan",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination: destination.name,
        style,
        budget,
        companion,
        startDate: date.from?.toDateString(),
        endDate: date.to?.toDateString(),
        forecast: weather,
        startTime: start,
        endTime: end,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to generate plan");
  }

  const data: ClaudeAPIResponse = await response.json();

  const updatedLocations: UpdatedLocations = {};

  console.log("Inserting data into DB for user", user.userId);

  await Promise.all(
    Object.entries(data.locations).map(async ([day, locations]) => {
      let dailyBudget = 0;
      const updatedLocationsForDay = await Promise.all(
        locations.map(async (location) => {
          dailyBudget += Number(location.budget) ?? 0;
          const coordinatesResponse = await fetch(
            process.env.NEXT_PUBLIC_SERVER_URL + "/api/cartesian",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                location: location.location,
                countrycode: destination.countrycode,
                proximity: [destination.lng, destination.lat],
              }),
            }
          );
          if (!coordinatesResponse.ok) {
            throw new Error("Failed to get destination coordinates");
          }
          const coordinatesData = await coordinatesResponse.json();
          const coordinates = coordinatesData.coordinates;
          return {
            ...location,
            coordinates,
          };
        })
      );
      updatedLocations[day] = { dailyBudget, updatedLocationsForDay};
    })
  );

  const trip = await db
    .insert(trips)
    .values({
      userId: user.userId,
      city: destination.name,
      coordinates: destination.coordinates,
      countrycode: destination.countrycode,
      companions: companion.join(","),
      overallBudget: budget,
      travelStyle: style,
      startDate: date.from?.toDateString(),
      endDate: date.to?.toDateString(),
    })
    .returning();

  for (const [day, lcns] of Object.entries(updatedLocations)) {
    const itin = await db
      .insert(itineraries)
      .values({
        tripId: trip[0].id,
        date: getDateFromStart(date.from!, day).toDateString(),
        dailyBudget: lcns.dailyBudget,
        // note,
      })
      .returning();
    for (const lcn of lcns.updatedLocationsForDay) {
      await db.insert(locations).values({
        itineraryId: itin[0].id,
        budget: lcn.budget,
        locationName: lcn.location,
        activity: lcn.activity,
        coordinates: lcn.coordinates ? lcn.coordinates.join(",") : "",
        time: lcn.time,
        locationType: lcn.locationType,
      });
    }
  }
  console.log("Inserted data into DB for user", user.userId);
  redirect(`/itinerary/${trip[0].id}`);
}

export async function getRoute(
  startCoordinates: Coordinates,
  endCoordinates: Coordinates,
  profile: Profile
) {
  const response = await fetch("/api/route", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ startCoordinates, endCoordinates, profile }),
  });

  if (!response.ok) {
    throw new Error("Failed to get route");
  }

  const data = await response.json();
  return data.route;
}

export async function replaceItinerarySuggestion(
  itinerary: any,
  day: number,
  destination: string,
  style: string,
  budget: string,
  companion: string,
  startDate: string,
  endDate: string
) {
  const response = await fetch("/api/replace", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      itinerary,
      day,
      destination,
      style,
      budget,
      companion,
      startDate,
      endDate,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to update itinerary");
  }

  const data = await response.json();
  return data.itinerary;
}

export async function getWeatherForecast(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
) {
  const params = {
    latitude,
    longitude,
    daily: ["weathercode", "rain_sum", "showers_sum", "snowfall_sum"],
    timezone: "GMT",
    start_date: startDate,
    end_date: endDate,
  };
  const url = "https://api.open-meteo.com/v1/forecast";

  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    // Attributes for timezone and location
    const utcOffsetSeconds = response.utcOffsetSeconds();
    const daily = response.daily()!;
    const weatherData = {
      daily: {
        time: range(
          Number(daily.time()),
          Number(daily.timeEnd()),
          daily.interval()
        ).map((t) => new Date((t + utcOffsetSeconds) * 1000)),
        weatherCode: daily.variables(0)!.valuesArray()!,
        rainSum: daily.variables(1)!.valuesArray()!,
        showersSum: daily.variables(2)!.valuesArray()!,
        snowfallSum: daily.variables(3)!.valuesArray()!,
      },
    };

    const weatherForecast: WeatherForecast[] = weatherData.daily.time.map(
      (date: Date, index: number) => {
        const weatherCode = weatherData.daily.weatherCode[index];
        const weatherType =
          weatherCodes[weatherCode.toString()].day.description;

        return {
          date,
          weatherCode,
          weatherType,
        } as WeatherForecast;
      }
    );
    return weatherForecast;
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}
