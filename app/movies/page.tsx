import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";

interface Props {
  searchParams: Promise<{ page?: string }>;
}
export default async function PopularMovies({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;
  const data = await getMoviesPageData(getPopularMovies, currentPage);

  return (
    <MovieExplorer
      title="Popular Movies"
      movies={data.movies}
      favoriteIds={data.favoriteIds}
      bookmarkedIds={data.bookmarkedIds}
      pagination={{
        currentPage: currentPage,
        totalPages: data.totalPages,
        baseUrl: "/movies",
      }}
    />
  );
}
