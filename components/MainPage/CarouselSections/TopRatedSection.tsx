import { getTopRatedMovies } from "@/lib/movies/getTopRatedMovies";
import MovieCarousel from "../MovieCarousel";
import { SectionHeader } from "../SectionHeader";
import { Trophy } from "lucide-react";

export default async function TopRatedSection() {
  const data = await getTopRatedMovies(1);

  return (
    <>
      <SectionHeader
        title="Top Rated Movies"
        icon={<Trophy className="h-6 w-6 text-amber-500" />}
        link="/movie/top-rated"
      />
      <MovieCarousel movies={data.results} section="top rated" />
    </>
  );
}
