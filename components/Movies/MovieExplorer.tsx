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
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex lg:flex-row flex-col">
        <aside className="w-full lg:max-w-xs hidden lg:block shrink-0">
          <Filters genres={genres} />
        </aside>

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
