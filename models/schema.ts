import { pgTable, serial, text, integer, timestamp, date, time, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { drizzle } from 'drizzle-orm/node-postgres';
import { getPool } from '../lib/db';

export const trips = pgTable('trips', {
  id: uuid('id').primaryKey(),
  name: text('name'),
  startDate: date('start_date'),
  endDate: date('end_date'),
  city: text('city'),
  overallBudgest: integer('overall_budget'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const itineraries = pgTable('itineraries', {
  id: uuid('id').primaryKey(),
  tripId: uuid('trip_id').notNull(),
  day: integer('day'),
  dailyBudget: integer('daily_budget'),
  note: text('note'),
});
