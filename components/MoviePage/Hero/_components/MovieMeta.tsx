import { Movie } from "@/app/types/movie";
import { Badge } from "@/components/ui/badge";
import { minutesToTime } from "@/lib/utils/minutesToTime";
import { Star } from "lucide-react";
type Props = {
  data: Movie;
};
export default function MovieMeta({ data }: Props) {
  return (
    <>
      <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight drop-shadow-lg">
        {data.title}
      </h1>

      <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
        <div className="flex items-center gap-1.5 bg-yellow-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-500/30">
          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          <span className="font-bold text-yellow-400">
            {data.vote_average.toFixed(1)}
          </span>
        </div>

        <span className="text-gray-200 font-medium px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md">
          {data.release_date.slice(0, 4)}
        </span>

        {data.runtime && (
          <span className="text-gray-200 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md">
            {minutesToTime(data.runtime)}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2 flex-wrap">
        {data.genres?.slice(0, 4).map((genre) => (
          <Badge
            className="text-sm md:text-base bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm text-white border border-white/20 px-3 py-1"
            key={genre.id}
          >
            {genre.name}
          </Badge>
        ))}
      </div>

      <p className="text-sm md:text-base lg:text-lg text-gray-100 leading-relaxed max-w-3xl text-pretty drop-shadow-md">
        {data.overview}
      </p>
    </>
  );
}
