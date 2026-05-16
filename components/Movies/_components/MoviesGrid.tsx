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
    <div className="grid gap-3 grid-cols-2 xs:grid-cols-3 md:grid-cols-4">
      {movies.map((movie, index) => (
        <div key={movie.id} className="w-full min-w-0">
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
        </div>
      ))}
    </div>
  );
}
