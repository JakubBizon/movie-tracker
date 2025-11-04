import { getTrendingMovies } from "@/lib/getTrendingMovies";
import MovieCarousel from "../MovieCarousel";

export default async function TrendingSection() {
  const data = await getTrendingMovies();
  return <MovieCarousel movies={data.results} limit={10} />;
}
