import { UserMediaItem } from "@/app/types/user-media-item";
import MediaCard from "./MediaCard";

interface MediaGridProps {
  items: UserMediaItem[];
  userId: string;
}

export default function MediaGrid({ items, userId }: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10">
      {items.map((item) => (
        <MediaCard key={item.movieId} item={item} userId={userId} />
      ))}
    </div>
  );
}
