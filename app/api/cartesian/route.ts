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
  const { location, countrycode } = body;

  try {
    const response = await geocodingClient
      .forwardGeocode({ query: location, limit: 1, countries: [countrycode] })
      .send();
    const feature = response.body.features[0];
    const coordinates = feature.geometry.coordinates;

    return Response.json({ coordinates });
  } catch (error) {
    console.error("Error getting location coordinates:", error);
    return new Response("Failed to get location coordinates", { status: 500 });
  }
}
