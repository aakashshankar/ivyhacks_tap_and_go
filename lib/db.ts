import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool as DrizzlePool } from 'drizzle-orm/node-postgres/pool';
import { schema } from './schema';

let pool: Pool | null = null;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_CONNECTION_STRING,
    });
  }
  return pool;
}

export const db = drizzle(getPool() as DrizzlePool);

export { schema };
