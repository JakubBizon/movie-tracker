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
  variant?: "outline";
  initialSelections?: {
    favoriteIds: string[];
    bookmarkedIds: string[];
  };
  data: Movie;
  showRating?: boolean;
  userId?: string;
};

export default function InteractionButtons({
  userId,
  data,
  initialSelections,
  showRating,
  glassClass,
  size,
  variant,
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
      ariaLabelName: "bookmarks",
    },
    {
      icon: Heart,
      state: isFavorite,
      handler: handleFavorite,
      fillColor: "fill-red-500 text-red-500",
      pending: isFavoritePending,
      ariaLabelName: "favorites",
    },
  ];

  return (
    <>
      {interactionButtons.map(
        (
          { icon: Icon, state, handler, fillColor, pending, ariaLabelName },
          index,
        ) => (
          <Button
            key={index}
            aria-label={`Add "${data.title}" to ${ariaLabelName}`}
            variant={variant ?? "default"}
            size={size ?? "lg"}
            onClick={handler}
            disabled={pending}
            className={`cursor-pointer  border  font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform ${glassClass} ${variant === "outline" ? "bg-background text-black dark:text-white border-input" : "bg-white/10 hover:bg-white/30 border-white/20"}`}
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
