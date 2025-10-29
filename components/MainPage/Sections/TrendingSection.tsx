import { getTrendingMovies } from "@/lib/getTrendingMovies";
import { Movie } from "@/app/types/movie";
import MovieCard from "../MovieCard";
import { Carousel } from "../Carousel";

export default async function TrendingSection() {
  const data = await getTrendingMovies();
  const renderedItems = data.results
    ?.slice(0, 10)
    .map((movie: Movie) => <MovieCard movie={movie} key={movie.id} />);

  return <Carousel items={renderedItems} />;
}
