"use client";
import { Movie } from "@/app/types/movie";
import { authClient } from "@/lib/auth-client";
import MovieSearchCard from "./MovieSearchCard";

type Props = {
  movies: Movie[];
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
};
export default function SearchList({ movies, initialSelections }: Props) {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;

  const favoriteSet = new Set(initialSelections?.favoriteIds ?? []);
  const bookmarkedSet = new Set(initialSelections?.bookmarkedIds ?? []);

  return (
    <div className="grid  grid-cols-2 xs:grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 xl:grid-cols-5 2xl:gap-4">
      {movies.map((movie) => (
        <MovieSearchCard
          movie={movie}
          key={movie.id}
          isFavorite={favoriteSet.has(String(movie.id))}
          isBookmarked={bookmarkedSet.has(String(movie.id))}
          userId={userId}
        />
      ))}
    </div>
  );
}
