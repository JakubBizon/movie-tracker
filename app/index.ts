import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { usersTable } from "./db/schema";
import * as schema from "./db/schema";

const db = drizzle(process.env.DATABASE_URL!, { schema });

async function main() {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    image: "Dasdasdsaaddasdasdas",
    email: "john@example.com",
  };

  await db.insert(usersTable).values(user);
  console.log("New user created!");

  const users = await db.select().from(usersTable);
  console.log("Getting all users from the database: ", users);
  /*
  const users: {
    id: number;
    name: string;
    age: number;
    email: string;
  }[]
  */

  await db
    .update(usersTable)
    .set({
      image: "xd",
    })
    .where(eq(usersTable.email, user.email));
  console.log("User info updated!");
}

main();
