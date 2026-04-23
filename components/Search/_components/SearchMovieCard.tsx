import { Movie } from "@/app/types/movie";
import Image from "next/image";

type Props = {
  movie: Movie;
  isBookmarked: boolean;
  isFavorite: boolean;
};

export default function SearchMovieCard({
  movie,
  isBookmarked,
  isFavorite,
}: Props) {
  console.log(movie);
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg">
      <div className="flex flex-row justify-center gap-10">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={100}
          height={150}
          className="rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
            {movie.title}
          </h3>
          <div className="flex flex-row text-sm gap-4 py-2">
            {movie.release_date && <span>{movie.release_date}</span>}
            <div className="flex flex-row">
              <span>{movie.vote_average}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
