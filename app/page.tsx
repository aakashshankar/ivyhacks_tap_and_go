import db from "@/lib/db";
import HomePage from "./homepage";
import { auth } from "@clerk/nextjs";
import { users } from "@/models/schema";
import { eq } from "drizzle-orm";
export default async function Page() {
  const user = auth().protect();
  if (user.userId) {
    // Check if user exists in database.
    // If not, create a new user.
    const existing = await db
      .selectDistinct()
      .from(users)
      .where(eq(users.id, user.userId));
    if (existing.length === 0) {
      await db.insert(users).values({
        id: user.userId,
      });
    }
  }

  return <HomePage />;
}
