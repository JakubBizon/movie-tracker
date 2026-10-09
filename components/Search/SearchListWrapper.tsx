import { Movie } from "@/app/types/movie";
import CustomPagination from "../Movies/_components/CustomPagination";
import { Suspense } from "react";
import SearchList from "./_components/SearchList";
import TrendingSection from "../MainPage/CarouselSections/TrendingSection";
import { Clapperboard } from "lucide-react";
import Link from "next/link";

type Props = {
  movies: Movie[];
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
  pagination: {
    currentPage: number;
    totalPages: number;
  };
};

export default function SearchListWrapper({
  movies,
  initialSelections,
  pagination,
}: Props) {
  return (
    <div className="flex flex-col max-w-7xl w-full mx-auto">
      {movies.length > 0 ? (
        <div className="max-w-6xl w-full mx-auto">
          <SearchList movies={movies} initialSelections={initialSelections} />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full mx-auto">
          <div className="flex flex-col items-center justify-center py-12 text-center gap-3">
            <div className="flex flex-col items-center">
              <Clapperboard className="w-12 h-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No movies found
              </h3>
              <ul className="list-disc text-sm text-muted-foreground">
                <li>Check your spelling</li>
                <li> Try shorter spelling</li>
              </ul>
              <span className="text-white">or</span>
            </div>

            <div className="flex gap-3">
              <Link
                href="/movie"
                className="rounded-md px-4 py-2 border bg-indigo-500 text-white hover:bg-indigo-400 "
              >
                Browse movies
              </Link>
            </div>
          </div>
          <div className="w-full">
            <TrendingSection />
          </div>
        </div>
      )}

      {pagination.totalPages > 1 && (
        <Suspense fallback={null}>
          <CustomPagination
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </Suspense>
      )}
    </div>
  );
}
