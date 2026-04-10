import { Genre, Movie } from "@/app/types/movie";
import { Suspense } from "react";
import MoviesGridWrapper from "./_components/MoviesGridWrapper";
import FiltersWrapper from "./_components/FiltersWrapper";
import MobileFiltersWrapper from "./_components/MobileFiltersWrapper";
import FiltersSkeleton from "./_components/skeletons/FiltersSkeleton";
import MoviesGridSkeleton from "./_components/skeletons/MoviesGridSkeleton";
import MobileFiltersSkeleton from "./_components/skeletons/MobileFiltersSkeleton";

type Props = {
  title: string;
  defaultFrom?: Date;
  defaultTo?: Date;
  moviesPromise: Promise<{
    movies: Movie[];
    bookmarkedIds: string[];
    favoriteIds: string[];
    pagination: {
      currentPage: number;
      totalPages: number;
    };
  }>;
  genresPromise: Promise<{ genres: Genre[] }>;
  children?: React.ReactNode;
};

export default async function MovieExplorer({
  title,
  defaultFrom,
  defaultTo,
  moviesPromise,
  genresPromise,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl xs:text-3xl font-bold">{title}</h1>
        <div className="lg:hidden flex gap-2">
          <Suspense fallback={<MobileFiltersSkeleton />}>
            <MobileFiltersWrapper
              genresPromise={genresPromise}
              defaultFrom={defaultFrom}
              defaultTo={defaultTo}
            />
          </Suspense>
        </div>
      </div>

      <div className="flex lg:flex-row flex-col space-x-10">
        <aside className="w-full lg:max-w-xs hidden lg:block shrink-0">
          <Suspense fallback={<FiltersSkeleton />}>
            <FiltersWrapper
              genresPromise={genresPromise}
              defaultFrom={defaultFrom}
              defaultTo={defaultTo}
            />
          </Suspense>
        </aside>

        <Suspense fallback={<MoviesGridSkeleton />}>
          <MoviesGridWrapper moviesPromise={moviesPromise} />
        </Suspense>
      </div>
    </div>
  );
}
