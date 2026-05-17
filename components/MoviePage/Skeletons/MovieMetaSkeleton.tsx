import { Skeleton } from "@/components/ui/skeleton";

export default function MovieMetaSkeleton() {
  return (
    <>
      <Skeleton className="h-10 w-full max-w-76 md:h-12 lg:h-14" />

      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Skeleton className="h-5 w-24" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-sm" />
          <Skeleton className="h-5 w-16" />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Skeleton className="md:h-9 h-6 w-14 rounded-full" />
        <Skeleton className="md:h-9 h-6 w-20 rounded-full" />
        <Skeleton className="md:h-9 h-6 w-24 rounded-full" />
      </div>
    </>
  );
}
