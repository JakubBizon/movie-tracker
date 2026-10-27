import { rateMovieAction } from "@/app/actions/rateMovieAction";
import { ratingsCountKey } from "@/components/Navbar/hooks/useRatingsCount";
import { useQueryClient } from "@tanstack/react-query";
import {
  startTransition,
  useEffect,
  useOptimistic,
  useRef,
  useState,
} from "react";
import { toast } from "sonner";

export default function useMovieRating(
  movieId: number,
  title: string,
  userId: string | undefined,
  currentRating: number,
  isOpen: boolean,
  onSuccess: () => void,
) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimisticRating, setOptimisticRating] = useOptimistic(currentRating);
  const userHasPicked = useRef(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!isOpen) {
      userHasPicked.current = false;
      return;
    }
    if (userHasPicked.current) return;
    setRating(currentRating);
    setHoverRating(0);
  }, [isOpen, currentRating]);

  const selectRating = (value: number) => {
    userHasPicked.current = true;
    setRating(value);
  };

  const performAction = async (val: number | null) => {
    if (!userId || isSubmitting) return;
    setIsSubmitting(true);
    startTransition(() => {
      setOptimisticRating(val === null ? 0 : val);
    });

    try {
      const result = await rateMovieAction(movieId.toString(), title, val);
      if (result.success) {
        toast.success(val === null ? "Rating removed" : "Rating saved!");
        await queryClient.invalidateQueries({
          queryKey: ["rating", userId, movieId],
        });
        void queryClient.invalidateQueries({
          queryKey: [ratingsCountKey],
        });
        onSuccess();
      } else {
        toast.error("Something went wrong");
      }
    } catch {
      toast.error("An error occurred");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    rating,
    setRating: selectRating,
    hoverRating,
    setHoverRating,
    isSubmitting,
    handleSave: (rating: number) => performAction(rating),
    handleRemove: () => performAction(null),
    optimisticRating,
  };
}
