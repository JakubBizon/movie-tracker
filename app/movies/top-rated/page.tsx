import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getTopRatedMovies } from "@/lib/movies/getTopRatedMovies";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function TopRatedPage({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await getMoviesPageData(getTopRatedMovies, currentPage);

  return (
    <div className=" max-w-7xl mx-auto ">
      <MovieExplorer
        title="Top Rated Movies"
        movies={data.movies}
        bookmarkedIds={data.bookmarkedIds}
        favoriteIds={data.favoriteIds}
        pagination={{
          currentPage: currentPage,
          totalPages: data.totalPages,
          baseUrl: "/movies/top-rated",
        }}
      />
    </div>
  );
}
