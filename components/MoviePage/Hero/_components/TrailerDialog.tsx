import { Movie } from "@/app/types/movie";
import { Trailer } from "@/app/types/trailer";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { Play } from "lucide-react";
import { useState } from "react";

type Props = {
  trailerLink: Trailer;
  movie: Movie;
  className?: string;
};

export default function TrailerDialog({
  trailerLink,
  movie,
  className,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const trailer = trailerLink.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className={cn(
            "bg-white/10 hover:bg-white/20 xs:text-sm text-xs text-white border border-white/20 backdrop-blur-md transition-all duration-300 shadow-xl font-medium",
            className,
          )}
          disabled={!trailer}
        >
          <Play className="w-5 h-5 fill-current" />
          Play Trailer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-250 p-0 bg-black border-none overflow-hidden aspect-video">
        <DialogHeader className="sr-only">
          <DialogTitle>{movie.title} - Trailer</DialogTitle>
          <DialogDescription>
            Official movie trailer - {movie.title}.
          </DialogDescription>
        </DialogHeader>

        {trailer ? (
          <iframe
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="flex items-center justify-center h-full text-white">
            Trailer not available
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
