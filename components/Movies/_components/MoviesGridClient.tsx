"use client";
import { Movie } from "@/app/types/movie";
import MovieCard from "@/components/MainPage/MovieCard";
import { useUserSelections } from "@/hooks/useUserSelections";
import { authClient } from "@/lib/auth-client";
import { slugify } from "@/lib/utils/slugify";

type Props = {
  movies: Movie[];
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
};

export default function MoviesGridClient({ movies, initialSelections }: Props) {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const { data } = useUserSelections(userId, initialSelections);
  const favoriteSet = new Set(data.favoriteIds || []);
  const bookmarkedSet = new Set(data.bookmarkedIds || []);
  return (
    <div className="grid gap-3 grid-cols-2 xs:grid-cols-3 md:grid-cols-4">
      {movies.map((movie, index) => {
        const movieId = movie.id.toString();
        return (
          <div key={movie.id} className="w-full min-w-0">
            <MovieCard
              key={movie.id}
              userId={userId}
              movie={movie}
              isFavorite={!!userId && favoriteSet.has(movieId)}
              isBookmarked={!!userId && bookmarkedSet.has(movieId)}
              slug={slugify(movie.title, movie.id)}
              priority={index < 8}
            />
          </div>
        );
      })}
    </div>
  );
}
