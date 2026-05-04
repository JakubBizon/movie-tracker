import { Movie } from "@/app/types/movie";
import { Button } from "@/components/ui/button";
import useMovieInteractions from "@/hooks/MoviePage/useMovieInteractions";
import { authClient } from "@/lib/auth-client";
import { Bookmark, Heart } from "lucide-react";
import RatingDialog from "./RatingDialog";

type Props = {
  glassClass?: string;
  size?:
    | "default"
    | "xs"
    | "sm"
    | "lg"
    | "icon"
    | "icon-xs"
    | "icon-sm"
    | "icon-lg"
    | null
    | undefined;
  initialIsFavorite?: boolean;
  initialIsBookmarked?: boolean;
  data: Movie;
  showRating?: boolean;
};

export default function InteractionButtons({
  glassClass,
  size,
  initialIsFavorite,
  initialIsBookmarked,
  data,
  showRating,
}: Props) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;

  const { isFavorite, isBookmarked, handleFavorite, handleBookmark } =
    useMovieInteractions(data, userId, {
      isFavorite: initialIsFavorite,
      isBookmarked: initialIsBookmarked,
    });

  const interactionButtons = [
    {
      icon: Bookmark,
      state: isBookmarked,
      handler: handleBookmark,
      fillColor: "fill-blue-500 text-blue-500",
    },
    {
      icon: Heart,
      state: isFavorite,
      handler: handleFavorite,
      fillColor: "fill-red-500 text-red-500",
    },
  ];

  return (
    <>
      {interactionButtons.map(
        ({ icon: Icon, state, handler, fillColor }, index) => (
          <Button
            key={index}
            size={size ? size : "lg"}
            variant="outline"
            onClick={handler}
            className={`bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover:border-white/50 font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform ${glassClass}`}
          >
            <Icon className={`w-5 h-5 ${state ? fillColor : ""}`} />
          </Button>
        ),
      )}
      {showRating && <RatingDialog title={data.title} movieId={data.id} />}
    </>
  );
}
