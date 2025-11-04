import { getMovieDetails } from "@/lib/getMovieDetails";
import HeroCarousel from "./HeroCarousel";
import { Movie } from "@/app/types/movie";
import { getPopularMovies } from "@/lib/getPopularMovies";

export default async function HeroSection() {
  const data = await getPopularMovies();
  const slicedData = data.results.slice(0, 3);

  const moviesWithDetails = await Promise.all(
    slicedData.map(async (movie: Movie) => {
      const details = await getMovieDetails(movie.id);
      return {
        ...movie,
        runtime: details.runtime,
        genres: details.genres,
        description: details.overview,
      };
    })
  );
  return <HeroCarousel data={moviesWithDetails} />;
}
