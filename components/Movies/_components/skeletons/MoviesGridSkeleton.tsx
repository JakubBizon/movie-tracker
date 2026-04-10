import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesGridSkeleton() {
  return (
    <div className="grid grid-cols-2 xs:grid-cols-3 xl:grid-cols-4 gap-4 px-4 sm:px-6 w-full">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] w-full">
          <Skeleton className="w-full h-full rounded-lg" />{" "}
        </div>
      ))}
    </div>
  );
}
