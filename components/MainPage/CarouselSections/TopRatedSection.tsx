import { getTopRatedMovies } from "@/lib/movies/getTopRatedMovies";
import MovieCarousel from "../MovieCarousel";
import { SectionHeader } from "../SectionHeader";
import { Trophy } from "lucide-react";

export default async function TrendingSection() {
  const data = await getTopRatedMovies();

  return (
    <>
      <SectionHeader
        title="Top Rated"
        icon={<Trophy className="h-6 w-6 text-amber-500" />}
      />
      <MovieCarousel movies={data.results} />
    </>
  );
>
