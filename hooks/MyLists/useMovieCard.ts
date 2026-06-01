import {
  toggleBookmarkAction,
  toggleFavoriteAction,
} from "@/app/actions/movieActions";
import { UserMediaItem } from "@/app/types/user-media-item";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";

const useMovieCard = (item: UserMediaItem, userId: string) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const displayVote = item.voteAverage
    ? Number(item.voteAverage).toFixed(1)
    : "N/A";
  const handleRemove = () => {
    startTransition(async () => {
      const movieId = String(item.movieId);
      const posterPath = item.posterPath ?? "";
      const voteAverageStr = item.voteAverage ?? "0.0";

      if (item.type === "watchlist") {
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
  return {
    isPending,
    handleRemove,
    displayVote,
  };
};

export default useMovieCard;
