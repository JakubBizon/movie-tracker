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
  index: number;
  userId?: string;
};

const tmdbImageLink = ({ src, width }: { src: string; width: number }) => {
  if (width <= 640) return `https://image.tmdb.org/t/p/w780${src}`;
  if (width <= 1280) return `https://image.tmdb.org/t/p/w1280${src}`;
  return `https://image.tmdb.org/t/p/original${src}`;
};

export default function HeroSlide({ movie, index, userId }: Props) {
  return (
    <div className="relative text-white md:min-h-[500px] xs:min-h-[350px] min-h-[200px] w-full overflow-hidden rounded-lg border-none outline-none shadow-none">
      <Image
        loader={tmdbImageLink}
        src={movie.backdrop_path}
        alt={movie.title}
        className="object-cover object-top"
        fill
        priority={index === 0}
        loading={index === 0 ? "eager" : "lazy"}
        sizes="(max-width: 640px) 100vw, (max-width: 1280px) 100vw, 1280px"
      />

      <div className="absolute inset-0 bg-linear-to-r from-slate-900/85 via-slate-900/40 to-transparent" />
      <div className="absolute inset-0 bg-linear-to-t from-slate-900/70 via-transparent to-transparent" />

      {/* Mobile overlay */}
      <Link
        href={`movie/${slugify(movie.title, movie.id)}`}
        aria-label={`Go to "${movie.title}" page`}
        className="absolute inset-0 z-30 md:hidden"
      />

      <div className="max-w-full absolute md:top-1/2 top-2/3 -translate-y-1/2 left-0 z-20 space-y-3 sm:p-6 p-4 pointer-events-none md:pointer-events-auto">
        <h2 className="md:text-5xl xs:text-4xl font-semibold text-white">
          {movie.title}
        </h2>
        <div className="flex flex-wrap items-center gap-4 xs:text-sm text-xs">
          <div className="flex items-center gap-1">
            <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
            <span className="font-semibold">
              {movie.vote_average.toFixed(1)}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="xs:h-5 xs:w-5 h-4 w-4 " />
            <span>{formatDate(movie.release_date)}</span>
          </div>
          {movie.runtime ? (
            <div className="flex items-center gap-1">
              <Clock className="xs:h-5 xs:w-5 h-4 w-4" />
              <span>{minutesToTime(movie.runtime)}</span>
            </div>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {movie.genres?.map((genre) => (
            <Badge className="xs:text-sm text-xs " key={genre.id}>
              {genre.name}
            </Badge>
          ))}
        </div>
        <div className="max-w-[60ch] text-lg hidden md:line-clamp-3 text-pretty">
          {movie.overview}
        </div>
        <div className="relative z-30 hidden items-center gap-2 md:flex pointer-events-auto">
          <TrailerDialog trailerLink={movie.trailer} movie={movie} />
          <InteractionButtons
            userId={userId}
            initialSelections={{
              bookmarkedIds: movie.bookmarkedIds,
              favoriteIds: movie.favoriteIds,
            }}
            data={movie}
            showRating={false}
          />
          <Button
            asChild
            size="lg"
            aria-label={`More info about ${movie.title}`}
            className="bg-white/10 hover:bg-white/20 xs:text-sm text-xs cursor-pointer text-white border border-white/20 backdrop-blur-md transition-all duration-300 shadow-xl font-medium"
          >
            <Link href={`/movie/${slugify(movie.title, movie.id)}`}>
              <Info className="mr-2 h-5 w-5" />
              More info
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
