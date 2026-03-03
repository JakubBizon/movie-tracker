import MyLists from "@/components/MyLists/MyLists";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db";
import { bookmarks, favorites } from "../db/schema";
import { eq } from "drizzle-orm";

export default async function MyListsHome() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) return <div>Log in to see ur lists</div>;

  const [userFavorites, userBookmarks] = await Promise.all([
    db.select().from(favorites).where(eq(favorites.userId, session.user.id)),
    db.select().from(bookmarks).where(eq(bookmarks.userId, session.user.id)),
  ]);
  return (
    <MyLists
      favorites={userFavorites}
      bookmarks={userBookmarks}
      userId={session.user.id}
    />
  );
}
