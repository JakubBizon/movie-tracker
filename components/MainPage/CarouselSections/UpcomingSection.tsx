import MovieCarousel from "../MovieCarousel";
import { SectionHeader } from "../SectionHeader";
import { Calendar } from "lucide-react";
import { getUpcomingMovies } from "@/lib/movies/getUpcomingMovies";

export default async function UpcomingSection() {
  const data = await getUpcomingMovies();
  console.log(data.results);
  return (
    <>
      <SectionHeader
        title="Upcoming Movies"
        icon={<Calendar className="w-8 h-8 text-blue-300" />}
      />
      <MovieCarousel movies={data.results} />
    </>
  );
}
