"use client";

import { Movie } from "@/app/types/movie";
import { UserSelections, useUserSelections } from "./useUserSelections";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleBookmarkAction,
  toggleFavoriteAction,
} from "@/app/actions/movieActions";
import { toast } from "sonner";
import { useMemo } from "react";
import { watchlistCountQueryKey } from "./watchlist/useWatchlistCount";

export default function useMovieInteractions(
  movie: Movie,
  userId?: string,
  initialData?: UserSelections,
  setIsAuthOpen?: () => void,
) {
  const queryClient = useQueryClient();
  const queryKey = ["user-selections", userId];

  const { data } = useUserSelections(userId, initialData);
  const movieId = movie.id.toString();
  const favoriteSet = useMemo(
    () => new Set(data?.favoriteIds ?? []),
    [data?.favoriteIds],
  );
  const bookmarkedSet = useMemo(
    () => new Set(data?.bookmarkedIds ?? []),
    [data?.bookmarkedIds],
  );

  const isFavorite = !!userId && favoriteSet.has(movieId);
  const isBookmarked = !!userId && bookmarkedSet.has(movieId);

  const favoriteMutation = useMutation({
    mutationFn: async () => {
      return await toggleFavoriteAction(
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
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({
        queryKey: watchlistCountQueryKey,
      });
    },
  });

  const bookmarkMutation = useMutation({
    mutationFn: async () => {
      return await toggleBookmarkAction(
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
      queryClient.invalidateQueries({ queryKey });
      queryClient.invalidateQueries({
        queryKey: watchlistCountQueryKey,
      });
    },
  });

  const handleFavorite = async () => {
    if (!userId) {
      setIsAuthOpen?.();
      return;
    }
    if (favoriteMutation.isPending) return;
    favoriteMutation.mutate();
  };

  const handleBookmark = async () => {
    if (!userId) {
      setIsAuthOpen?.();
      return;
    }
    if (bookmarkMutation.isPending) return;
    bookmarkMutation.mutate();
  };

  return {
    isFavorite,
    isBookmarked,
    handleFavorite,
    handleBookmark,
    isFavoritePending: favoriteMutation.isPending,
    isBookmarkPending: bookmarkMutation.isPending,
  };
}
