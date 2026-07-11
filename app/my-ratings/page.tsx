import { auth } from "@/lib/auth";
import { db } from "../db";
import { ratings } from "../db/schema";
import { headers } from "next/headers";
import { avg, eq } from "drizzle-orm";
import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import { MyRatingsMovieDetails } from "../types/my-ratings-movie-details";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Film, Star, TrendingUp } from "lucide-react";
import StatsCard from "@/components/MyRatings/StatsCard";
import RatingDistributionChart from "@/components/MyRatings/RatingDistirbutionChart";
import MyRatingsMovieCard from "@/components/MyRatings/MyRatingsMovieCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Ratings",
};

export default async function MyRatings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>xd</div>;
  }
  const userId = session?.user.id;
  const [ratedMovies, avgRatings] = await Promise.all([
    db.select().from(ratings).where(eq(ratings.userId, userId)),
    db
      .select({ average: avg(ratings.rating) })
      .from(ratings)
      .where(eq(ratings.userId, userId)),
  ]);

  const average = avgRatings[0].average;

  const moviesWithDetails: MyRatingsMovieDetails[] = await Promise.all(
    ratedMovies.map(async (r) => {
      const details = await getMovieDetails(Number(r.movieId));
      return {
        ...r,
        poster_path: details.poster_path,
        vote_average: details.vote_average,
      };
    }),
  );

  return (
    <div className="flex flex-col max-w-7xl py-10 mx-auto px-4 sm:px-6 min-h-[calc(100vh-300px)]">
      <h2 className="text-4xl ">My ratings</h2>
      <span className="py-4">
        Every movie you have rated, compared with the global score
      </span>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="col-span-1 flex flex-col gap-4">
          <StatsCard
            icon={<Film />}
            value={ratedMovies.length}
            label="Movies Rated"
          />

          <StatsCard
            icon={<Star />}
            value={Number(average).toFixed(1)}
            label="Average rating"
          />
        </div>

        <div className="md:col-span-2">
          <Card className="h-full">
            <CardHeader className="flex ">
              <TrendingUp className="w-5 h-5 text-indigo-400" /> Rating
              distribution
            </CardHeader>
            <CardContent className="">
              <RatingDistributionChart movies={moviesWithDetails} />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="space-y-4 py-4">
        {moviesWithDetails.map((movie: MyRatingsMovieDetails) => (
          <MyRatingsMovieCard key={movie.movieId} movie={movie} />
        ))}
      </div>
    </div>
  );
}
