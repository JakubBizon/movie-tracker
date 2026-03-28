import { Movie } from "@/app/types/movie";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";
import MoviesGrid from "./_components/MoviesGrid";
import Filters from "./_components/Filters";
import CustomPagination from "./_components/CustomPagination";
import FiltersDialog from "./_components/FiltersDialog";
import SortDialog from "./_components/SortDialog";

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
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6 px-4 sm:px-6">
        <h1 className="text-xl xs:text-3xl font-bold">{title}</h1>
        <div className="lg:hidden flex gap-2">
          <SortDialog />
          <FiltersDialog genres={genres} />
        </div>
      </div>

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
