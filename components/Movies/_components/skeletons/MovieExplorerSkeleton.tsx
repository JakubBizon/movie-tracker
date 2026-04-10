import { Skeleton } from "@/components/ui/skeleton";
import MobileFiltersSkeleton from "./MobileFiltersSkeleton";
import FiltersSkeleton from "./FiltersSkeleton";
import MoviesGridSkeleton from "./MoviesGridSkeleton";

export default function MovieExplorerSkeleton() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <Skeleton className="w-64 h-9 " />
        <div className="lg:hidden flex gap-2">
          <MobileFiltersSkeleton />
        </div>
      </div>

      <div className="flex lg:flex-row flex-col gap-10">
        <aside className="w-full lg:max-w-xs hidden lg:block shrink-0">
          <FiltersSkeleton />
        </aside>

        <MoviesGridSkeleton />
      </div>
    </div>
  );
}
