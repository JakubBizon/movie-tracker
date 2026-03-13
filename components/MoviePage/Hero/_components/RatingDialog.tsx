"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import useCheckRating from "@/hooks/MoviePage/useCheckRating";
import useMovieRating from "@/hooks/MoviePage/useMovieRating";
import { authClient } from "@/lib/auth-client";
import { Loader2, Star } from "lucide-react";
import { useState } from "react";

type Props = {
  title: string;
  movieId: number;
};

export default function RatingDialog({ movieId, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const { data: ratingData, isLoading } = useCheckRating(movieId, !!session);
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
  } = useMovieRating(
    movieId,
    title,
    session?.user.id,
    currentRating,
    isOpen,
    () => setIsOpen(false),
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-transform"
        >
          {isLoading ? (
            <div className="flex items-center gap-2 animate-pulse">
              <Star className="w-4 h-4 text-white/50" />
              <span className="text-white/50 text-sm">Checking...</span>
            </div>
          ) : (
            <>
              <Star
                className={`${isRated ? "fill-amber-500 text-amber-500" : ""}`}
              />
              <span>{isRated ? `Your Rating: ${currentRating}` : "Rate"}</span>
            </>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] bg-secondary border-none overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Rating Dialog</DialogTitle>
          <DialogDescription>
            Dialog that allows users to rate movies.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full h-full bg-secondary">
          <div className="flex flex-col justify-center items-center">
            {" "}
            <h2 className="text-lg pb-3">Rate this movie</h2>
            <span className="text-2xl text-primary">{title}</span>
            <div className="flex flex-col">
              <div
                onMouseLeave={() => setHoverRating(0)}
                className="flex gap-1 pt-3 pb-2"
              >
                {Array.from({ length: 10 }).map((item, index) => {
                  const starIndex = index + 1;
                  const isActive = starIndex <= (hoverRating || rating);
                  return (
                    <button
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      key={index}
                      className="transition-transform hover:scale-110 active:scale-90"
                    >
                      <Star
                        className={`w-10 h-10 transition-colors duration-150 ${isActive ? "fill-amber-500 text-amber-500" : "text-muted-foreground/40"}`}
                      />
                    </button>
                  );
                })}
              </div>
              {isRated && (
                <button
                  onClick={handleRemove}
                  disabled={isSubmitting}
                  className="justify-end mt-2 text-sm text-muted-foreground hover:text-destructive transition-colors flex items-center gap-1"
                >
                  {isSubmitting && rating === 0 && (
                    <Loader2 className="w-3 h-3 animate-spin" />
                  )}
                  Remove my rating
                </button>
              )}
            </div>
            <Button
              onClick={() => handleSave(rating)}
              disabled={
                isSubmitting ||
                rating === currentRating ||
                (rating === 0 && !isRated)
              }
              className="px-5"
            >
              {isSubmitting ? "Saving..." : isRated ? "Update Rating" : "Rate"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
