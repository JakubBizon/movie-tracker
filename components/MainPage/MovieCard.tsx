"use client";

import { Movie } from "@/app/types/movie";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import AuthDialog from "../MoviePage/Hero/_components/AuthDialog";
import MovieInteractionButtons from "./MovieInteractionButtons";
import MovieInteractionDropdown from "./MovieInteractionDropdown";
import { useMovieMutations } from "@/hooks/useMovieMutations";
import useDesktopLayout from "@/hooks/useDesktopLayout";

interface MovieCardProps {
  movie: Movie;
  slug: string;
  priority?: boolean;
  isFavorite: boolean;
  isBookmarked: boolean;
  userId?: string;
}

export default function MovieCard({
  movie,
  slug,
  priority,
  isFavorite,
  isBookmarked,
  userId,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const { isDesktopLayout } = useDesktopLayout();

  const { handleBookmark, handleFavorite } = useMovieMutations(
    movie,
    userId,
    () => setIsAuthOpen(true),
  );

  const showHoverButtons = isDesktopLayout && isHovered;
  return (
    <div
      onPointerEnter={() => {
        if (isDesktopLayout) setIsHovered(true);
      }}
      onPointerLeave={() => {
        if (isDesktopLayout) setIsHovered(false);
      }}
      className="relative w-full aspect-[2/3] overflow-hidden rounded-lg transition-transform duration-200 hover:scale-[1.02] md:hover:scale-[1.03]"
    >
      <Link
        href={`/movie/${slug}`}
        className="block relative w-full h-full overflow-hidden bg-accent rounded-lg"
      >
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            sizes="(max-width:768px) 40vw, (max-width:1200px) 33vw, 25vw"
            className="rounded-lg shadow-lg w-full h-full object-cover opacity-0 transition-opacity duration-500"
            onLoad={(image) => image.currentTarget.classList.add("opacity-100")}
            priority={priority}
          />
        ) : (
          <Image
            src="/placeholder.png"
            alt={movie.title}
            width={200}
            height={300}
            className="rounded-lg shadow-none w-full h-full object-cover"
          />
        )}

        <h3
          title={movie.title}
          className="text-white pt-10 text-sm md:text-base via-black/60 leading-tight absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black to-transparent font-semibold rounded-b-lg"
        >
          {movie.title}
        </h3>

        <div className="text-white absolute top-2 left-2 z-10 px-2 py-0.5 text-sm rounded-xl bg-black/80 flex items-center justify-center gap-2 leading-none">
          {movie.vote_average ? (
            <>
              <Star className="fill-yellow-400 hidden md:block md:w-4 md:h-4 w-3 h-3 text-yellow-400" />
              <span className="md:text-base text-sm">
                {movie.vote_average.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-base">nr</span>
          )}
        </div>
      </Link>

      {!isDesktopLayout && (
        <MovieInteractionDropdown
          onBookmark={handleBookmark}
          onFavorite={handleFavorite}
          isBookmarked={isBookmarked}
          isFavorite={isFavorite}
        />
      )}

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

      <AuthDialog
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        type="interaction"
      />
    </div>
  );
}
