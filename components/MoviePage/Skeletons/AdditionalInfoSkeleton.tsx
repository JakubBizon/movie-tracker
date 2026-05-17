import { Skeleton } from "@/components/ui/skeleton";

const skeletonBase = "bg-muted-foreground/10";
const skeletonStrong = "bg-muted-foreground/20";

export default function AdditionalInfoSkeleton() {
  return (
    <div className="px-4 sm:px-6">
      <Skeleton className={`h-9 w-28 ${skeletonBase}`} />

      <div className="mt-4 grid grid-cols-1 gap-6 text-md md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex flex-col space-y-2">
            <Skeleton className={`h-4 w-28 ${skeletonBase}`} />
            <Skeleton className={`h-5 w-40 ${skeletonStrong}`} />
          </div>
        ))}

        <div className="flex flex-col space-y-3">
          <Skeleton className={`h-4 w-24 ${skeletonBase}`} />
          <div className="flex flex-wrap gap-2">
            <Skeleton className={`h-6 w-42 rounded-full ${skeletonStrong}`} />
            <Skeleton className={`h-6 w-16 rounded-full ${skeletonStrong}`} />
            <Skeleton className={`h-6 w-20 rounded-full ${skeletonStrong}`} />
            <Skeleton className={`h-6 w-22 rounded-full ${skeletonStrong}`} />
            <Skeleton className={`h-6 w-18 rounded-full ${skeletonStrong}`} />
            <Skeleton className={`h-6 w-20 rounded-full ${skeletonStrong}`} />
            <Skeleton className={`h-6 w-16 rounded-full ${skeletonStrong}`} />
          </div>
        </div>
      </div>
    </div>
  );
}
