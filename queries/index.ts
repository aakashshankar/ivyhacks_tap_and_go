"use server";
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import { itineraries, locations, trips } from "@/models/schema";
import { eq } from "drizzle-orm";

export async function getUserTripData(tripId: string) {
  const user = auth().protect();
  const itin = await db.query.trips.findFirst({
    with: {
      itineraries: {
        with: {
          locations: true,
        },
      },
    },
    where: (trips, { eq }) => eq(trips.id, tripId),
  });
  return itin;
}
