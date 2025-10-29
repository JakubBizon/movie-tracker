import { Movie } from "@/app/types/movie";
import Image from "next/image";
interface MovieCardProps {
  movie: Movie;
}
export default function MovieCard({ movie }: MovieCardProps) {
  return (
    <div className="shrink-0 relative hover:scale-105 transition-all duration-200">
      <Image
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        width={200}
        height={300}
        className="rounded-lg shadow-lg"
      />
      <h3 className="text-white max-w-[200px] absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black to-transparent font-semibold line-clamp-2 rounded-b-lg">
        {movie.title}
      </h3>
      <p className="text-white absolute top-2 right-2 z-10 px-1 py-1 text-sm rounded-xl bg-gray-700">
        ⭐ {movie.vote_average.toFixed(1)}
      </p>
    </div>
  );
}
