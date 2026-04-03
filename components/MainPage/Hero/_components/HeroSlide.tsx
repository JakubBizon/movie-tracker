import { HeroMovie } from "@/app/types/movie";
import InteractionButtons from "@/components/MoviePage/Hero/_components/InteractionButtons";
import TrailerDialog from "@/components/MoviePage/Hero/_components/TrailerDialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import formatDate from "@/lib/utils/formatDate";
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
    <>
      <div className="relative md:min-h-[500px] xs:min-h-[350px] min-h-[200px] w-full overflow-hidden rounded-lg border-none outline-none shadow-none">
        <Image
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className="object-cover"
          fill
          priority
        />

        <div className="absolute inset-0  bg-linear-to-r from-background/90 via-background/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent" />

        {/* Mobile overlay */}
        <Link
          href={`movie/${slugify(movie.title, movie.id)}`}
          className="md:hidden absolute inset-0 z-30"
        ></Link>
        <div className="max-w-3/4 absolute xs:top-1/2 top-2/3 -translate-y-1/2 left-0 p-8 z-20 space-y-3 pointer-events-none md:pointer-events-auto">
          <h2 className="md:text-5xl xs:text-4xl font-semibold text-white">
            {movie.title}
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm ">
            <div className="flex items-center gap-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="font-semibold">
                {movie.vote_average.toFixed(1)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <span>{formatDate(movie.release_date)}</span>
            </div>
            {movie.runtime && (
              <div className="flex items-center gap-1">
                <Clock className="h-5 w-5" />
                <span>{minutesToTime(movie.runtime)}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            {movie.genres?.map((genre) => (
              <Badge key={genre.id}>{genre.name}</Badge>
            ))}
          </div>
          <div className="w-3/5 text-lg hidden md:line-clamp-3 text-pretty">
            {movie.overview}
          </div>
          <div className="items-center gap-2 md:flex hidden z-30 relative pointer-events-auto">
            <TrailerDialog trailerLink={movie.trailer} movie={movie} />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="glass border-border/50 bg-transparent cursor-pointer"
            >
              <Link href={`/movie/${slugify(movie.title, movie.id)}`}>
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
    </>
  );
}
