import { Skeleton } from "@/components/ui/skeleton";

export default function MobileFiltersSkeleton() {
  return (
    <div className="px-4 sm:px-6">
      <div className="flex justify-between items-center mb-6">
        <div className="h-7 w-20" />
        <div className="flex flex-row gap-2">
          <Skeleton className="h-8 w-16 rounded-full" />
          <Skeleton className="h-8 w-22 rounded-full" />
        </div>
      </div>
    </div>
  );
}
