import { Movie } from "@/app/types/movie";
import { Button } from "@/components/ui/button";
import { Bookmark, Heart } from "lucide-react";
import useMovieInteractions from "@/hooks/useMovieInteractions";
import RateButton from "./RateButton";
import { useState } from "react";
import AuthDialog from "./AuthDialog";

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
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
  data: Movie;
  showRating?: boolean;
  userId?: string;
};

export default function InteractionButtons({
  glassClass,
  size,
  initialSelections,
  data,
  showRating,
  userId,
}: Props) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const {
    isFavorite,
    isBookmarked,
    handleFavorite,
    handleBookmark,
    isFavoritePending,
    isBookmarkPending,
  } = useMovieInteractions(data, userId, initialSelections, () =>
    setIsAuthOpen(true),
  );

  const interactionButtons = [
    {
      icon: Bookmark,
      state: isBookmarked,
      handler: handleBookmark,
      fillColor: "fill-blue-500 text-blue-500",
      pending: isBookmarkPending,
    },
    {
      icon: Heart,
      state: isFavorite,
      handler: handleFavorite,
      fillColor: "fill-red-500 text-red-500",
      pending: isFavoritePending,
    },
  ];

  return (
    <>
      {interactionButtons.map(
        ({ icon: Icon, state, handler, fillColor, pending }, index) => (
          <Button
            key={index}
            size={size ?? "lg"}
            variant="outline"
            onClick={handler}
            disabled={pending}
            className={`cursor-pointer bg-white/10 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover:border-white/50 font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform ${glassClass}`}
          >
            <Icon
              className={`w-5 h-5 ${state ? fillColor : ""} ${pending ? "animate-pulse" : ""}`}
            />
          </Button>
        ),
      )}
      {showRating && <RateButton title={data.title} movieId={data.id} />}
      <AuthDialog
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        type="interaction"
      />
    </>
  );
}
