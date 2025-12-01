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
    <>
      <div className="flex items-center justify-between px-4 py-1 mb-4">
        <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
          Similar movies
        </h2>
      </div>
      <MovieCarousel movies={data.results} />
    </>
  );
}
