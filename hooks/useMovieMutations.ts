"use client";

import { Movie } from "@/app/types/movie";
import { UserSelections } from "./useUserSelections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleBookmarkAction,
  toggleFavoriteAction,
} from "@/app/actions/movieActions";
import { toast } from "sonner";
import { watchlistCountQueryKey } from "./watchlist/useWatchlistCount";

export function useMovieMutations(
  movie: Movie,
  userId?: string,
  setIsAuthOpen?: () => void,
) {
  const queryClient = useQueryClient();
  const queryKey = ["user-selections", userId];
  const movieId = movie.id.toString();

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return toggleFavoriteAction(
        userId!,
        movieId,
        movie.title,
        movie.poster_path,
        movie.vote_average.toString(),
        movie.release_date,
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<UserSelections>(queryKey);

      queryClient.setQueryData<UserSelections>(queryKey, (old) => {
        const current = old ?? {
          favoriteIds: [],
          bookmarkedIds: [],
        };

        const exists = current.favoriteIds.includes(movieId);

        return {
          ...current,
          favoriteIds: exists
            ? current.favoriteIds.filter((id) => id !== movieId)
            : [...current.favoriteIds, movieId],
        };
      });

      return { previous };
    },
    onSuccess: (result, _variables, context) => {
      if (result.success) {
        toast.success(result.message);
      } else {
        if (context?.previous) {
          queryClient.setQueryData(queryKey, context.previous);
        }
        toast.error(result.error);
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      toast.error("Failed to update favorites");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistCountQueryKey,
      });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      return toggleBookmarkAction(
        userId!,
        movieId,
        movie.title,
        movie.poster_path,
        movie.vote_average.toString(),
        movie.release_date,
      );
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<UserSelections>(queryKey);

      queryClient.setQueryData<UserSelections>(queryKey, (old) => {
        const current = old ?? {
          favoriteIds: [],
          bookmarkedIds: [],
        };

        const exists = current.bookmarkedIds.includes(movieId);

        return {
          ...current,
          bookmarkedIds: exists
            ? current.bookmarkedIds.filter((id) => id !== movieId)
            : [...current.bookmarkedIds, movieId],
        };
      });

      return { previous };
    },
    onSuccess: (result, _variables, context) => {
      if (result.success) {
        toast.success(result.message);
      } else {
        if (context?.previous) {
          queryClient.setQueryData(queryKey, context.previous);
        }
        toast.error(result.error);
      }
    },
    onError: (_error, _variables, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }
      toast.error("Failed to update bookmarks");
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: watchlistCountQueryKey,
      });
    },
  });

  const handleFavorite = () => {
    if (!userId) {
      setIsAuthOpen?.();
      return;
    }
    if (favoriteMutation.isPending) return;
    favoriteMutation.mutate();
  };

  const handleBookmark = () => {
    if (!userId) {
      setIsAuthOpen?.();
      return;
    }
    if (bookmarkMutation.isPending) return;
    bookmarkMutation.mutate();
  };

  return {
    handleFavorite,
    handleBookmark,
    isFavoritePending: favoriteMutation.isPending,
    isBookmarkPending: bookmarkMutation.isPending,
  };
}
