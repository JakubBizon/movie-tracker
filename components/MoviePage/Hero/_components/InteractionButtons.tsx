import { Movie } from "@/app/types/movie";
import { Button } from "@/components/ui/button";
import useMovieInteractions from "@/hooks/MoviePage/useMovieInteractions";
import { authClient } from "@/lib/auth-client";
import { Bookmark, Heart } from "lucide-react";

type Props = {
  initialIsFavorite?: boolean;
  initialIsBookmarked?: boolean;
  data: Movie;
};

export default function InteractionButtons({
  initialIsFavorite,
  initialIsBookmarked,
  data,
}: Props) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const { isFavorite, isBookmarked, handleFavorite, handleBookmark } =
    useMovieInteractions(data, userId, {
      isFavorite: initialIsFavorite,
      isBookmarked: initialIsBookmarked,
    });
  return (
    <>
      <Button
        size="lg"
        variant="outline"
        onClick={handleBookmark}
        className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover:border-white/50 font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform"
      >
        <Bookmark
          className={`w-5 h-5 ${isBookmarked ? "fill-blue-500 text-blue-500" : ""}`}
        />
      </Button>

      <Button
        size="lg"
        variant="outline"
        onClick={handleFavorite}
        className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-transform"
      >
        <Heart
          className={
            isFavorite ? `w-5 h-5 fill-red-500 text-red-500` : `w-5 h-5`
          }
        />
      </Button>
    </>
  );
}
