import { asc, avg, desc, eq } from "drizzle-orm";
import { db } from "@/app/db";
import { ratings } from "@/app/db/schema";
import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import type { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import { RatingsSort } from "@/hooks/MyRatings/useMyRatings";

export async function getMyRatingsData(userId: string, sort: RatingsSort) {
  if (!userId) {
    return { ratedMovies: [], average: null, moviesWithDetails: [] };
  }
  const orderBy =
    sort === "highest"
      ? desc(ratings.rating)
      : sort === "lowest"
        ? asc(ratings.rating)
        : desc(ratings.createdAt);

  const [ratedMovies, avgRatings] = await Promise.all([
    db
      .select()
      .from(ratings)
      .where(eq(ratings.userId, userId))
      .orderBy(orderBy),
    db
      .select({ average: avg(ratings.rating) })
      .from(ratings)
      .where(eq(ratings.userId, userId)),
  ]);

  const moviesWithDetails: MyRatingsMovieDetails[] = await Promise.all(
    ratedMovies.map(async (rating) => {
      const details = await getMovieDetails(Number(rating.movieId));

      return {
        ...rating,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
      };
    }),
  );

  return {
    ratedMovies,
    average: avgRatings[0].average,
    moviesWithDetails,
  };
}
