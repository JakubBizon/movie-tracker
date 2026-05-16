import { Movie } from "@/app/types/movie";
import MovieCard from "./MovieCard";
import { Carousel } from "./Carousel";
import { slugify } from "@/lib/utils/slugify";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSelections } from "@/app/actions/movieActions";

interface MoviesCarouselProps {
  movies: Movie[];
  limit?: number;
}

export default async function MovieCarousel({
  limit,
  movies,
}: MoviesCarouselProps) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const { favoriteIds, bookmarkedIds } = userId
    ? await getUserSelections(userId)
    : { favoriteIds: [], bookmarkedIds: [] };
  const displayedMovies = limit ? movies.slice(0, limit) : movies;

  const renderedItems = displayedMovies.map((movie: Movie) => {
    return (
      <div
        key={movie.id}
        className="w-[140px] xs:w-[160px] sm:w-[180px] md:w-[220px] lg:w-[240px] shrink-0"
      >
        <MovieCard
          movie={movie}
          slug={slugify(movie.title, movie.id)}
          initialSelections={{
            favoriteIds,
            bookmarkedIds,
          }}
          priority={limit ? movies.indexOf(movie) < 5 : false}
        />
      </div>
    );
  });

  return <Carousel items={renderedItems} />;
}
