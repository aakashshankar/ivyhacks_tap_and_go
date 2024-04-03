// models/schema.ts
import {
  pgTable,
  text,
  integer,
  timestamp,
  date,
  uuid,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  clerkUserId: text('clerk_user_id').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const trips = pgTable('trips', {
  id: uuid('id').primaryKey(),
  userId: text('user_id')
      .notNull()
      .references(() => users.id),
  name: text('name'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  city: text('city'),
  overallBudget: integer('overall_budget'),
  travelStyle: text('travel_style'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const itineraries = pgTable('itineraries', {
  id: uuid('id').primaryKey(),
  tripId: uuid('trip_id')
      .notNull()
      .references(() => trips.id),
  date: date('date'),
  dailyBudget: integer('daily_budget'),
  note: text('note'),
});

export const locations = pgTable('locations', {
  id: uuid('id').primaryKey(),
  itineraryId: uuid('itinerary_id')
      .notNull()
      .references(() => itineraries.id),
  locationName: text('location_name'),
});

export const schema = {
  users,
  trips,
  itineraries,
  locations,
};