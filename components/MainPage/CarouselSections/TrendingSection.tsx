import { getTrendingMovies } from "@/lib/movies/getTrendingMovies";
import MovieCarousel from "../MovieCarousel";

export default async function TrendingSection() {
  const data = await getTrendingMovies();
  console.log(data.results);
  return <MovieCarousel movies={data.results} limit={20} />;
}
