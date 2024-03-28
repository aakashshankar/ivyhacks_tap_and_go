// app/api/getRoute.ts
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import { NextRequest } from "next/server";

const directionsClient = mbxDirections({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN!,
});

type Coordinates = [number, number];
type Profile = "driving" | "walking" | "cycling" | "driving-traffic";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { startCoordinates, endCoordinates, profile }: { startCoordinates: Coordinates; endCoordinates: Coordinates; profile: Profile } = body;
  console.log(startCoordinates, endCoordinates, profile)
  try {
    const response = await directionsClient.getDirections({
        profile: profile,
        waypoints: [
          { coordinates: startCoordinates },
          { coordinates: endCoordinates },
        ],
        geometries: "geojson",
      })
      .send();
    
    console.log(response.body);
    
    const route = response.body.routes[0];
    const geometry = route.geometry;

    return Response.json({ route: geometry });
  } catch (error) {
    console.error("Error getting route:", error);
    return new Response("Failed to get route", { status: 500 });
  }
}
