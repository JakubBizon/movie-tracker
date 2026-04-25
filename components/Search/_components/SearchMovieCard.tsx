"use client";
import { Movie } from "@/app/types/movie";
import InteractionButtons from "@/components/MoviePage/Hero/_components/InteractionButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { minutesToTime } from "@/lib/utils/minutesToTime";
import { slugify } from "@/lib/utils/slugify";
import { ArrowRight, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  movie: Movie;
  isBookmarked: boolean;
  isFavorite: boolean;
};

export default function SearchMovieCard({
  movie,
  isBookmarked,
  isFavorite,
}: Props) {
  return (
    <div className="flex items-center gap-4 p-4 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-800">
      <div className="flex flex-row justify-center gap-10 w-full">
        <Link href={`/movie/${slugify(movie.title, movie.id)}`}>
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={100}
            height={150}
            className="rounded-lg"
          />
        </Link>

        <div className="flex flex-1 justify-between w-full ">
          <div className="flex-col">
            <Link href={`/movie/${slugify(movie.title, movie.id)}`}>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-white">
                {movie.title}
              </h3>
            </Link>

            <div className="flex flex-row text-base gap-4 py-2">
              {movie.release_date && <span>{movie.release_date}</span>}
              <div className="flex flex-row leading-none items-center gap-1 ">
                <>
                  <Star className="fill-yellow-400 md:w-4 md:h-4 w-3 h-3 text-yellow-400" />
                  <span className="">{movie.vote_average.toFixed(1)}</span>
                </>
              </div>
              {movie.runtime ? (
                <span>{minutesToTime(movie.runtime)}</span>
              ) : null}
            </div>
            <div className="flex items-center gap-2">
              {movie.genres?.map((genre) => (
                <Badge
                  className="text-xs md:text-base bg-white/15 backdrop-blur-sm text-white border border-white/20 px-3 py-1"
                  key={genre.id}
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex gap-2">
            <InteractionButtons
              initialIsBookmarked={isBookmarked}
              initialIsFavorite={isFavorite}
              data={movie}
            />
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-transform"
            >
              <Link href={`/movie/${slugify(movie.title, movie.id)}`}>
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
