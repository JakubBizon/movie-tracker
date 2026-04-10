import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMovies } from "@/lib/movies/getMovies";
import { Suspense } from "react";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";
import MovieExplorerSkeleton from "@/components/Movies/_components/skeletons/MovieExplorerSkeleton";

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
  const genresPromise = getMovieGenres();

  return (
    <div className=" max-w-7xl mx-auto ">
      <Suspense fallback={<MovieExplorerSkeleton />}>
        <MovieExplorer
          title="Top Rated Movies"
          moviesPromise={moviesPromise}
          genresPromise={genresPromise}
        />
      </Suspense>
    </div>
  );
}
