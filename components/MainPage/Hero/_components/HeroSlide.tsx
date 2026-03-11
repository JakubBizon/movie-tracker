import { HeroMovie } from "@/app/types/movie";
import InteractionButtons from "@/components/MoviePage/Hero/_components/InteractionButtons";
import TrailerDialog from "@/components/MoviePage/Hero/_components/TrailerDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { minutesToTime } from "@/lib/utils/minutesToTime";
import { slugify } from "@/lib/utils/slugify";
import { Calendar, Clock, Info, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  movie: HeroMovie;
};

export default function HeroSlide({ movie }: Props) {
  return (
    <div className="relative h-[600px] w-full overflow-hidden rounded-lg border-none outline-none shadow-none">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        className="object-cover"
        fill
        priority
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/70 via-background/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-background/70 via-background/30 to-transparent" />

      <div className="absolute top-20 left-0 p-8 z-10 space-y-3">
        <h2 className="text-5xl font-semibold ">{movie.title}</h2>

        <div className="flex flex-wrap items-center gap-4 text-sm ">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span>{movie.release_date.slice(0, 4)}</span>
          </div>
          {movie.runtime && (
            <div className="flex items-center gap-1">
              <Clock className="h-5 w-5" />
              <span>{minutesToTime(movie.runtime)} min</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          {movie.genres?.map((genre) => (
            <Badge key={genre.id}>{genre.name}</Badge>
          ))}
        </div>

        <div className="w-3/5 text-lg  line-clamp-3 text-pretty">
          {movie.overview}
        </div>
        <div className="flex items-center gap-2">
          <TrailerDialog trailerLink={movie.trailer} movie={movie} />
          <Button
            asChild
            size="lg"
            variant="outline"
            className="glass border-border/50 bg-transparent cursor-pointer"
          >
            <Link href={`/movie/${slugify(movie.title, movie.id)}`}>
              {" "}
              <Info className="mr-2 h-5 w-5" />
              More info
            </Link>
          </Button>

          <InteractionButtons
            initialIsBookmarked={movie.isBookmarked}
            initialIsFavorite={movie.isFavorite}
            data={movie}
            showRating={false}
          />
        </div>
      </div>
    </div>
  );
}
