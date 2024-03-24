import { Locations, Coordinates, Profile } from './types';

export async function getCoordinates(locations: Locations) {
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
    const response = await fetch('/api/plan', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ destination, travelStyle, budget, companion, startDate, endDate }),
    });

    if (!response.ok) {
        throw new Error('Failed to generate plan');
    }

    const data = await response.json();
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