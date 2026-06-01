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
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
  userId?: string;
};

export default function SearchMovieCard({
  movie,
  initialSelections,
  userId,
}: Props) {
  const href = `/movie/${slugify(movie.title, movie.id)}`;

  return (
    <div className="rounded-lg border border-gray-300 bg-white  dark:border-gray-600 dark:bg-slate-800">
      <div className="flex gap-3 md:gap-6 h-full">
        <Link href={href} className="shrink-0 w-22 md:w-25">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title}
            width={100}
            height={150}
            className="w-full h-full rounded-l-lg object-cover aspect-2/3"
          />
        </Link>

        <div className="flex min-w-0 flex-1 flex-col p-3 md:p-4">
          <Link href={href}>
            <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white md:text-lg">
              {movie.title}
            </h3>
          </Link>

          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-600 dark:text-gray-300 md:text-sm">
            {movie.release_date && (
              <span>{movie.release_date.slice(0, 4)}</span>
            )}

            <div className="flex items-center gap-1 leading-none">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 md:h-4 md:w-4" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>

            {movie.runtime ? <span>{minutesToTime(movie.runtime)}</span> : null}
          </div>

          <div className="mt-2 flex flex-wrap gap-1.5">
            {movie.genres?.slice(0, 3).map((genre) => (
              <Badge
                key={genre.id}
                className="border border-slate-200 bg-slate-100 px-2 py-0.5 text-[10px] text-slate-700 dark:border-slate-600 dark:bg-slate-700 dark:text-white md:text-xs"
              >
                {genre.name}
              </Badge>
            ))}
          </div>

          <div className="mt-3 flex gap-2 xs:hidden">
            <InteractionButtons
              size={"sm"}
              initialSelections={{
                favoriteIds: initialSelections?.favoriteIds ?? [],
                bookmarkedIds: initialSelections?.bookmarkedIds ?? [],
              }}
              data={movie}
              userId={userId}
            />

            <Button asChild size="sm" variant="outline">
              <Link href={href}>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="hidden xs:flex gap-2 p-3 md:p-4">
          <InteractionButtons
            initialSelections={{
              favoriteIds: initialSelections?.favoriteIds ?? [],
              bookmarkedIds: initialSelections?.bookmarkedIds ?? [],
            }}
            data={movie}
            userId={userId}
          />

          <Button asChild size="lg" variant="outline">
            <Link href={href}>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
