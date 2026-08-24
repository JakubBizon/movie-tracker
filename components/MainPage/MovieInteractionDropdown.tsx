"use client";
import { Bookmark, Ellipsis, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";

type Props = {
  onBookmark: () => void;
  onFavorite: () => void;
  isBookmarked: boolean;
  isFavorite: boolean;
};

export default function MovieInteractionDropdown({
  onBookmark,
  onFavorite,
  isBookmarked,
  isFavorite,
}: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label="Open movie interaction dropdown"
          className="md:hidden absolute top-2 right-2 z-10 px-1 border-white/10 bg-zinc-900/95 rounded-xl text-white"
        >
          <Ellipsis className="w-6 h-6" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-20">
        <DropdownMenuItem onSelect={onFavorite}>
          <Heart
            className={cn(
              "w-5 h-5 dark:text-white text-black",
              isFavorite && "fill-red-500 text-red-500",
            )}
          />{" "}
          <span>Favorite</span>
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={onBookmark}>
          <Bookmark
            className={cn(
              "w-5 h-5 dark:text-white text-black",
              isBookmarked && "fill-blue-500 text-blue-500",
            )}
          />
          Bookmark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
