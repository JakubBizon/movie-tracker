import MovieCarousel from "../MovieCarousel";
import { getPopularMovies } from "@/lib/movies/getPopularMovies";
import { SectionHeader } from "../SectionHeader";
import { Star } from "lucide-react";

export default async function PopularSection() {
  const data = await getPopularMovies(1);

  return (
    <>
      <SectionHeader
        title="Popular Movies"
        icon={<Star className="h-6 w-6 text-yellow-400" />}
        link="/movie"
      />
      <MovieCarousel movies={data.results} section="popular movies" />
    </>
  );
}
