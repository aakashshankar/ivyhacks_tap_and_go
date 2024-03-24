// app/api/weather.ts
import { weatherCodes } from "@/lib/weathercodes";
import { NextRequest, NextResponse } from "next/server";
import { fetchWeatherApi } from "openmeteo";

// Helper function to form time ranges
const range = (start: number, stop: number, step: number) =>
  Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const startDate = searchParams.get("startDate");
  const endDate = searchParams.get("endDate");

  if (!latitude || !longitude || !startDate || !endDate) {
    return NextResponse.json(
      { error: "Missing required parameters" },
      { status: 400 }
    );
  }

  const params = {
    latitude: parseFloat(latitude),
    longitude: parseFloat(longitude),
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
    const timezone = response.timezone();
    const timezoneAbbreviation = response.timezoneAbbreviation();
    const latitude = response.latitude();
    const longitude = response.longitude();
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

    const weatherForecast = weatherData.daily.time.map(
      (date: Date, index: number) => {
        const weatherCode = weatherData.daily.weatherCode[index];
        const weatherType = weatherCodes[weatherCode.toString()].day.description;

        return {
          date,
          weatherCode,
          weatherType,
        };
      }
    );

    return NextResponse.json({ weatherForecast });
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return NextResponse.json(
      { error: "Failed to fetch weather data" },
      { status: 500 }
    );
  }
}
