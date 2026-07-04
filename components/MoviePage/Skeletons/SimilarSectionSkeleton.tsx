import { Skeleton } from "@/components/ui/skeleton";

export default function SimilarSectionSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-4 mb-4">
      <div className="flex items-center justify-between px-2 mb-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-56" />
        </div>
      </div>

      <div>
        <div className="flex flex-row gap-4 py-4 overflow-hidden my-4 px-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="shrink-0 w-60">
              <div className="space-y-3">
                <Skeleton className="aspect-2/3 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
