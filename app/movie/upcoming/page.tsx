import getUpcomingDateRange from "@/components/Movies/hooks/getUpcomingDateRange";
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
  title: "Upcoming",
};

export default async function UpcomingMovies({ searchParams }: Props) {
  const data = getMovieExplorerData(
    getMovies,
    await searchParams,
    "/movie/upcoming",
    "upcoming",
  );
  const { defaultFrom, defaultTo } = getUpcomingDateRange();

  return (
    <MovieExplorer
      defaultFrom={defaultFrom}
      defaultTo={defaultTo}
      title="Upcoming Movies"
      moviesPromise={Promise.resolve(data)}
    />
  );
}
