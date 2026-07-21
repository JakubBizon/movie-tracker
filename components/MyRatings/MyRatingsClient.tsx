"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Film, Star, TrendingUp } from "lucide-react";
import useMyRatings, { RatingsSort } from "@/hooks/MyRatings/useMyRatings";
import StatsCard from "./components/StatsCard";
import RatingDistributionChart from "./components/RatingDistirbutionChart";
import MyRatingsMovieCard from "./components/MyRatingsMovieCard";
import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SortOptionButton from "./components/SortOptionButton";
import MyRatingsEmptyRatingsState from "./components/MyRatingsEmptyState";

type Props = {
  initialSort: RatingsSort;
};

export default function MyRatingsClient({ initialSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = (searchParams.get("sort") as RatingsSort) ?? initialSort;

  const { data, isLoading } = useMyRatings(sort);

  const handleSortChange = (newSort: RatingsSort) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  if (isLoading) return null;

  if (!data || data.moviesWithDetails.length === 0) {
    return <MyRatingsEmptyRatingsState />;
  }

  const { average, moviesWithDetails } = data;

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
            value={moviesWithDetails.length}
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
      <div className="flex flex-col py-4">
        <div className="flex justify-between">
          <h2 className="text-xl">{moviesWithDetails.length} rated movies</h2>
          <div className="flex flex-wrap gap-2">
            <SortOptionButton
              value="recent"
              label="Recent"
              active={sort === "recent"}
              onClick={handleSortChange}
            />
            <SortOptionButton
              value="highest"
              label="Highest first"
              active={sort === "highest"}
              onClick={handleSortChange}
            />
            <SortOptionButton
              value="lowest"
              label="Lowest first"
              active={sort === "lowest"}
              onClick={handleSortChange}
            />
          </div>
        </div>

        <div className="space-y-4 py-4">
          {moviesWithDetails.map((movie: MyRatingsMovieDetails) => (
            <MyRatingsMovieCard key={movie.movieId} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
}
