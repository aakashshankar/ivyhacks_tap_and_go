// models/schema.ts
import {
  pgTable,
  text,
  integer,
  timestamp,
  date,
  uuid,
} from "drizzle-orm/pg-core";
import { v4 as uuidv4 } from "uuid";

export const users = pgTable("users", {
  id: text("id").notNull().primaryKey(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const trips = pgTable("trips", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv4()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  startDate: date("start_date"),
  endDate: date("end_date"),
  city: text("city"),
  coordinates: text("coordinates"),
  countrycode: text("countrycode"),
  overallBudget: text("overall_budget"),
  travelStyle: text("travel_style"),
  companions: text("companions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const itineraries = pgTable("itineraries", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv4()),
  tripId: uuid("trip_id")
    .notNull()
    .references(() => trips.id),
  date: date("date"),
  dailyBudget: integer("daily_budget"),
  note: text("note"),
});

export const locations = pgTable("locations", {
  id: uuid("id").primaryKey().$defaultFn(() => uuidv4()),
  itineraryId: uuid("itinerary_id")
    .notNull()
    .references(() => itineraries.id),
  locationName: text("location_name"),
  activity: text("activity"),
});

export const schema = {
  users,
  trips,
  itineraries,
  locations,
};
