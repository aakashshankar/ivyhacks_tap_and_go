import * as dotenv from 'dotenv';
import type { Config } from 'drizzle-kit';

dotenv.config({
    path: '.env.local',
});

export default {
    schema: './models/schema.ts',
    out: './migrations',
    driver: 'pg',
    dbCredentials: {
        connectionString: process.env.POSTGRES_CONNECTION_STRING as string,
    }
} satisfies Config;