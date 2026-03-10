"use client";
import { rateMovieAction } from "@/app/actions/rateMovieAction";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { authClient } from "@/lib/auth-client";
import { Star } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Props = {
  title: string;
  movieId: number;
};

export default function RatingDialog({ movieId, title }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const { data: session } = authClient.useSession();
  const userId = session?.user.id;

  const handleRate = async () => {
    if (!userId) return;
    const result = await rateMovieAction(
      userId,
      movieId.toString(),
      title,
      rating,
    );
    if (result.success) {
      toast.success("Rating saved!");
      setIsOpen(false);
    } else {
      toast.error("Something went wrong");
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          variant="outline"
          className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-transform"
        >
          <Star />
          <span>Rate</span>
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
            <div
              onMouseLeave={() => setHoverRating(0)}
              className="flex gap-1 py-6"
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
            <Button
              onClick={handleRate}
              disabled={rating === 0}
              className="px-5"
            >
              Rate
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
