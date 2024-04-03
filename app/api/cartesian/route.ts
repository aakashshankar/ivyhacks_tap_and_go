// app/api/getLocationCoordinates.ts
import mbxGeocoding from "@mapbox/mapbox-sdk/services/geocoding";
import { NextRequest } from "next/server";
import { Itinerary } from "@/lib/types";

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN!,
});

type Locations = Record<string, string[]>;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { locations }: { locations: Locations } = body;
  console.log("locations", locations);

  try {
    const coordinates: { [key: string]: number[][] } = {};

    let dayIndex = 0;
    for (const [day, dayLocations] of Object.entries(locations)) {
      const dayCoordinates = await Promise.all(
        dayLocations.map(async (location: string) => {
          const response = await geocodingClient
            .forwardGeocode({ query: location, limit: 1 })
            .send();
          const feature = response.body.features[0];
          return feature.geometry.coordinates;
        }),
      );
      coordinates[dayIndex] = dayCoordinates;
      dayIndex++;
    }

    return Response.json({ coordinates });
  } catch (error) {
    console.error("Error getting location coordinates:", error);
    return new Response("Failed to get location coordinates", { status: 500 });
  }
}
