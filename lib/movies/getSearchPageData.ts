import { headers } from "next/headers";
import { auth } from "../auth";
import { getSearchResults } from "./getSearchResults";
import { getUserSelections } from "@/app/actions/movieActions";
import { getMovieDetails } from "./getMovieDetails";

export async function getSearchPageData(query: string, page: number = 1) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;
  const searchResults = await getSearchResults(query, page);

  const [moviesWithDetails, userSelections] = await Promise.all([
    Promise.all(
      searchResults.results.map(async (movie: { id: number }) => {
        const details = await getMovieDetails(movie.id);

        return {
          ...movie,
          genres: details.genres,
          runtime: details.runtime,
        };
      }),
    ),

    userId ? getUserSelections(userId) : { favoriteIds: [], bookmarkedIds: [] },
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
