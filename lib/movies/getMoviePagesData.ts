import { Movie } from "@/app/types/movie";
import { auth } from "../auth";
import { headers } from "next/headers";
import { getUserSelections } from "@/app/actions/movieActions";

type FetcherFn = (
  page: number,
  options?: { sort?: string; genres?: string; from?: string; to?: string },
  preset?: "top-rated" | "upcoming",
) => Promise<{ results: Movie[]; total_pages: number }>;

export async function getMoviesPageData(
  fetcher: FetcherFn,
  page: number,
  options?: { sort?: string; genres?: string; from?: string; to?: string },
  preset?: "top-rated" | "upcoming",
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user.id;

  const [movieData, userSelections] = await Promise.all([
    fetcher(page, options, preset),
    userId ? getUserSelections(userId) : { favoriteIds: [], bookmarkedIds: [] },
  ]);

  return {
    movies: movieData.results,
    totalPages: movieData.total_pages > 500 ? 500 : movieData.total_pages,
    favoriteIds: userSelections.favoriteIds,
    bookmarkedIds: userSelections.bookmarkedIds,
  };
}
