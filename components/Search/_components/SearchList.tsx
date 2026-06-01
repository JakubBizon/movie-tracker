"use client";
import { Movie } from "@/app/types/movie";
import SearchMovieCard from "./SearchMovieCard";
import { authClient } from "@/lib/auth-client";

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
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  return (
    <div className="flex flex-col gap-4">
      {movies.map((movie: Movie) => {
        return (
          <SearchMovieCard
            movie={movie}
            key={movie.id}
            initialSelections={{
              favoriteIds,
              bookmarkedIds,
            }}
            userId={userId}
          />
        );
      })}
    </div>
  );
}
