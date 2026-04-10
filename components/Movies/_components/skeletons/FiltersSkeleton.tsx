import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function FiltersSkeleton() {
  return (
    <div className="w-full space-y-4">
      <Card className="flex flex-col py-4 space-y-4">
        <div className="flex items-center justify-between px-4 mt-4">
          <Skeleton className="h-7 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>

        <hr className="border-border" />

        <div className="px-4 space-y-4">
          <Skeleton className="h-5 w-24" />
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-9 flex-1 max-w-60" />
          </div>
          <div className="flex justify-between items-center gap-4">
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-9 flex-1 max-w-60" />
          </div>
        </div>

        <hr className="border-border" />

        <div className="px-4 space-y-3">
          <Skeleton className="h-4 w-16" />
          <div className="flex flex-wrap gap-2">
            {Array.from({ length: 12 }).map((_, i) => {
              const widths = ["w-12", "w-16", "w-20", "w-24"];
              const widthClass = widths[i % widths.length];

              return (
                <Skeleton
                  key={i}
                  className={`h-7 rounded-full ${widthClass}`}
                />
              );
            })}
          </div>
        </div>

        <hr className="border-border" />

        <div className="px-4 pt-2">
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    </div>
  );
}
