import { Skeleton } from "@/components/ui/skeleton";

export function SectionSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-1 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-8" />
          <Skeleton className="h-9 w-48" />
        </div>
        <Skeleton className="h-9 w-24" />
      </div>

      <div className="relative px-4 py-4">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="shrink-0 w-[200px]">
              <div className="space-y-3">
                <Skeleton className="h-[300px] w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
