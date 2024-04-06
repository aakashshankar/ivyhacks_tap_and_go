// app/api/getLocationCoordinates.ts
import mbxGeocoding from "@mapbox/mapbox-sdk";
import { NextRequest } from "next/server";
// import { Itinerary } from "@/lib/types";

const geocodingClient = mbxGeocoding({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN!,
});

type Locations = Record<string, string[]>;

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { location, countrycode, destination } = body;

  try {
    const response = await geocodingClient
      .forwardGeocode({
        query: location,
        limit: 1,
        countries: [countrycode],
        proximity: destination,
      })
      .send();
    const feature = response.body.features[0];
    if (!feature) {
      return new Response("Location not found", { status: 404 });
    }
    console.log("Request body: ", body);
    const coordinates = feature.geometry.coordinates;
    const address = feature.address || feature.properties.address;
    console.log("Coordinates: ", coordinates);

    return Response.json({ coordinates, address });
  } catch (error) {
    console.error("Error getting location coordinates:", error);
    return new Response("Failed to get location coordinates", { status: 500 });
  }
}
