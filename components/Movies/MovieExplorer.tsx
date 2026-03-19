import { Movie } from "@/app/types/movie";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";
import MoviesGrid from "./MoviesGrid";
import CustomPagination from "./CustomPagination";
import Filters from "./Filters";

type Props = {
  title: string;
  movies: Movie[];
  bookmarkedIds: string[];
  favoriteIds: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
  };
  children?: React.ReactNode;
};

export default async function MovieExplorer({
  title,
  movies,
  favoriteIds,
  bookmarkedIds,
  pagination,
}: Props) {
  const { genres } = await getMovieGenres();

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex flex-row">
        <Filters genres={genres} />

        <div className="space-y-5">
          <MoviesGrid
            movies={movies}
            bookmarkedIds={bookmarkedIds}
            favoriteIds={favoriteIds}
          />
          <CustomPagination {...pagination} />
        </div>
      </div>
    </div>
  );
}
