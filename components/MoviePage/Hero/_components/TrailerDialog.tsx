import { Movie } from "@/app/types/movie";
import { Trailer } from "@/app/types/trailer";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Play } from "lucide-react";
import { useState } from "react";

type Props = {
  trailerLink: Trailer;
  movie: Movie;
};

export default function TrailerDialog({ trailerLink, movie }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const trailer = trailerLink.results.find(
    (video) => video.type === "Trailer" && video.site === "YouTube",
  );
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="lg"
          className="bg-white text-black hover:bg-gray-200 font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform"
          disabled={!trailerLink}
        >
          <Play className="w-5 h-5 mr-2 fill-current" />
          Play Trailer
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[1000px] p-0 bg-black border-none overflow-hidden aspect-video">
        <DialogHeader className="sr-only">
          <DialogTitle>{movie.title} - Trailer</DialogTitle>
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
