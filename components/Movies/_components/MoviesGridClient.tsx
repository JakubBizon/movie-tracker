"use client";
import { Movie } from "@/app/types/movie";
import MovieCard from "@/components/MainPage/MovieCard";
import { useUserSelections } from "@/hooks/useUserSelections";
import { authClient } from "@/lib/auth-client";
import { slugify } from "@/lib/utils/slugify";
import { Clapperboard } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  movies: Movie[];
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
};

export default function MoviesGridClient({ movies, initialSelections }: Props) {
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  const userId = session?.user.id;
  const { data } = useUserSelections(userId, initialSelections);
  const favoriteSet = new Set(data.favoriteIds || []);
  const bookmarkedSet = new Set(data.bookmarkedIds || []);

  if (movies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-16 gap-3 min-h-[250px]">
        <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
          <Clapperboard className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-semibold">No movies found</h3>
        <p className="text-muted-foreground max-w-sm">
          Try another filter or browse the full collection.
        </p>
        <Link
          href={pathname}
          className="mt-2 bg-primary text-white px-6 py-2 rounded-md"
        >
          Browse movies
        </Link>
      </div>
    );
  }

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
