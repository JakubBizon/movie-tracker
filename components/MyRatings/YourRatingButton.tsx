"use client";
import { authClient } from "@/lib/auth-client";
import RatingDialog from "../MoviePage/Hero/_components/RatingDialog";
import { useState } from "react";
import useMyRatingCard from "@/hooks/MyRatings/useMyRatingCard";

type Props = {
  movieId: number;
  title: string;
  initialRating: number;
};

export default function YourRatingButton({
  movieId,
  title,
  initialRating,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const {
    optimisticRating,
    rating: draftRating,
    setRating: setDraftRating,
    hoverRating,
    setHoverRating,
    isSubmitting,
    handleSave,
    handleRemove,
  } = useMyRatingCard(movieId, title, userId, initialRating, isOpen, () =>
    setIsOpen(false),
  );

  const isRated = optimisticRating > 0;
  return (
    <>
      <button
        className="flex flex-col items-center cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <p className="xs:text-2xl text-lg">{optimisticRating}</p>
        <span>You</span>
      </button>

      <RatingDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title={title}
        isRated={isRated}
        currentRating={optimisticRating}
        rating={draftRating}
        setRating={setDraftRating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        isSubmitting={isSubmitting}
        handleSave={handleSave}
        handleRemove={handleRemove}
      />
    </>
  );
}
