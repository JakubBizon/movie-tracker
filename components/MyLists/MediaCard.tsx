"use client";

import { useRouter } from "next/navigation";
import { slugify } from "@/lib/utils/slugify";
import { BookmarkX, HeartOff, Loader2, Star } from "lucide-react";
import Image from "next/image";

import { UserMediaItem } from "@/app/types/user-media-item";
import useMovieCard from "@/hooks/MyLists/useMovieCard";

interface MediaCardProps {
  item: UserMediaItem;
  userId: string;
}

export default function MediaCard({ item, userId }: MediaCardProps) {
  const router = useRouter();
  const handleNavigate = () => {
    router.push(`/movie/${slugify(item.title, Number(item.movieId))}`);
  };

  const { isPending, handleRemove, displayVote } = useMovieCard(item, userId);

  return (
    <div
      className={`group relative overflow-hidden rounded-lg ${
        isPending ? "pointer-events-none opacity-50" : ""
      }`}
    >
      <div onClick={handleNavigate} className="cursor-pointer">
        <Image
          src={`https://image.tmdb.org/t/p/w500${item.posterPath}`}
          alt={item.title}
          width={300}
          height={450}
          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 200px"
          loading="lazy"
          className="w-full rounded-lg object-cover shadow-lg"
        />
      </div>

      <button
        type="button"
        onClick={handleRemove}
        disabled={isPending}
        className="absolute right-2 top-2 z-10 cursor-pointer rounded-full bg-destructive p-2 text-destructive-foreground  transition-all duration-300 hover:scale-110 hover:bg-destructive/90 md:group-hover:opacity-100 md:opacity-0 opacity-100"
        title="Remove from list"
      >
        {isPending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : item.type === "watchlist" ? (
          <BookmarkX size={20} />
        ) : (
          <HeartOff size={20} />
        )}
      </button>

      <button
        type="button"
        className="text-white absolute top-2 left-2 z-10 px-2 py-0.5 text-sm rounded-xl bg-black/80 flex items-center justify-center gap-2 leading-none"
      >
        <Star className="fill-yellow-400 w-4 h-4 text-yellow-400" />
        <span className="text-base">{displayVote}</span>
      </button>
    </div>
  );
}
