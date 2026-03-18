import { Genre, Movie } from "@/app/types/movie";
import MoviesGrid from "../Trending/MoviesGrid";
import CustomPaginaton from "../Trending/_components/CustomPagination";
import { Card } from "../ui/card";
import { ChevronRight } from "lucide-react";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";
import { Button } from "../ui/button";

type Props = {
  title: string;
  movies: Movie[];
  bookmarkedIds: string[];
  favoriteIds: string[];
  pagination: {
    currentPage: number;
    totalPages: number;
    baseUrl: string;
  };
  children?: React.ReactNode;
};

export default async function MovieExplorer({
  title,
  movies,
  favoriteIds,
  bookmarkedIds,
  pagination,
}: Props) {
  const { genres } = await getMovieGenres();
  console.log(genres);

  return (
    <div className="max-w-7xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex flex-row">
        <div className="w-xs pr-4 space-y-4">
          <Card className="flex flex-row justify-between items-center px-4 text-lg">
            <span className="font-bold">Sort</span>
            <ChevronRight />
          </Card>

          <Card className="flex flex-col">
            <div className=" flex items-center px-4">
              <h1 className="text-lg font-bold">Filters</h1>
            </div>
            <hr className="border-border" />

            <div className="px-4  py-2 space-y-4">
              <h2>Release dates</h2>
              <div className="flex justify-between items-center">
                <p className="text-neutral-400 font-bold">from</p>
                <input type="date" className="border rounded-md px-2 py-2" />
              </div>

              <div className="flex justify-between items-center">
                <p className="text-neutral-400 font-bold">to</p>
                <input
                  type="date"
                  placeholder=""
                  className="border rounded-md px-2 py-2"
                />
              </div>
            </div>
            <hr className="border-border" />

            <div className="px-4 py-2 space-y-3">
              <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                Genres
              </h2>
              <div className="flex flex-wrap gap-2">
                {genres.map((genre: Genre) => (
                  <button
                    key={genre.id}
                    className="px-3 py-1 text-sm rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
                  >
                    {genre.name}
                  </button>
                ))}
              </div>
            </div>
          </Card>

          <Button
            className="w-full text-xl bg-primary text-white rounded-full py-6"
            variant="outline"
          >
            Search
          </Button>
        </div>

        <div className="space-y-5 mb-15">
          <MoviesGrid
            movies={movies}
            bookmarkedIds={bookmarkedIds}
            favoriteIds={favoriteIds}
          />
          <CustomPaginaton {...pagination} />
        </div>
      </div>
    </div>
  );
}
