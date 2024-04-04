// lib/types.ts
export interface Locations {
  [key: string]: Itinerary[];
}

export type Coordinates = [number, number];

export type Profile = "driving" | "walking" | "cycling" | "driving-traffic";

export interface WeatherForecast {
  date: Date;
  weatherCode: number;
  weatherType: string;
}

export type ClaudeAPIResponse = {
  locations: Locations;
  itinerary: string;
};

export type Itinerary = {
  location: string;
  time: string;
  budget: string;
  activity?: string;
  name?: string;
  coordinates?: Coordinates;
};

export type DbData = {
  destination: string;
  style: string;
  budget: string;
  companion: string;
  startDate: string;
  endDate: string;
  itin: Locations;
  weather: WeatherForecast;
};
