import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Loader2, Star } from "lucide-react";

type Props = {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  title: string;
  isRated: boolean;
  currentRating: number;
  rating: number;
  setRating: (val: number) => void;
  hoverRating: number;
  setHoverRating: (val: number) => void;
  isSubmitting: boolean;
  handleSave: (val: number) => void;
  handleRemove: (val: null) => void;
};

export default function RatingDialog({
  open,
  onOpenChange,
  title,
  isRated,
  currentRating,
  rating,
  setRating,
  hoverRating,
  setHoverRating,
  isSubmitting,
  handleSave,
  handleRemove,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md rounded-xl border-none bg-secondary p-4 sm:p-6 overflow-hidden">
        <DialogHeader className="sr-only">
          <DialogTitle>Rating Dialog</DialogTitle>
          <DialogDescription>
            Dialog that allows users to rate movies.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <div className="flex flex-col items-center text-center">
            <h2 className="pb-2 text-base sm:text-lg">Rate this movie</h2>

            <span className="max-w-full break-words text-xl sm:text-2xl text-primary">
              {title}
            </span>

            <div className="mt-4 flex flex-col items-center">
              <div
                onMouseLeave={() => setHoverRating(0)}
                className="flex flex-wrap justify-center gap-1 sm:gap-2"
              >
                {Array.from({ length: 10 }).map((_, index) => {
                  const starIndex = index + 1;
                  const isActive = starIndex <= (hoverRating || rating);

                  return (
                    <button
                      type="button"
                      key={index}
                      onClick={() => setRating(starIndex)}
                      onMouseEnter={() => setHoverRating(starIndex)}
                      className="transition-transform hover:scale-110 active:scale-90"
                    >
                      <Star
                        className={`h-6 w-6 sm:h-9 sm:w-9  transition-colors duration-150 ${
                          isActive
                            ? "fill-amber-500 text-amber-500"
                            : "text-muted-foreground/40"
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              {isRated && (
                <button
                  onClick={() => handleRemove(null)}
                  disabled={isSubmitting}
                  className="mt-3 flex items-center justify-center gap-1 text-sm text-muted-foreground transition-colors hover:text-destructive disabled:opacity-50"
                >
                  {isSubmitting && rating === 0 && (
                    <Loader2 className="h-3 w-3 animate-spin" />
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
              className="mt-5 w-full sm:w-auto px-5 xs:text-sm text-xs"
            >
              {isSubmitting ? "Saving..." : isRated ? "Update Rating" : "Rate"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
