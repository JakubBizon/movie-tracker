import { db } from "@/app/db";
import { favorites, bookmarks, ratings } from "@/app/db/schema";
import { eq, sql } from "drizzle-orm";
import { ImportData } from "../zod";

export async function getUserData(userId: string) {
  const [fav, bm, rt] = await Promise.all([
    db.select().from(favorites).where(eq(favorites.userId, userId)),
    db.select().from(bookmarks).where(eq(bookmarks.userId, userId)),
    db.select().from(ratings).where(eq(ratings.userId, userId)),
  ]);

  const strip = <T extends { userId: string }>(rows: T[]) =>
    rows.map(({ userId: _userId, ...rest }) => rest);

  return {
    favorites: strip(fav),
    bookmarks: strip(bm),
    ratings: strip(rt),
  };
}

export async function importUserData(userId: string, data: ImportData) {
  const results = { favorites: 0, bookmarks: 0, ratings: 0 };

  if (data.favorites.length) {
    await db
      .insert(favorites)
      .values(data.favorites.map((f) => ({ ...f, userId })))
      .onConflictDoUpdate({
        target: [favorites.userId, favorites.movieId],
        set: {
          title: sql`excluded.title`,
          posterPath: sql`excluded."posterPath"`,
          voteAverage: sql`excluded."voteAverage"`,
          releaseDate: sql`excluded."releaseDate"`,
          updatedAt: sql`now()`,
        },
      });
    results.favorites = data.favorites.length;
  }
  if (data.bookmarks.length) {
    await db
      .insert(bookmarks)
      .values(data.bookmarks.map((b) => ({ ...b, userId })))
      .onConflictDoUpdate({
        target: [bookmarks.userId, bookmarks.movieId],
        set: {
          title: sql`excluded.title`,
          posterPath: sql`excluded."posterPath"`,
          voteAverage: sql`excluded."voteAverage"`,
          releaseDate: sql`excluded."releaseDate"`,
          updatedAt: sql`now()`,
        },
      });
    results.bookmarks = data.bookmarks.length;
  }

  if (data.ratings.length) {
    await db
      .insert(ratings)
      .values(data.ratings.map((r) => ({ ...r, userId })))
      .onConflictDoUpdate({
        target: [ratings.userId, ratings.movieId],
        set: { rating: sql`excluded.rating`, updatedAt: sql`now()` },
      });
    results.ratings = data.ratings.length;
  }
  return results;
}
