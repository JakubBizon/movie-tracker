import { rateMovieAction } from "@/app/actions/rateMovieAction";
import { useRouter } from "next/navigation";
import { startTransition, useEffect, useOptimistic, useState } from "react";
import { toast } from "sonner";

const useMyRatingCard = (
  movieId: number,
  title: string,
  userId: string | undefined,
  currentRating: number,
  isOpen: boolean,
  onSuccess: () => void,
) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optimisticRating, setOptimisticRating] = useOptimistic(currentRating);
  const router = useRouter();

  useEffect(() => {
    startTransition(() => {
      if (isOpen) {
        setRating(currentRating);
        setHoverRating(0);
      }
    });
  }, [isOpen, currentRating]);

  const performAction = async (val: number) => {
    if (!userId || isSubmitting) return;
    setIsSubmitting(true);

    startTransition(async () => {
      setOptimisticRating(val);
      try {
        const result = await rateMovieAction(
          userId,
          movieId.toString(),
          title,
          val,
        );
        if (result.success) {
          toast.success(val === 0 ? "Rating removed" : "Rating saved!");
          router.refresh();
          onSuccess();
        } else {
          toast.error("Something went wrong");
        }
      } catch {
        toast.error("An error occurred");
      } finally {
        setIsSubmitting(false);
      }
    });
  };

  return {
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    isSubmitting,
    handleSave: (rating: number) => performAction(rating),
    handleRemove: () => performAction(0),
    optimisticRating,
  };
};

export default useMyRatingCard;
