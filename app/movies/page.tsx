import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import { getMovies } from "@/lib/movies/getMovies";

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

  const data = await getMoviesPageData(getMovies, currentPage, {
    sort,
    genres,
    from,
    to,
  });

  return (
    <MovieExplorer
      title="Popular Movies"
      movies={data.movies}
      favoriteIds={data.favoriteIds}
      bookmarkedIds={data.bookmarkedIds}
      pagination={{
        currentPage: currentPage,
        totalPages: data.totalPages,
      }}
    />
  );
}
