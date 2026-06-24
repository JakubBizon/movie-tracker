import { avg, eq } from "drizzle-orm";
import { db } from "../db";
import { ratings } from "../db/schema";

export async function checkAverageMovieRating(movieId: string) {
  const result = await db
    .select({ average: avg(ratings.rating) })
    .from(ratings)
    .where(eq(ratings.movieId, movieId));

  const average = result[0]?.average;
  return average ? parseFloat(average) : null;
}
