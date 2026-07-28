import MovieCarousel from "../MovieCarousel";
import { SectionHeader } from "../SectionHeader";
import { Calendar } from "lucide-react";
import { getUpcomingMovies } from "@/lib/movies/getUpcomingMovies";

export default async function UpcomingSection() {
  const data = await getUpcomingMovies();
  return (
    <>
      <SectionHeader
        title="Upcoming Movies"
        icon={<Calendar className="w-8 h-8 text-blue-300" />}
        link="movie/upcoming"
      />
      <MovieCarousel movies={data.results} section="upcoming section" />
    </>
  );
}
