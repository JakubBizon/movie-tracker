import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Film, Star, TrendingUp } from "lucide-react";
import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import StatsCard from "./StatsCard";
import RatingDistributionChart from "./RatingDistirbutionChart";

type Props = {
  movies: MyRatingsMovieDetails[];
  moviesCount: number;
  average?: string;
};

export default function RatingsSummarySection({
  movies,
  moviesCount,
  average,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="col-span-1 flex flex-col gap-4">
        <StatsCard icon={<Film />} value={moviesCount} label="Movies Rated" />
        <StatsCard
          icon={<Star />}
          value={Number(average).toFixed(1)}
          label="Average rating"
        />
      </div>

      <div className="md:col-span-2">
        <Card className="h-full">
          <CardHeader className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-400" />
            <span>Rating distribution</span>
          </CardHeader>
          <CardContent>
            <RatingDistributionChart movies={movies} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
