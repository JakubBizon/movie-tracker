import { Movie } from "@/app/types/movie";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSelections } from "@/app/actions/movieActions";
import MovieCarouselClient from "./MovieCarouselClient";

interface MoviesCarouselProps {
  movies: Movie[];
  limit?: number;
}

export default async function MovieCarousel({
  limit,
  movies,
}: MoviesCarouselProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const initialSelections = userId
    ? await getUserSelections(userId)
    : { favoriteIds: [], bookmarkedIds: [] };
  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  return (
    <MovieCarouselClient
      movies={displayedMovies}
      initialSelections={initialSelections}
      limit={limit}
    />
  );
}
