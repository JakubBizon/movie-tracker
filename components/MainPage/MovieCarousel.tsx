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
    const movieIdStr = movie.id.toString();
    return (
      <MovieCard
        movie={movie}
        key={movie.id}
        slug={slugify(movie.title, movie.id)}
        initialIsFavorite={favoriteIds.includes(movieIdStr)}
        initialIsBookmarked={bookmarkedIds.includes(movieIdStr)}
      />
    );
  });

  return <Carousel items={renderedItems} />;
}
