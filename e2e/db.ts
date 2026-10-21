import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../app/db/schema";

export const db = drizzle(neon(process.env.DATABASE_URL!), { schema });

export const TEST_USER = {
  email: "e2e@example.com",
  password: "Password12345!",
  name: "E2E User",
};

export async function resetUserData() {
  const u = await db.query.user.findFirst({
    where: eq(schema.user.email, TEST_USER.email),
  });
  if (!u) return;
  await db.delete(schema.favorites).where(eq(schema.favorites.userId, u.id));
  await db.delete(schema.ratings).where(eq(schema.ratings.userId, u.id));
}
