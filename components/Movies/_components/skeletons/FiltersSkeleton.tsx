import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function FiltersSkeleton() {
  return (
    <div className="w-full space-y-4">
      <Card>
        <div className="flex items-center justify-between px-4 text-lg">
          <Skeleton className="h-6 w-12" />
          <Skeleton className="h-5 w-5 rounded-sm" />
        </div>
      </Card>

      <Card className="overflow-hidden">
        <div className="flex items-center justify-between px-4 gap-4">
          <Skeleton className="h-4 w-16" />
        </div>
        <hr className="border-border" />
        <div className="px-4 py-4 space-y-4">
          <Skeleton className="h-6 w-28" />
          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-10" />
            <Skeleton className="h-10 w-full max-w-56" />
          </div>

          <div className="flex items-center justify-between gap-4">
            <Skeleton className="h-4 w-8" />
            <Skeleton className="h-10 w-full max-w-56" />
          </div>
        </div>

        <hr className="border-border" />

        <div className="px-4 py-4 space-y-3">
          <Skeleton className="h-5 w-14" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const widths = ["w-12", "w-16", "w-20", "w-24"];
              const widthClass = widths[i % widths.length];

              return (
                <Skeleton
                  key={i}
                  className={`h-8 rounded-full ${widthClass}`}
                />
              );
            })}
          </div>
        </div>

        <hr className="border-border" />

        <div className="px-4 py-4">
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    </div>
  );
}
