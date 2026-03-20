"use client";
import { Movie } from "@/app/types/movie";
import useMovieInteractions from "@/hooks/MoviePage/useMovieInteractions";
import { authClient } from "@/lib/auth-client";
import { Bookmark, Heart, Info, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface MovieCardProps {
  movie: Movie;
  slug: string;
  initialIsFavorite?: boolean;
  initialIsBookmarked?: boolean;
}

export default function MovieCard({
  movie,
  slug,
  initialIsBookmarked,
  initialIsFavorite,
}: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const { isFavorite, isBookmarked, handleFavorite, handleBookmark } =
    useMovieInteractions(movie, userId, {
      isFavorite: initialIsFavorite,
      isBookmarked: initialIsBookmarked,
    });
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`shrink-0 relative hover:scale-105 transition-all duration-200  aspect-2/3`}
    >
      <Link href={`/movie/${slug}`} className="block relative h-full">
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg shadow-lg w-full h-auto block"
        />
        <h3 className="text-white pt-10 via-black/60 leading-tight absolute bottom-0 left-0 right-0 p-3 bg-linear-to-t from-black to-transparent font-semibold line-clamp-2 rounded-b-lg">
          {movie.title}
        </h3>
        <p className="text-white absolute top-2 right-2 z-10 px-2 py-0.5 text-sm rounded-xl bg-black/80 flex items-center justify-center gap-2 leading-none">
          {movie.vote_average ? (
            <>
              <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
              <span className="text-base ">
                {movie.vote_average.toFixed(1)}
              </span>
            </>
          ) : (
            <span className="text-base">nr</span>
          )}
        </p>
      </Link>

      {isHovered && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-lg pointer-events-none">
          <div className="flex items-center gap-3 text-white pointer-events-auto">
            <div
              className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer hover:bg-white transition pointer-events-auto"
              onClick={handleBookmark}
            >
              <Bookmark
                className={`w-5 h-5 ${isBookmarked ? "fill-blue-500 text-blue-500" : "text-black"}`}
              />
            </div>

            <div
              className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer hover:bg-white transition pointer-events-auto"
              onClick={handleFavorite}
            >
              <Heart
                className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-black"} `}
              />
            </div>
            <Link
              href={`/movie/${slug}`}
              className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer"
            >
              <Info className="w-5 h-5 cursor-pointer text-black transition" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
