import { Movie } from "@/app/types/movie";
import MoviesGrid from "./MoviesGrid";
import CustomPagination from "./CustomPagination";
import { Suspense } from "react";

type Props = {
  moviesPromise: Promise<{
    movies: Movie[];
    bookmarkedIds: string[];
    favoriteIds: string[];
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  }>;
};

export default async function MovieGridWrapper({ moviesPromise }: Props) {
  const { movies, bookmarkedIds, favoriteIds, pagination } =
    await moviesPromise;

  return (
    <div className="flex flex-col">
      <MoviesGrid
        movies={movies}
        bookmarkedIds={bookmarkedIds}
        favoriteIds={favoriteIds}
      />
      <Suspense fallback={null}>
        <CustomPagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
        />
      </Suspense>
    </div>
  );
}
