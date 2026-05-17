import { Skeleton } from "@/components/ui/skeleton";

export default function MoviesGridSkeleton() {
  return (
    <div className="grid gap-3 grid-cols-2 xs:grid-cols-3 md:grid-cols-4">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="aspect-[2/3] w-full">
          <Skeleton className="w-full h-full rounded-lg" />{" "}
        </div>
      ))}
    </div>
  );
}
