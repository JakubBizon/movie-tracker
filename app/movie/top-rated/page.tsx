import { getMoviesPageData } from "@/lib/movies/getMoviePagesData";
import MovieExplorer from "@/components/Movies/MovieExplorer";
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
export default async function TopRatedPage({ searchParams }: Props) {
  const { page, sort, genres, from, to } = await searchParams;
  const currentPage = Number(page) || 1;

  const data = await getMoviesPageData(
    getMovies,
    currentPage,
    {
      sort,
      genres,
      from,
      to,
    },
    "top-rated",
  );
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
        }}
      />
    </div>
  );
}
