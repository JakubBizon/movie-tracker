import MediaCard from "./MediaCard";

interface ListItem {
  movieId: string | number;
  title: string;
  posterPath: string | null;
}

interface MediaGridProps {
  items: ListItem[];
  type: "watchlist" | "favorites";
  userId: string;
}

export default function MediaGrid({ items, type, userId }: MediaGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-10">
      {items.map((item) => (
        <MediaCard key={item.movieId} item={item} type={type} userId={userId} />
      ))}
    </div>
  );
}
