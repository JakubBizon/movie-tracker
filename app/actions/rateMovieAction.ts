"use server";

import { db } from "../db";
import { ratings } from "../db/schema";

export async function rateMovieAction(
  userId: string,
  movieId: string,
  title: string,
  rating: number,
) {
  if (!userId) throw new Error("Unauthorized");
  if (rating < 1 || rating > 10) throw new Error("Invalid rating");

  try {
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
    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to rate" };
  }
}
