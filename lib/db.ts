import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";
import drizzleConfig from "@/drizzle.config";
import { schema as model } from "@/models/schema";

const { dbCredentials } = drizzleConfig;
const { connectionString } = dbCredentials;

// For migrations
// const migrationClient = postgres(connectionString, { max: 1 });
// (async () => {
//     // Run migrations
//     await migrate(drizzle(migrationClient), { migrationsFolder: "../migrations" });
//     // Here you can add any additional setup or initialization code
// })();

const queryClient = postgres(connectionString);
const db = drizzle(queryClient, { schema: { ...model } });

// Should I export the migrationClient as well?
export default db;
