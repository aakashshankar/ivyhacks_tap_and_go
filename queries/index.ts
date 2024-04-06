"use server";
import { auth } from "@clerk/nextjs";
import db from "@/lib/db";
import { itineraries, locations, trips } from "@/models/schema";
import { eq } from "drizzle-orm";

export async function getTripData(tripId: string) {
  // const user = auth().protect();
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

export async function getUserTripData(userId: string) {
  // const user = auth().protect();
  const itin = await db.query.users.findFirst({
    with: {
      trips: {
        with: {
          itineraries: {
            with: {
              locations: true,
            },
          },
        },
      },
    },
    where: (users, { eq }) => eq(users.id, userId),
  });
  return itin;
}
