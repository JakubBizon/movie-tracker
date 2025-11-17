import MovieCarousel from "../MovieCarousel";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";

export default async function TrendingSection() {
  const data = await getPopularMovies();
  return <MovieCarousel movies={data.results} limit={20} />;
}
