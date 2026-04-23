import { headers } from "next/headers";
import { auth } from "../auth";
import { getSearchResults } from "./getSearchResults";
import { getUserSelections } from "@/app/actions/movieActions";

export async function getSearchPageData(query: string, page: number = 1) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user.id;

  const [searchData, userSelections] = await Promise.all([
    getSearchResults(query, page),
    userId ? getUserSelections(userId) : { favoriteIds: [], bookmarkedIds: [] },
  ]);

  return {
    movies: searchData.results,
    totalPages: searchData.total_pages > 500 ? 500 : searchData.total_pages,
    totalResults: searchData.total_results,
    favoriteIds: userSelections.favoriteIds,
    bookmarkedIds: userSelections.bookmarkedIds,
  };
}
