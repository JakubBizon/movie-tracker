import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import MovieExplorer from "@/components/Movies/MovieExplorer";
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
  title: "Top Rated",
};

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
    <div className="max-w-7xl mx-auto ">
      <MovieExplorer title="Top Rated Movies" moviesPromise={moviesPromise} />
    </div>
  );
}
