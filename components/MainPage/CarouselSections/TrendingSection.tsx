import { getTrendingMovies } from "@/lib/movies/getTrendingMovies";
import MovieCarousel from "../MovieCarousel";
import { SectionHeader } from "../SectionHeader";
import { FlameIcon } from "lucide-react";

export default async function TrendingSection() {
  const data = await getTrendingMovies();
  console.log(data.results);

  return (
    <>
      <SectionHeader
        title="Trending Movies"
        icon={<FlameIcon className="w-8 h-8 text-yellow-300" />}
      />
      <MovieCarousel movies={data.results} />
    </>
  );
}
