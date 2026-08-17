import {
  toggleBookmarkAction,
  toggleFavoriteAction,
} from "@/app/actions/movieActions";
import { UserMediaItem } from "@/app/types/user-media-item";
import { useQueryClient } from "@tanstack/react-query";
import { useTransition } from "react";
import { toast } from "sonner";
import { watchlistCountQueryKey } from "../watchlist/useWatchlistCount";

const useMovieCard = (item: UserMediaItem, userId: string) => {
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();
  const voteAverage = Number(item.voteAverage);
  const displayVote = voteAverage > 0 ? voteAverage.toFixed(1) : null;
  const handleRemove = () => {
    startTransition(async () => {
      const movieId = String(item.movieId);
      const posterPath = item.posterPath ?? "";
      const voteAverageStr = displayVote?.toString() ?? "0.0";

      if (item.type === "watchlist") {
        await toggleBookmarkAction(
          userId,
          movieId,
          item.title,
          posterPath,
          voteAverageStr,
          item.releaseDate ?? "",
        );
        toast.success(`Removed ${item.title} from bookmarks`);
      } else {
        await toggleFavoriteAction(
          userId,
          movieId,
          item.title,
          posterPath,
          voteAverageStr,
          item.releaseDate ?? "",
        );
        toast.success(`Removed ${item.title} from favorites`);
      }
      queryClient.invalidateQueries({
        queryKey: watchlistCountQueryKey,
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
