// app/api/weatherForecast.ts
import { NextRequest, NextResponse } from 'next/server';
import { fetchWeatherApi } from 'openmeteo';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get('latitude');
  const longitude = searchParams.get('longitude');
  const startDate = searchParams.get('startDate');
  const endDate = searchParams.get('endDate');

  if (!latitude || !longitude || !startDate || !endDate) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
  }

  const params = {
    latitude: Number(latitude),
    longitude: Number(longitude),
    current: ['temperature_2m', 'precipitation'],
    hourly: ['temperature_2m', 'rain', 'showers', 'snowfall'],
    start_date: startDate,
    end_date: endDate,
  };

  const url = 'https://api.open-meteo.com/v1/forecast';

  try {
    const responses = await fetchWeatherApi(url, params);
    const response = responses[0];

    const utcOffsetSeconds = response.utcOffsetSeconds();
    const hourly = response.hourly()!;

    const range = (start: number, stop: number, step: number) =>
      Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

    const weatherData = {
      hourly: {
        time: range(Number(hourly.time()), Number(hourly.timeEnd()), hourly.interval()).map(
          (t) => new Date((t + utcOffsetSeconds) * 1000)
        ),
        temperature2m: hourly.variables(0)!.valuesArray()!,
        rain: hourly.variables(1)!.valuesArray()!,
        showers: hourly.variables(2)!.valuesArray()!,
        snowfall: hourly.variables(3)!.valuesArray()!,
      },
    };

    const weatherForecast = [];

    for (let i = 0; i < weatherData.hourly.time.length; i++) {
      const date = weatherData.hourly.time[i].toISOString().split('T')[0];
      const temperature = weatherData.hourly.temperature2m[i];
      const rain = weatherData.hourly.rain[i];
      const showers = weatherData.hourly.showers[i];
      const snowfall = weatherData.hourly.snowfall[i];

      let weatherCondition = '';
      if (snowfall > 0) {
        weatherCondition = 'Snow';
      } else if (showers > 0) {
        weatherCondition = 'Showers';
      } else if (rain > 0) {
        weatherCondition = 'Rain';
      }

      weatherForecast.push({ date, temperature, weatherCondition });
    }

    return NextResponse.json({ weatherForecast });
  } catch (error) {
    console.error('Error fetching weather forecast:', error);
    return NextResponse.json({ error: 'Failed to fetch weather forecast' }, { status: 500 });
  }
}