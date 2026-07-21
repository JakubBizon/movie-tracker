import Link from "next/link";
import { Star } from "lucide-react";

export default function MyRatingsEmptyRatingsState() {
  return (
    <div className="flex flex-col items-center justify-center text-center py-16 gap-3 min-h-[calc(100vh-300px)]">
      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
        <Star className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-semibold">No ratings yet</h3>
      <p className="text-gray-400 max-w-sm">
        Rate a movie to see it appear here, along with how your score compares
        to everyone else&apos;s.
      </p>
      <Link
        href="/movie"
        className="mt-2 bg-primary text-white px-6 py-2 rounded-md"
      >
        Browse movies
      </Link>
    </div>
  );
}
