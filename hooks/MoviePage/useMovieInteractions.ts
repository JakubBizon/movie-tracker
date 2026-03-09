"use client";

import {
  toggleBookmarkAction,
  toggleFavoriteAction,
} from "@/app/actions/movieActions";
import { Movie } from "@/app/types/movie";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "sonner";
export default function useMovieInteractions(
  movie: Movie,
  userId?: string,
  initialData?: { isFavorite?: boolean; isBookmarked?: boolean },
) {
  const [isFavorite, setIsFavorite] = useState(
    initialData?.isFavorite || false,
  );
  const [isBookmarked, setIsBookmarked] = useState(
    initialData?.isBookmarked || false,
  );

  const queryClient = useQueryClient();
  const handleFavorite = async () => {
    if (!userId) return toast.error("Please login first");
    setIsFavorite((prev) => !prev);
    const result = await toggleFavoriteAction(
      userId,
      movie.id.toString(),
      movie.title,
      movie.poster_path,
      movie.vote_average.toString(),
    );

    if (result.success) {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", "count"],
      });
    } else {
      setIsFavorite((prev) => !prev);
      toast.error(result.error);
    }
  };

  const handleBookmark = async () => {
    if (!userId) return toast.error("Please login first");
    setIsBookmarked((prev) => !prev);
    const result = await toggleBookmarkAction(
      userId,
      movie.id.toString(),
      movie.title,
      movie.poster_path,
      movie.vote_average.toString(),
    );

    if (result.success) {
      toast.success(result.message);
      queryClient.invalidateQueries({
        queryKey: ["bookmarks", "count"],
      });
    } else {
      setIsBookmarked((prev) => !prev);
      toast.error(result.error);
    }
  };
  return {
    isFavorite,
    handleFavorite,
    isBookmarked,
    handleBookmark,
  };
}
