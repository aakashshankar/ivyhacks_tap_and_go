// lib/types.ts
export interface Locations {
    [key: string]: string[];
}

export type Coordinates = [number, number];

export type Profile = 'driving' | 'walking' | 'cycling' | 'driving-traffic';

export interface WeatherForecast {
    date: string;
    weatherCode: number;
    weatherType: string;
}