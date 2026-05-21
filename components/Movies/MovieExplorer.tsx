import { Movie } from "@/app/types/movie";
import { Suspense } from "react";
import MoviesGridWrapper from "./_components/MoviesGridWrapper";
import FiltersWrapper from "./_components/FiltersWrapper";
import MobileFiltersWrapper from "./_components/MobileFiltersWrapper";
import MoviesGridSkeleton from "./_components/skeletons/MoviesGridSkeleton";
import MobileFiltersSkeleton from "./_components/skeletons/MobileFiltersSkeleton";
import FiltersSkeleton from "./_components/skeletons/FiltersSkeleton";

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
  children?: React.ReactNode;
};

export default async function MovieExplorer({
  title,
  defaultFrom,
  defaultTo,
  moviesPromise,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="w-full">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-xl xs:text-3xl font-bold">{title}</h1>
          <div className="lg:hidden flex gap-2">
            <Suspense fallback={<MobileFiltersSkeleton />}>
              <MobileFiltersWrapper
                defaultFrom={defaultFrom}
                defaultTo={defaultTo}
              />
            </Suspense>
          </div>
        </div>
        <div className="flex lg:flex-row flex-col gap-10 justify-center w-full">
          <aside className="w-full lg:w-80 hidden lg:block shrink-0">
            <Suspense fallback={<FiltersSkeleton />}>
              <FiltersWrapper defaultFrom={defaultFrom} defaultTo={defaultTo} />
            </Suspense>
          </aside>
          <div className="min-w-0 flex-1">
            <Suspense fallback={<MoviesGridSkeleton />}>
              <MoviesGridWrapper moviesPromise={moviesPromise} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
