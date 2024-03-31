"use server";
import { redirect } from "next/navigation";
import { Locations, Coordinates, Profile, WeatherForecast } from "./types";
import { writeFile, mkdir } from "node:fs/promises";

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
  const destination = formData.get("destination") as string;
  const style = formData.get("style") as string;
  const budget = formData.get("budget") as string;
  const companion = formData.get("companion") as string;
  const startDate = formData.get("startDate") as string;
  const endDate = formData.get("endDate") as string;

  const coordinatesResponse = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/cartesian",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ locations: { destination: [destination] } }),
    },
  );

  if (!coordinatesResponse.ok) {
    throw new Error("Failed to get destination coordinates");
  }

  const coordinatesData = await coordinatesResponse.json();
  const destCoords = coordinatesData.coordinates[0][0];

  console.log("destCoords", destCoords);

  // Format date into YYYY-MM-DD
  const [month, day, year] = startDate.split("/");
  let d1 = `${year}-${month}-${day}`;
  const [month2, day2, year2] = endDate.split("/");
  let d2 = `${year2}-${month2}-${day2}`;

  console.log("d1", d1);
  console.log("d2", d2);

  const weather = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL +
      `/api/weather?latitude=${destCoords[1]}&longitude=${destCoords[0]}&startDate=${d1}&endDate=${d2}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  const weatherData = await weather.json();
  const forecast: WeatherForecast = weatherData.weatherForecast;

  console.log("forecast", forecast);

  const response = await fetch(
    process.env.NEXT_PUBLIC_SERVER_URL + "/api/plan",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        destination,
        style,
        budget,
        companion,
        startDate,
        endDate,
        forecast,
      }),
    },
  );

  if (!response.ok) {
    throw new Error("Failed to generate plan");
  }

  const data = await response.json();

  const dbData = {
    destination,
    style,
    budget,
    companion,
    startDate,
    endDate,
    itin: data.locations,
    weather: forecast,
    coordinates: destCoords,
  };
  writeDbData(dbData);

  // return { locations: data.locations, itinerary: data.itinerary };
  return redirect("/itinerary");
}

export async function getRoute(
  startCoordinates: Coordinates,
  endCoordinates: Coordinates,
  profile: Profile,
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
  endDate: string,
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
  endDate: string,
) {
  const response = await fetch(
    `/api/weather?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch weather forecast");
  }

  const data = await response.json();
  return data.weatherForecast;
}

async function writeDbData(data: any) {
  try {
    await mkdir("data", { recursive: true });
    await writeFile("data/db.json", JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Error writing to db.json:", error);
  }
}
