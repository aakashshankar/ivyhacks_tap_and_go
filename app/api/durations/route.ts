// app/api/getRoute.ts
import mbxDirections from "@mapbox/mapbox-sdk/services/directions";
import {NextRequest} from "next/server";

const directionsClient = mbxDirections({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN!,
});

type Coordinates = [number, number];
type Profile = "walking" | "driving" | "cycling" | "driving-traffic";
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { startCoordinates, endCoordinates }: { startCoordinates: Coordinates; endCoordinates: Coordinates } = body;

  const profiles: Profile[] = ["walking", "driving", "cycling", "driving-traffic"];

  try {
    const durations: { [key: string]: number } = {};

    for (const profile of profiles) {
      const response = await directionsClient
        .getDirections({
          profile: profile,
          waypoints: [
            { coordinates: startCoordinates },
            { coordinates: endCoordinates },
          ],
        })
        .send();

      const route = response.body.routes[0];
      durations[profile] = route.duration;
    }

    return Response.json({ durations });
  } catch (error) {
    console.error("Error getting route durations:", error);
    return new Response("Failed to get route durations", { status: 500 });
  }
}
