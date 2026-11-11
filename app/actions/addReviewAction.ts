"use server";

import { revalidatePath } from "next/cache";
import { db } from "../db";
import { reviews } from "../db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { reviewSchema } from "@/lib/zod";
import { slugify } from "@/lib/utils/slugify";

export async function addReviewAction(
  movieId: string,
  title: string,
  review: string,
) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user.id) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const parsed = reviewSchema.safeParse({ content: review.trim() });
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues[0]?.message ?? "Invalid review",
      };
    }

    await db
      .insert(reviews)
      .values({
        userId: session.user.id,
        movieId,
        review: parsed.data.content,
        title,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: [reviews.userId, reviews.movieId],
        set: {
          review: parsed.data.content,
          title,
          updatedAt: new Date(),
        },
      });

    const movieIdNumber = Number(movieId);
    if (Number.isInteger(movieIdNumber)) {
      revalidatePath(`/movie/${slugify(title, movieIdNumber)}`);
    }

    return { success: true };
  } catch (error) {
    console.error(error);
    return { success: false, error: "Failed to add review" };
  }
}
