"use client";

import { Movie } from "@/app/types/movie";
import { Clock, Film, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useMovieMutations } from "@/hooks/useMovieMutations";
import MovieInteractionDropdown from "@/components/MainPage/MovieInteractionDropdown";
import AuthDialog from "@/components/MoviePage/Hero/_components/AuthDialog";
import { slugify } from "@/lib/utils/slugify";
import MovieInteractionButtons from "@/components/MainPage/MovieInteractionButtons";
import useIsDesktop from "@/hooks/useIsDesktop";

type Props = {
  movie: Movie;
  isFavorite: boolean;
  isBookmarked: boolean;
  userId?: string;
};

function formatRuntime(minutes?: number) {
  if (!minutes) return null;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  return `${h}h ${String(m).padStart(2, "0")}min`;
}

export default function MovieSearchCard({
  movie,
  isFavorite,
  isBookmarked,
  userId,
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const slug = slugify(movie.title, movie.id);

  const { handleBookmark, handleFavorite } = useMovieMutations(
    movie,
    userId,
    () => setIsAuthOpen(true),
  );
  const { isDesktopLayout } = useIsDesktop();
  const showHoverButtons = isDesktopLayout && isHovered;

  const year = movie.release_date?.slice(0, 4);
  const runtime = formatRuntime(movie.runtime);
  const meta = [year, runtime].filter(Boolean).join("  ·  ");
  const hasPoster = Boolean(movie.poster_path);
  const hasRating = Boolean(movie.vote_average && movie.vote_average > 0);

  return (
    <div className="group flex w-full flex-col gap-2">
      <div
        onPointerEnter={() => {
          if (isDesktopLayout) setIsHovered(true);
        }}
        onPointerLeave={() => {
          if (isDesktopLayout) setIsHovered(false);
        }}
        className="relative aspect-2/3 w-full overflow-hidden rounded-lg bg-accent ring-1 ring-white/5 transition-shadow duration-200"
      >
        <Link
          href={`/movie/${slug}`}
          aria-label={movie.title}
          className="block h-full w-full"
        >
          {hasPoster ? (
            <Image
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              fill
              sizes="(max-width:768px) 45vw, (max-width:1200px) 20vw, 15vw"
              className="h-full w-full object-cover opacity-0 transition-all duration-500 group-hover:scale-105"
              onLoad={(e) => e.currentTarget.classList.add("opacity-100")}
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 p-4 text-center">
              <Film className="h-10 w-10 text-white/30" />
              <span className="line-clamp-4 text-sm font-semibold text-white/70">
                {movie.title}
              </span>
            </div>
          )}
        </Link>

        <div className="pointer-events-none absolute left-2 top-2 z-10 flex items-center gap-1.5 rounded-xl bg-black/80 px-2 py-0.5 leading-none text-white">
          {hasRating ? (
            <>
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 md:h-4 md:w-4" />
              <span className="text-sm md:text-base">
                {movie.vote_average.toFixed(1)}
              </span>
            </>
          ) : (
            <>
              <Clock className="h-3 w-3 md:h-4 md:w-4" />
              <span className="text-sm md:text-base">N/A</span>
            </>
          )}
        </div>

        <MovieInteractionDropdown
          onBookmark={handleBookmark}
          onFavorite={handleFavorite}
          isBookmarked={isBookmarked}
          isFavorite={isFavorite}
        />

        {showHoverButtons && (
          <MovieInteractionButtons
            setIsHovered={setIsHovered}
            onBookmark={handleBookmark}
            onFavorite={handleFavorite}
            isBookmarked={isBookmarked}
            isFavorite={isFavorite}
            slug={slug}
          />
        )}
      </div>

      <div className="flex flex-col gap-1 px-0.5">
        <Link
          href={`/movie/${slug}`}
          title={movie.title}
          className="line-clamp-2 min-h-[2.4em] text-sm font-semibold leading-tight text-foreground  md:text-base"
        >
          {movie.title}
        </Link>

        {meta && <p className="text-xs text-muted-foreground">{meta}</p>}
      </div>

      <AuthDialog
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        type="interaction"
      />
    </div>
  );
}
