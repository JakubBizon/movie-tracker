import { getTopRatedMovies } from "@/lib/movies/getTopRatedMovies";
import MovieCarousel from "../MovieCarousel";

export default async function TrendingSection() {
  const data = await getTopRatedMovies();
  return <MovieCarousel movies={data.results} limit={20} />;
}
