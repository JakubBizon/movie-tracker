"use server";

import { and, eq } from "drizzle-orm";
import { db } from "../db";
import { ratings } from "../db/schema";
import { revalidatePath } from "next/cache";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function rateMovieAction(
  movieId: string,
  title: string,
  rating: number | null,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) return { success: false, error: "Unauthorized" };
  const userId = session.user.id;
  try {
    if (rating === null) {
      await db
        .delete(ratings)
        .where(and(eq(ratings.userId, userId), eq(ratings.movieId, movieId)));

      revalidatePath("/my-ratings");
      return { success: true, message: "Rating removed" };
    }

    if (rating < 1 || rating > 10) throw new Error("Invalid rating");

    await db
      .insert(ratings)
      .values({
        userId,
        movieId,
        rating,
        title,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [ratings.userId, ratings.movieId],
        set: { rating: rating, updatedAt: new Date() },
      });
    revalidatePath("/my-ratings");
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to rate" };
  }
}
