import { Movie } from "@/app/types/movie";
import { Badge } from "@/components/ui/badge";
import formatDate from "@/lib/utils/formatDate";
import { minutesToTime } from "@/lib/utils/minutesToTime";
import { Calendar, Clock, Star } from "lucide-react";
type Props = {
  data: Movie;
};
export default function MovieMeta({ data }: Props) {
  return (
    <>
      <h1 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight drop-shadow-lg pb-2">
        {data.title}
      </h1>

      <div className="space-y-5">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1">
            <Calendar className="h-5 w-5" />
            <span>{formatDate(data.release_date)}</span>
          </div>

          {data.runtime && (
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              <span>{minutesToTime(data.runtime)}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5 text-sm md:text-base bg-yellow-500/20 backdrop-blur-sm px-2 py-1 md:px-3 md:py-1.5 rounded-full border border-yellow-500/30">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="font-bold text-yellow-400">
              {data.vote_average.toFixed(1)}
            </span>
          </div>
          {data.genres?.slice(0, 4).map((genre) => (
            <Badge
              className="text-xs md:text-base bg-white/15 backdrop-blur-sm text-white border border-white/20 px-3 py-1"
              key={genre.id}
            >
              {genre.name}
            </Badge>
          ))}
        </div>

        <p className=" text-xs md:text-sm lg:text-lg text-gray-100 leading-relaxed  text-pretty drop-shadow-md">
          {data.overview}
        </p>
      </div>
    </>
  );
}
