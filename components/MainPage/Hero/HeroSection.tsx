import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import HeroCarousel from "./HeroCarousel";
import { Movie } from "@/app/types/movie";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";
import { getUserSelections } from "@/app/actions/movieActions";
import { getTrailerLink } from "@/lib/movies/getTrailerLink";

export default async function HeroSection() {
  const data = await getPopularMovies(1);

  const filteredData = data.results
    .filter((movie: Movie) => movie.vote_average >= 7.0)
    .slice(0, 3);

  const { favoriteIds, bookmarkedIds } = await getUserSelections();

  const moviesWithDetails = await Promise.all(
    filteredData.map(async (movie: Movie) => {
      const [details, trailer] = await Promise.all([
        getMovieDetails(movie.id),
        getTrailerLink(movie.id),
      ]);

      return {
        ...movie,
        runtime: details.runtime,
        genres: details.genres,
        favoriteIds,
        bookmarkedIds,
        trailer,
      };
    }),
  );

  return <HeroCarousel data={moviesWithDetails} />;
}
