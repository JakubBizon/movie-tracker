"use client";

import { Movie } from "@/app/types/movie";
import { useUserSelections } from "@/hooks/useUserSelections";
import { authClient } from "@/lib/auth-client";
import MovieCard from "./MovieCard";
import { slugify } from "@/lib/utils/slugify";
import { Carousel } from "./Carousel";

type Props = {
  movies: Movie[];
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
  limit?: number;
};

export default function MovieCarouselClient({
  movies,
  initialSelections,
  limit,
}: Props) {
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;
  const { data } = useUserSelections(userId, initialSelections);
  const favoriteSet = new Set(data?.favoriteIds ?? []);

  const bookmarkedSet = new Set(data?.bookmarkedIds ?? []);

  const renderedItems = movies.map((movie, index) => {
    const movieId = movie.id.toString();

    return (
      <div
        key={movie.id}
        className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[220px] lg:w-[240px] shrink-0"
      >
        <MovieCard
          movie={movie}
          slug={slugify(movie.title, movie.id)}
          isFavorite={!!userId && favoriteSet.has(movieId)}
          isBookmarked={!!userId && bookmarkedSet.has(movieId)}
          priority={limit ? index < 5 : false}
          userId={userId}
        />
      </div>
    );
  });
  return <Carousel items={renderedItems} />;
}
