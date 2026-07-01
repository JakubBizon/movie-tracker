import { db } from "@/app/db";
import { reviews, user } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function getLocalMovieReviews(movieId: string) {
  const rows = await db
    .select({ user, review: reviews })
    .from(reviews)
    .innerJoin(user, eq(reviews.userId, user.id))
    .where(eq(reviews.movieId, movieId));

  return rows;
}
