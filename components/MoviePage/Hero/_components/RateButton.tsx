"use client";
import { Button } from "@/components/ui/button";
import useCheckRating from "@/hooks/MoviePage/useCheckRating";
import useMovieRating from "@/hooks/MoviePage/useMovieRating";
import { authClient } from "@/lib/auth-client";
import { Star } from "lucide-react";
import { useState } from "react";
import RatingDialog from "./RatingDialog";
import AuthDialog from "./AuthDialog";

type Props = {
  title: string;
  movieId: number;
};

export default function RateButton({ movieId, title }: Props) {
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const { data: ratingData, isLoading } = useCheckRating(
    userId,
    movieId,
    !!userId,
  );
  const currentRating = ratingData?.rating ?? 0;
  const isRated = currentRating > 0;

  const {
    rating,
    setRating,
    hoverRating,
    setHoverRating,
    isSubmitting,
    handleSave,
    handleRemove,
  } = useMovieRating(movieId, title, userId, currentRating, isRatingOpen, () =>
    setIsRatingOpen(false),
  );

  const handleRateClick = () => {
    if (!userId) {
      setIsAuthOpen(true);
      return;
    }

    setIsRatingOpen(true);
  };

  return (
    <>
      <Button
        size="lg"
        variant="outline"
        onClick={handleRateClick}
        className="bg-white/10 px-3 hover:bg-white/20 backdrop-blur-sm text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-transform"
      >
        {isLoading ? (
          <div className="flex items-center gap-2 animate-pulse cursor-pointer">
            <Star className="w-4 h-4 text-white/50" />
            <span className="text-white/50 text-sm">Checking...</span>
          </div>
        ) : (
          <div className="flex items-center gap-1 cursor-pointer">
            <Star
              className={`${isRated ? "fill-amber-500 text-amber-500" : ""}`}
            />
            <span>{isRated ? `Your Rating: ${currentRating}` : "Rate"}</span>
          </div>
        )}
      </Button>
      <RatingDialog
        open={isRatingOpen}
        onOpenChange={setIsRatingOpen}
        title={title}
        isRated={isRated}
        currentRating={currentRating}
        rating={rating}
        setRating={setRating}
        hoverRating={hoverRating}
        setHoverRating={setHoverRating}
        isSubmitting={isSubmitting}
        onSave={handleSave}
        onRemove={handleRemove}
      />

      <AuthDialog open={isAuthOpen} onOpenChange={setIsAuthOpen} />
    </>
  );
}
