import MovieCarousel from "@/components/MainPage/MovieCarousel";
import { notFound } from "next/navigation";
import { getSimilarMovies } from "@/lib/movies/getSimilarMovies";
type SimilarSectionProps = {
  id: number | null;
};

export default async function SimilarSection({ id }: SimilarSectionProps) {
  if (!id) return notFound();
  const data = await getSimilarMovies(id);
  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-4">
        <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
          Similar movies
        </h2>
      </div>
      <div className="w-full">
        <MovieCarousel movies={data.results} section="similar section" />
      </div>
    </div>
  );
}
