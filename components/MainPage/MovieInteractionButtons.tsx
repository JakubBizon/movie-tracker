import { cn } from "@/lib/utils";
import { Bookmark, Heart, Info } from "lucide-react";
import Link from "next/link";

type Props = {
  setIsHovered: (value: boolean) => void;
  onBookmark: () => void;
  onFavorite: () => void;
  isBookmarked: boolean;
  isFavorite: boolean;
  slug: string;
};

export default function MovieInteractionButtons({
  onBookmark,
  onFavorite,
  isBookmarked,
  isFavorite,
  slug,
}: Props) {
  return (
    <div className="absolute inset-0 z-20 sm:flex hidden items-center justify-center bg-black/40 rounded-lg pointer-events-none">
      <div className="flex items-center gap-3 text-white pointer-events-auto">
        <button
          type="button"
          className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer hover:bg-white transition pointer-events-auto"
          onClick={() => {
            onBookmark();
          }}
        >
          <Bookmark
            className={cn(
              "w-5 h-5 text-black",
              isBookmarked && "fill-blue-500 text-blue-500",
            )}
          />
        </button>

        <button
          type="button"
          className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer hover:bg-white transition pointer-events-auto"
          onClick={() => {
            onFavorite();
          }}
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? "fill-red-500 text-red-500" : "text-black"} `}
          />
        </button>
        <Link
          href={`/movie/${slug}`}
          className="bg-gray-100 px-2 py-2 rounded-full cursor-pointer"
        >
          <Info className="w-5 h-5 cursor-pointer text-black transition" />
        </Link>
      </div>
    </div>
  );
}
