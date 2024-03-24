import { Locations, Coordinates, Profile, WeatherForecast } from './types';
import fs from 'fs';

function writeDbData(data: any) {
    try {
        fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error writing to db.json:', error);
    }
}

export async function fetchCoords(locations: Locations) {
    const response = await fetch('/api/cartesian', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locations }),
    });

    if (!response.ok) {
        throw new Error('Failed to get location coordinates');
    }

    const data = await response.json();
    return data.coordinates;
}

export async function generatePlan(destination: string, travelStyle: string, budget: string, companion: string, startDate: string, endDate: string) {
    const coordinatesResponse = await fetch('/api/cartesian', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ locations: { destination: [destination] } }),
    });

    if (!coordinatesResponse.ok) {
        throw new Error('Failed to get destination coordinates');
    }

    const coordinatesData = await coordinatesResponse.json();
    const destCoords = coordinatesData.coordinates[0][0];

    const weather = await fetch(`/api/weather?latitude=${destCoords[1]}&longitude=${destCoords[0]}&startDate=${startDate}&endDate=${endDate}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const weatherData = await weather.json();
    const forecast: WeatherForecast = weatherData.weatherForecast;

    const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, travelStyle, budget, companion, startDate, endDate, forecast }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate plan');
    }

    const data = await response.json();
    const dbData = {
        plan: {
            destination,
            travelStyle,
            budget,
            companion,
            startDate,
            endDate,
            locations: data.locations,
            itinerary: data.itinerary,
            weather: forecast,
            coordinates: destCoords,
        },
    };
    writeDbData(dbData);
    return { locations: data.locations, itinerary: data.itinerary };
}

export async function getRoute(startCoordinates: Coordinates, endCoordinates: Coordinates, profile: Profile) {
    const response = await fetch('/api/route', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ startCoordinates, endCoordinates, profile }),
    });

    if (!response.ok) {
        throw new Error('Failed to get route');
    }

    const data = await response.json();
    return data.route;
}

export async function replaceItinerarySuggestion(
    itinerary: any,
    day: number,
    destination: string,
    travelStyle: string,
    budget: string,
    companion: string,
    startDate: string,
    endDate: string
) {
    const response = await fetch('/api/replace', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itinerary, day, destination, travelStyle, budget, companion, startDate, endDate }),
    });

    if (!response.ok) {
        throw new Error('Failed to update itinerary');
    }

    const data = await response.json();
    return data.itinerary;
}

export async function getWeatherForecast(latitude: number, longitude: number, startDate: string, endDate: string) {
    const response = await fetch(`/api/weather?latitude=${latitude}&longitude=${longitude}&startDate=${startDate}&endDate=${endDate}`);

    if (!response.ok) {
        throw new Error('Failed to fetch weather forecast');
    }

    const data = await response.json();
    return data.weatherForecast;
}