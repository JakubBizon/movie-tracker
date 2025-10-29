import { Movie } from "@/app/types/movie";
import MovieCard from "../MovieCard";
import { Carousel } from "../Carousel";
import { getTopRatedMovies } from "@/lib/getTopRatedMovies";

export default async function TopRatedSection() {
  const data = await getTopRatedMovies();
  const renderedItems = data.results
    ?.slice(0, 10)
    .map((movie: Movie) => <MovieCard movie={movie} key={movie.id} />);

  return <Carousel items={renderedItems} />;
}
