import MovieExplorer from "@/components/Movies/MovieExplorer";
import { getMovieExplorerData } from "@/lib/movies/getMovieExplorerData";
import { getMovies } from "@/lib/movies/getMovies";
import { Metadata } from "next";

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
  title: "Popular",
};

export default async function PopularMovies({ searchParams }: Props) {
  const data = getMovieExplorerData(getMovies, await searchParams, "/movie");

  return (
    <div className="max-w-7xl mx-auto">
      <MovieExplorer
        title="Popular Movies"
        moviesPromise={Promise.resolve(data)}
      />
    </div>
  );
}
