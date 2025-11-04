import { getTopRatedMovies } from "@/lib/getTopRatedMovies";
import MovieCarousel from "../MovieCarousel";

export default async function TrendingSection() {
  const data = await getTopRatedMovies();
  return <MovieCarousel movies={data.results} limit={10} />;
}
