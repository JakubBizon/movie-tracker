"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { slugify } from "@/lib/utils/slugify";
import { BookmarkX, HeartOff, Loader2 } from "lucide-react";
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

  const handleRemove = () => {
    startTransition(async () => {
      const movieId = String(item.movieId);
      const posterPath = item.posterPath ?? "";
      const voteAverage = item.voteAverage ?? "0";

      if (item.type === "bookmark") {
        await toggleBookmarkAction(
          userId,
          movieId,
          item.title,
          posterPath,
          voteAverage,
        );
        toast.success(`Removed ${item.title} from bookmarks`);
      } else {
        await toggleFavoriteAction(
          userId,
          movieId,
          item.title,
          posterPath,
          voteAverage,
        );
        toast.success(`Removed ${item.title} from favorites`);
      }
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", "count"],
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
    </div>
  );
}
