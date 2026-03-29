import MovieExplorer from "@/components/Movies/MovieExplorer";
import { FiltersInitializer } from "@/components/Movies/upcoming/FiltersInitializer";
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
export default async function UpcomingMovies({ searchParams }: Props) {
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
    "upcoming",
  );

  return (
    <>
      <FiltersInitializer defaultFrom={new Date()} />
      <MovieExplorer
        title="Upcoming Movies"
        movies={data.movies}
        favoriteIds={data.favoriteIds}
        bookmarkedIds={data.bookmarkedIds}
        pagination={{
          currentPage: currentPage,
          totalPages: data.totalPages,
        }}
      />
    </>
  );
}
