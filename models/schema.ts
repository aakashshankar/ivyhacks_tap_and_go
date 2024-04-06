// models/schema.ts
import { relations } from "drizzle-orm";
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

export const usersRelations = relations(users, ({ many }) => ({
  trips: many(trips),
}));

export const trips = pgTable("trips", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  city: text("city").notNull(),
  coordinates: text("coordinates").notNull(),
  countrycode: text("countrycode").notNull(),
  overallBudget: text("overall_budget"),
  travelStyle: text("travel_style"),
  companions: text("companions"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const tripsRelations = relations(trips, ({ one, many }) => ({
  user: one(users, {
    fields: [trips.userId],
    references: [users.id],
  }),
  itineraries: many(itineraries),
}));

export const itineraries = pgTable("itineraries", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  tripId: uuid("trip_id")
    .notNull()
    .references(() => trips.id),
  date: date("date"),
  dailyBudget: integer("daily_budget"),
  note: text("note"),
});

export const itinerariesRelations = relations(itineraries, ({ one, many }) => ({
  trip: one(trips, {
    fields: [itineraries.tripId],
    references: [trips.id],
  }),
  locations: many(locations),
}));

export const locations = pgTable("locations", {
  id: uuid("id")
    .primaryKey()
    .$defaultFn(() => uuidv4()),
  itineraryId: uuid("itinerary_id")
    .notNull()
    .references(() => itineraries.id),
  locationName: text("location_name").notNull(),
  coordinates: text("coordinates").notNull(),
  time: text("time").notNull(),
  budget: text("budget").notNull(),
  activity: text("activity").notNull(),
});

export const locationsRelations = relations(locations, ({ one }) => ({
  itinerary: one(itineraries, {
    fields: [locations.itineraryId],
    references: [itineraries.id],
  }),
}));

export const schema = {
  users,
  trips,
  itineraries,
  locations,
  usersRelations,
  tripsRelations,
  itinerariesRelations,
  locationsRelations,
};
