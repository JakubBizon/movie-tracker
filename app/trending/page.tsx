import { getTrendingMovies } from "@/lib/movies/getTrendingMovies";
import { Movie } from "../types/movie";
import TrendingGrid from "@/components/Trending/TrendingGrid";
import { getUserSelections } from "../actions/movieActions";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CustomPaginaton from "@/components/Trending/_components/CustomPagination";

interface Props {
  searchParams: Promise<{ page?: string }>;
}

export default async function TrendingPage({ searchParams }: Props) {
  const sParams = await searchParams;
  const currentPage = Number(sParams.page) || 1;

  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const { favoriteIds, bookmarkedIds } = userId
    ? await getUserSelections(userId)
    : { favoriteIds: [], bookmarkedIds: [] };

  const data = await getTrendingMovies(currentPage);
  const movies: Movie[] = data.results;
  const totalPages = data.total_pages > 500 ? 500 : data.total_pages;

  return (
    <div className=" max-w-7xl mx-auto ">
      <h1 className="text-3xl font-bold mb-6">Trending Movies</h1>

      <div className="space-y-5 mb-15">
        <TrendingGrid
          movies={movies}
          bookmarkedIds={bookmarkedIds}
          favoriteIds={favoriteIds}
        />
        <CustomPaginaton
          totalPages={totalPages}
          currentPage={currentPage}
          baseUrl="/trending"
        />
      </div>
    </div>
  );
}
