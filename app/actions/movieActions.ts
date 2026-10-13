"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { bookmarks, favorites } from "../db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function toggleFavoriteAction(
  movieId: string,
  title: string,
  posterPath: string,
  voteAverage: string,
  releaseDate: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const userId = session?.user.id;

  try {
    const existing = await db
      .select()
      .from(favorites)
      .where(and(eq(favorites.userId, userId), eq(favorites.movieId, movieId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(favorites)
        .where(
          and(eq(favorites.userId, userId), eq(favorites.movieId, movieId)),
        );
      revalidatePath("/my-list");
      revalidatePath("/");
      return { success: true, message: `Removed ${title} from favorites` };
    } else {
      await db.insert(favorites).values({
        userId: userId,
        movieId: movieId,
        title: title,
        posterPath: posterPath,
        voteAverage: voteAverage,
        releaseDate: releaseDate ? releaseDate : null,
      });
      revalidatePath("/my-list");
      revalidatePath("/");
      return { success: true, message: `Added ${title} to favorites` };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to update favorites" };
  }
}

export async function getUserSelections() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return { favoriteIds: [], bookmarkedIds: [] };
  const userId = session?.user.id;
  try {
    const [userFavs, userBook] = await Promise.all([
      db
        .select({ movieId: favorites.movieId })
        .from(favorites)
        .where(eq(favorites.userId, userId)),
      db
        .select({ movieId: bookmarks.movieId })
        .from(bookmarks)
        .where(eq(bookmarks.userId, userId)),
    ]);

    return {
      favoriteIds: userFavs.map((f) => f.movieId),
      bookmarkedIds: userBook.map((b) => b.movieId),
    };
  } catch (error) {
    console.error("Error fetching user selections: ", error);
    return { favoriteIds: [], bookmarkedIds: [] };
  }
}

export async function toggleBookmarkAction(
  movieId: string,
  title: string,
  posterPath: string,
  voteAverage: string,
  releaseDate: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) {
    throw new Error("Unauthorized");
  }
  const userId = session?.user.id;
  try {
    const existing = await db
      .select()
      .from(bookmarks)
      .where(and(eq(bookmarks.userId, userId), eq(bookmarks.movieId, movieId)))
      .limit(1);

    if (existing.length > 0) {
      await db
        .delete(bookmarks)
        .where(
          and(eq(bookmarks.userId, userId), eq(bookmarks.movieId, movieId)),
        );
      revalidatePath("/my-list");
      revalidatePath("/");
      return { success: true, message: `Removed ${title} from bookmarks` };
    } else {
      await db.insert(bookmarks).values({
        userId: userId,
        movieId: movieId,
        title: title,
        posterPath: posterPath,
        voteAverage: voteAverage,
        releaseDate: releaseDate ? releaseDate : null,
      });
      revalidatePath("/my-list");
      revalidatePath("/");
      return { success: true, message: `Added ${title} to bookmarks` };
    }
  } catch (error) {
    console.error("Database error:", error);
    return { success: false, error: "Failed to update bookmarks" };
  }
}
