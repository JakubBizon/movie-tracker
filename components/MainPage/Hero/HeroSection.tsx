import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import HeroCarousel from "./HeroCarousel";
import { Movie } from "@/app/types/movie";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSelections } from "@/app/actions/movieActions";
import { getTrailerLink } from "@/lib/movies/getTrailerLink";

export default async function HeroSection() {
  const data = await getPopularMovies();

  const filteredData = data.results
    .filter((movie: Movie) => movie.vote_average >= 7.0)
    .slice(0, 3);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  const { favoriteIds, bookmarkedIds } = userId
    ? await getUserSelections(userId)
    : { favoriteIds: [], bookmarkedIds: [] };

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
        isFavorite: favoriteIds.includes(movie.id.toString()),
        isBookmarked: bookmarkedIds.includes(movie.id.toString()),
        trailer: trailer,
      };
    }),
  );
  return <HeroCarousel data={moviesWithDetails} />;
}
