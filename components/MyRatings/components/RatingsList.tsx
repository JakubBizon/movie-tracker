import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import MyRatingsMovieCard from "./MyRatingsMovieCard";

type Props = {
  movies: MyRatingsMovieDetails[];
};

export default function RatingsList({ movies }: Props) {
  return (
    <div className="space-y-4 py-4">
      {movies.map((movie) => (
        <MyRatingsMovieCard key={movie.movieId} movie={movie} />
      ))}
    </div>
  );
}
