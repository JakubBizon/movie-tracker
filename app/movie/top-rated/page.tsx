import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMovies } from "@/lib/movies/getMovies";
import { Suspense } from "react";
import MoviesGridSkeleton from "@/components/Movies/_components/MoviesGridSkeleton";

interface Props {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    genres?: string;
    from?: string;
    to?: string;
  }>;
}
export default async function TopRatedPage({ searchParams }: Props) {
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
    "top-rated",
  ).then((data) => ({
    movies: data.movies,
    bookmarkedIds: data.bookmarkedIds,
    favoriteIds: data.favoriteIds,
    pagination: {
      currentPage,
      totalPages: data.totalPages,
    },
  }));

  return (
    <div className=" max-w-7xl mx-auto ">
      <Suspense fallback={<MoviesGridSkeleton />}>
        <MovieExplorer title="Top Rated Movies" moviesPromise={moviesPromise} />
      </Suspense>
    </div>
  );
}
