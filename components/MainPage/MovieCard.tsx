"use client";
import { Movie } from "@/app/types/movie";
import { Bookmark, Heart, Info } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
interface MovieCardProps {
  movie: Movie;
  slug: string;
}

export default function MovieCard({ movie, slug }: MovieCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`shrink-0 relative hover:scale-105 transition-all duration-200`}
    >
      <Link href={`/movie/${slug}`}>
        <Image
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          width={200}
          height={300}
          className="rounded-lg shadow-lg"
        />
        <h3 className="text-white max-w-[200px] absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black to-transparent font-semibold line-clamp-2 rounded-b-lg">
          {movie.title}
        </h3>
        <p className="text-white absolute top-2 right-2 z-10 px-1 py-1 text-sm rounded-xl bg-gray-700">
          ⭐ {movie.vote_average.toFixed(1)}
        </p>
      </Link>
      {isHovered && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 rounded-lg pointer-events-none">
          <div className="flex items-center gap-3 text-white pointer-events-auto">
            <div
              className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer"
              onClick={() => console.log("xd")}
            >
              <Bookmark className="w-5 h-5  text-black transition" />
            </div>
            <div className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer">
              <Heart className="w-5 h-5 cursor-pointer text-black transition" />
            </div>
            <div className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer">
              <Info className="w-5 h-5 cursor-pointer text-black transition" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
