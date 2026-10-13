import { Movie } from "@/app/types/movie";
import { getUserSelections } from "@/app/actions/movieActions";
import MovieCarouselClient from "./MovieCarouselClient";

interface MoviesCarouselProps {
  movies: Movie[];
  limit?: number;
  section: string;
}

export default async function MovieCarousel({
  limit,
  movies,
  section,
}: MoviesCarouselProps) {
  const initialSelections = await getUserSelections();
  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  return (
    <MovieCarouselClient
      movies={displayedMovies}
      initialSelections={initialSelections}
      limit={limit}
      section={section}
    />
  );
}
