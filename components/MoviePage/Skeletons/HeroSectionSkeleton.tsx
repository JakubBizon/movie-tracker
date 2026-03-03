import { Skeleton } from "@/components/ui/skeleton";

export function HeroSectionSkeleton() {
  return (
    <div className="relative w-full bg-muted/20">
      <div className="relative w-full max-w-[1920px] mx-auto">
        <div className="absolute inset-0 max-h-[600px] w-full overflow-hidden">
          <Skeleton className="w-full h-ful" />
        </div>

        <div className="relative z-20 h-[600px] container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="h-full flex items-center">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full">
              <div className="shrink-0">
                <Skeleton className="relative w-48 md:w-64 lg:w-80 xl:w-96 aspect-2/3 rounded-xl overflow-hidde"></Skeleton>
              </div>

              <div className="flex-1 text-white flex flex-col justify-center max-w-3xl space-y-4 md:space-y-5">
                <Skeleton className="h-10 md:h-12 lg:h-16 w-3/4" />

                <div className="flex flex-wrap items-center gap-3 md:gap-4 ">
                  <Skeleton className="h-8 w-20 rounded-full" />
                  <Skeleton className="h-8 w-16 rounded-md" />
                  <Skeleton className="h-8 w-24 rounded-md" />
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  <Skeleton className="h-7 w-20 rounded-full" />
                  <Skeleton className="h-7 w-24 rounded-full" />
                  <Skeleton className="h-7 w-20 rounded-full" />
                </div>

                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </div>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Skeleton className="h-12 w-32 md:w-40 rounded-md" />
                  <Skeleton className="h-12 w-32 md:w-40 rounded-md" />
                  <Skeleton className="h-12 w-12 rounded-md" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
