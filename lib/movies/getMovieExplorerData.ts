import { redirect } from "next/navigation";
import { getMoviesPageData } from "./getMoviePagesData";

type SearchParams = {
  page?: string;
  sort?: string;
  genres?: string;
  from?: string;
  to?: string;
};

type getMoviesFn = Parameters<typeof getMoviesPageData>[0];
export async function getMovieExplorerData(
  getMoviesFn: getMoviesFn,
  searchParams: SearchParams,
  basePath: string,
) {
  const { page, sort, genres, from, to } = searchParams;
  const pageNum = Number(page);
  const isInvalidPage =
    page !== undefined && (!Number.isInteger(pageNum) || pageNum < 1);
  if (isInvalidPage) {
    redirect(`${basePath}`);
  }
  const currentPage = page ? pageNum : 1;

  const rawData = await getMoviesPageData(getMoviesFn, currentPage, {
    sort,
    genres,
    from,
    to,
  });

  if (currentPage > 500) {
    const params = new URLSearchParams();
    if (sort) params.set("sort", sort);
    if (genres) params.set("genres", genres);
    if (from) params.set("from", from);
    if (to) params.set("to", to);
    params.set("page", "500");
    redirect(`/movie?${params.toString()}`);
  }

  return {
    movies: rawData.movies,
    bookmarkedIds: rawData.bookmarkedIds,
    favoriteIds: rawData.favoriteIds,
    pagination: {
      currentPage,
      totalPages: rawData.totalPages,
    },
  };
}
