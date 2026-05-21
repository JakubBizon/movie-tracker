import { Movie } from "@/app/types/movie";
import CustomPagination from "./CustomPagination";
import { Suspense } from "react";
import MoviesGridClient from "./MoviesGridClient";

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
      <MoviesGridClient
        movies={movies}
        initialSelections={{ bookmarkedIds, favoriteIds }}
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
