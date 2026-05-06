import { Movie } from "@/app/types/movie";
import MovieCard from "@/components/MainPage/MovieCard";
import { slugify } from "@/lib/utils/slugify";

type Props = {
  movies: Movie[];
  bookmarkedIds: string[];
  favoriteIds: string[];
};

export default function MoviesGrid({
  movies,
  bookmarkedIds,
  favoriteIds,
}: Props) {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          initialSelections={{
            favoriteIds,
            bookmarkedIds,
          }}
          slug={slugify(movie.title, movie.id)}
          priority={index < 8}
        />
      ))}
    </div>
  );
}
