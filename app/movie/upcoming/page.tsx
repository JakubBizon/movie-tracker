import MoviesGridSkeleton from "@/components/Movies/_components/MoviesGridSkeleton";
import getUpcomingDateRange from "@/components/Movies/hooks/getUpcomingDateRange";
import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import { getMovies } from "@/lib/movies/getMovies";
import { Suspense } from "react";

interface Props {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    genres?: string;
    from?: string;
    to?: string;
  }>;
}
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
    <>
      <Suspense fallback={<MoviesGridSkeleton />}>
        <MovieExplorer
          defaultFrom={defaultFrom}
          defaultTo={defaultTo}
          title="Upcoming Movies"
          moviesPromise={moviesPromise}
        />
      </Suspense>
    </>
  );
}
