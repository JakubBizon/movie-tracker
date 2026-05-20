"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { slugify } from "@/lib/utils/slugify";
import { BookmarkX, HeartOff, Loader2, Star } from "lucide-react";
import Image from "next/image";
import {
  toggleBookmarkAction,
  toggleFavoriteAction,
} from "@/app/actions/movieActions";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { UserMediaItem } from "@/app/types/user-media-item";

interface MediaCardProps {
  item: UserMediaItem;
  userId: string;
}

export default function MediaCard({ item, userId }: MediaCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleNavigate = () => {
    router.push(`/movie/${slugify(item.title, Number(item.movieId))}`);
  };

  const queryClient = useQueryClient();
  const displayVote = item.voteAverage
    ? Number(item.voteAverage).toFixed(1)
    : "N/A";
  const handleRemove = () => {
    startTransition(async () => {
      const movieId = String(item.movieId);
      const posterPath = item.posterPath ?? "";
      const voteAverageStr = item.voteAverage ?? "0.0";

      if (item.type === "bookmark") {
        await toggleBookmarkAction(
          userId,
          movieId,
          item.title,
          posterPath,
          voteAverageStr,
        );
        toast.success(`Removed ${item.title} from bookmarks`);
      } else {
        await toggleFavoriteAction(
          userId,
          movieId,
          item.title,
          posterPath,
          voteAverageStr,
        );
        toast.success(`Removed ${item.title} from favorites`);
      }
      queryClient.invalidateQueries({
        queryKey: ["watchlist", "count"],
      });
    });
  };

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
        className="absolute right-2 top-2 z-50 cursor-pointer rounded-full bg-destructive p-2 text-destructive-foreground opacity-0 transition-all duration-300 hover:scale-110 hover:bg-destructive/90 group-hover:opacity-100"
        title="Remove from list"
      >
        {isPending ? (
          <Loader2 size={20} className="animate-spin" />
        ) : item.type === "bookmark" ? (
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
