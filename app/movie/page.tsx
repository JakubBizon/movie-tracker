import MovieExplorerSkeleton from "@/components/Movies/_components/skeletons/MovieExplorerSkeleton";
import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";
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
export default async function PopularMovies({ searchParams }: Props) {
  const { page, sort, genres, from, to } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = getMoviesPageData(getMovies, currentPage, {
    sort,
    genres,
    from,
    to,
  }).then((data) => ({
    movies: data.movies,

    bookmarkedIds: data.bookmarkedIds,

    favoriteIds: data.favoriteIds,
    pagination: {
      currentPage: currentPage,
      totalPages: data.totalPages,
    },
  }));
  const genresPromise = getMovieGenres();

  return (
    <Suspense fallback={<MovieExplorerSkeleton />}>
      <MovieExplorer
        title="Popular Movies"
        moviesPromise={data}
        genresPromise={genresPromise}
      />
    </Suspense>
  );
}
