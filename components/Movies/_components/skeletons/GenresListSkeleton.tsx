import { Skeleton } from "@/components/ui/skeleton";

export default function GenresListSkeleton() {
  return (
    <div className="px-4 space-y-3">
      <Skeleton className="h-4 w-16" />
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 12 }).map((_, i) => {
          const widths = ["w-12", "w-16", "w-20", "w-24"];
          const widthClass = widths[i % widths.length];

          return (
            <Skeleton key={i} className={`h-7 rounded-full ${widthClass}`} />
          );
        })}
      </div>
    </div>
  );
}
