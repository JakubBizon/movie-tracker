import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import HeroCarousel from "./HeroCarousel";
import { Movie } from "@/app/types/movie";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";

export default async function HeroSection() {
  const data = await getPopularMovies();

  const filteredData = data.results
    .filter((movie: Movie) => movie.vote_average >= 7.0)
    .slice(0, 3);
  const moviesWithDetails = await Promise.all(
    filteredData.map(async (movie: Movie) => {
      const details = await getMovieDetails(movie.id);
      return {
        ...movie,
        runtime: details.runtime,
        genres: details.genres,
      };
    })
  );
  return <HeroCarousel data={moviesWithDetails} />;
}
