import { UserMediaItem } from "@/app/types/user-media-item";
import MediaCard from "./MediaCard";
import { Clapperboard } from "lucide-react";

interface MediaGridProps {
  items: UserMediaItem[];
  userId: string;
}

export default function MediaGrid({ items, userId }: MediaGridProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 min-h-[calc(100vh-300px)] text-center">
        <Clapperboard className="w-12 h-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-foreground mb-2">
          No items yet
        </h3>
        <p className="text-sm text-muted-foreground">
          Start adding movies to your list to see them here
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 py-10 min-h-[calc(100vh-300px)]">
      {items.map((item) => (
        <MediaCard key={item.movieId} item={item} userId={userId} />
      ))}
    </div>
  );
}
