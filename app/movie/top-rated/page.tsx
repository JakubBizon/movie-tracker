import MovieExplorer from "@/components/Movies/MovieExplorer";
import { Metadata } from "next";
import { getTopRatedMovies } from "@/lib/movies/getTopRatedMovies";
import { getMovieExplorerData } from "@/lib/movies/getMovieExplorerData";

interface Props {
  searchParams: Promise<{
    page?: string;
    sort?: string;
    genres?: string;
    from?: string;
    to?: string;
  }>;
}
export const metadata: Metadata = {
  title: "Top Rated",
};

export default async function TopRatedPage({ searchParams }: Props) {
  const data = getMovieExplorerData(
    getTopRatedMovies,
    await searchParams,
    "/movie/top-rated",
  );
  return (
    <div className="max-w-7xl mx-auto ">
      <MovieExplorer
        title="Top Rated Movies"
        moviesPromise={Promise.resolve(data)}
      />
    </div>
  );
}
