import { Movie } from "@/app/types/movie";
import SearchMovieCard from "./SearchMovieCard";

type Props = {
  movies: Movie[];
  bookmarkedIds: string[];
  favoriteIds: string[];
};

export default function SearchList({
  movies,
  bookmarkedIds,
  favoriteIds,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {movies.map((movie: Movie) => {
        const movieIdStr = movie.id.toString();
        return (
          <SearchMovieCard
            movie={movie}
            key={movie.id}
            isBookmarked={bookmarkedIds.includes(movieIdStr)}
            isFavorite={favoriteIds.includes(movieIdStr)}
          />
        );
      })}
    </div>
  );
}
