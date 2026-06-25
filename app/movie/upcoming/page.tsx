import getUpcomingDateRange from "@/components/Movies/hooks/getUpcomingDateRange";
import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import { getMovies } from "@/lib/movies/getMovies";
import { Metadata } from "next";

interface Props {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    genres?: string;
    from?: string;
    to?: string;
  }>;
}
export const metadata: Metadata = {
  title: "Upcoming",
};

export default async function UpcomingMovies({ searchParams }: Props) {
  const { page, sort, genres, from, to } = await searchParams;
  const currentPage = Number(page) || 1;

  const moviesPromise = getMoviesPageData(
    getMovies,
    currentPage,
    {
      sort,
      genres,
      from,
      to,
    },
    "upcoming",
  ).then((data) => ({
    movies: data.movies,
    bookmarkedIds: data.bookmarkedIds,
    favoriteIds: data.favoriteIds,
    pagination: {
      currentPage,
      totalPages: data.totalPages,
    },
  }));

  const { defaultFrom, defaultTo } = getUpcomingDateRange();

  return (
    <MovieExplorer
      defaultFrom={defaultFrom}
      defaultTo={defaultTo}
      title="Upcoming Movies"
      moviesPromise={moviesPromise}
    />
  );
}
