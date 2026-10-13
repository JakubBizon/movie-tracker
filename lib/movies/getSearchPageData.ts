import { getSearchResults } from "./getSearchResults";
import { getUserSelections } from "@/app/actions/movieActions";
import { getMovieDetails } from "./getMovieDetails";
import { Movie } from "@/app/types/movie";

export async function getSearchPageData(query: string, page: number = 1) {
  const searchResults = await getSearchResults(query, page);

  const [moviesWithDetails, userSelections] = await Promise.all([
    Promise.all(
      searchResults.results.map(async (movie: Movie) => {
        const details = await getMovieDetails(movie.id);

        return {
          ...movie,
          genres: details.genres,
          runtime: details.runtime,
        };
      }),
    ),

    getUserSelections(),
  ]);

  return {
    movies: moviesWithDetails,
    totalPages:
      searchResults.total_pages > 500 ? 500 : searchResults.total_pages,
    totalResults: searchResults.total_results,
    favoriteIds: userSelections.favoriteIds,
    bookmarkedIds: userSelections.bookmarkedIds,
  };
}
