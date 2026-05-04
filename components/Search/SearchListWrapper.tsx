import { Movie } from "@/app/types/movie";
import CustomPagination from "../Movies/_components/CustomPagination";
import { Suspense } from "react";
import SearchList from "./_components/SearchList";

type Props = {
  movies: Movie[];
  bookmarkedIds: string[];
  favoriteIds: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
  };
};

export default function SearchListWrapper({
  movies,
  bookmarkedIds,
  favoriteIds,
  pagination,
}: Props) {
  return (
    <div className="flex flex-col max-w-6xl w-full mx-auto">
      <SearchList
        movies={movies}
        bookmarkedIds={bookmarkedIds}
        favoriteIds={favoriteIds}
      />
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
