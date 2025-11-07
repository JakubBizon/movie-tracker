import { Movie } from "@/app/types/movie";
import MovieCard from "./MovieCard";
import { Carousel } from "./Carousel";
import { slugify } from "@/lib/utils/slugify";

interface MoviesCarouselProps {
  movies: Movie[];
  limit?: number;
}

export default function MovieCarousel({ limit, movies }: MoviesCarouselProps) {
  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  const renderedItems = displayedMovies.map((movie: Movie) => {
    return (
      <MovieCard movie={movie} key={movie.id} slug={slugify(movie.title)} />
    );
  });

  return <Carousel items={renderedItems} />;
}
