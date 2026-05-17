import { Skeleton } from "@/components/ui/skeleton";
type Props = {
  isTrending?: boolean;
};
export function SectionSkeleton({ isTrending = false }: Props) {
  return (
    <>
      <div className="flex items-center justify-between px-4 py-1 mt-4">
        <div className="flex items-center gap-2">
          <Skeleton className="w-8 h-9" />
          <Skeleton className="h-9 md:w-48 w-32" />
        </div>
        {!isTrending && <Skeleton className="h-9 md:w-24 w-18" />}
      </div>

      <div className="relative px-4 py-4">
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="shrink-0 w-[140px] xs:w-[160px] sm:w-[180px] md:w-[220px] lg:w-[240px] pl-2"
            >
              <div className="space-y-3">
                <Skeleton className="aspect-2/3 w-full rounded-lg" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
