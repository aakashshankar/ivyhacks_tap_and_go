import type { getTripData, getUserTripData } from "@/queries";

// lib/types.ts
export type Locations = {
  [key: string]: ClaudeItinerary[];
};

export type UpdatedLocations = {
  [key: string]: {
    dailyBudget?: number;
    updatedLocationsForDay: ClaudeItinerary[];
  };
};

export type ClaudeItinerary = {
  location: string;
  time: string;
  budget: string;
  activity: string;
  locationType: string;
  imageUrl?: string;
  name?: string;
  coordinates: Coordinates;
  address: string;
};

export type DateRange = {
  from: Date;
  to: Date;
};

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

export type TripData = NonNullable<Awaited<ReturnType<typeof getTripData>>>;
export type UserTripData = NonNullable<
  Awaited<ReturnType<typeof getUserTripData>>
>;
export type Itinerary = TripData["itineraries"][number];
export type Location = TripData["itineraries"][number]["locations"][number];

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
