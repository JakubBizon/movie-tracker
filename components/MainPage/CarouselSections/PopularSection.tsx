import MovieCarousel from "../MovieCarousel";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";
import { SectionHeader } from "../SectionHeader";
import { Star } from "lucide-react";

export default async function TrendingSection() {
  const data = await getPopularMovies();

  return (
    <>
      <SectionHeader
        title="Popular Movies"
        icon={<Star className="h-6 w-6 text-yellow-400" />}
      />
      <MovieCarousel movies={data.results} />
    </>
  );
}
