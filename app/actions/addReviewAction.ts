"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { reviews } from "../db/schema";

export async function addReviewAction(
  userId: string,
  movieId: string,
  title: string,
  review: string,
) {
  if (!userId) throw new Error("Unauthorized");

  try {
    const trimmed = review.trim();

    if (trimmed === "") {
      return { success: false, error: "Review cannot be empty" };
    }
    await db
      .insert(reviews)
      .values({
        userId,
        movieId,
        review: trimmed,
        title,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [reviews.userId, reviews.movieId],
        set: { review: trimmed, title, updatedAt: new Date() },
      });

    revalidatePath(`/movie/${movieId}`);

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add review" };
  }
}
