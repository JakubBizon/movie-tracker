import { Movie } from "@/app/types/movie";
import MovieCard from "../MovieCard";
import { Carousel } from "../Carousel";
import { getPopularMovies } from "@/lib/getPopularMovies";

export default async function PopularSection() {
  const data = await getPopularMovies();
  console.log(data);
  const renderedItems = data.results?.map((movie: Movie) => (
    <MovieCard movie={movie} key={movie.id} />
  ));

  return <Carousel items={renderedItems} />;
}
