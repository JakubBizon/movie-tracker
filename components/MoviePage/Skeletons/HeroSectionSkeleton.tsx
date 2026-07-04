import { Skeleton } from "@/components/ui/skeleton";
import MovieMetaSkeleton from "./MovieMetaSkeleton";

const skeletonBase = "bg-muted-foreground/15";
const skeletonSoft = "bg-muted-foreground/10";
const skeletonStrong = "bg-muted-foreground/25";

export function HeroSectionSkeleton() {
  return (
    <>
      <div className="relative hidden min-h-100 w-full items-center sm:flex lg:min-h-125">
        <div className="relative mx-auto mb-15 w-full max-w-480">
          <Skeleton
            className={`absolute inset-0 min-h-[500px] w-full overflow-hidden ${skeletonSoft}`}
          />

          <div className="absolute inset-0 bg-black/0 dark:bg-black/45" />

          <div className="relative z-20 container mx-auto max-w-7xl px-4 md:px-6">
            <div className="flex flex-col gap-6 py-8 md:flex-row lg:gap-10">
              <div className="hidden sm:block">
                <div className="shrink-0">
                  <Skeleton
                    className={`relative aspect-2/3 overflow-hidden rounded-xl sm:w-40 md:w-64 lg:w-80 ${skeletonStrong}`}
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-center">
                <div className="space-y-5">
                  <MovieMetaSkeleton />

                  <div className="space-y-2">
                    <Skeleton
                      className={`h-4 w-full max-w-3xl ${skeletonBase}`}
                    />
                    <Skeleton
                      className={`h-4 w-full max-w-2xl ${skeletonBase}`}
                    />
                    <Skeleton
                      className={`h-4 w-full max-w-xl ${skeletonBase}`}
                    />
                  </div>

                  <div className="flex flex-row flex-wrap items-center gap-3">
                    <div className="shrink-0">
                      <Skeleton className={`h-10 w-32 ${skeletonStrong}`} />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className={`h-10 w-12 ${skeletonBase}`} />
                      <Skeleton className={`h-10 w-12 ${skeletonBase}`} />
                      <Skeleton className={`h-10 w-20 ${skeletonBase}`} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col sm:hidden">
        <div className="relative min-h-62.5 w-full">
          <Skeleton
            className={`absolute inset-0 min-h-[200px] w-full overflow-hidden ${skeletonSoft}`}
          />

          <div className="absolute inset-0 bg-black/30 dark:bg-black/40" />

          <div className="absolute -bottom-12 left-4 z-30 w-25 shadow-xl">
            <div className="shrink-0">
              <Skeleton
                className={`relative aspect-2/3 w-32 overflow-hidden rounded-xl ${skeletonStrong}`}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 pb-8 pt-16">
          <div className="space-y-5">
            <MovieMetaSkeleton />
          </div>

          <div className="flex-1 space-y-2">
            <Skeleton className={`h-4 w-full ${skeletonBase}`} />
            <Skeleton className={`h-4 w-full ${skeletonBase}`} />
            <Skeleton className={`h-4 w-11/12 ${skeletonBase}`} />
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2">
            <div className="flex flex-row flex-wrap items-center gap-3">
              <div className="shrink-0">
                <Skeleton className={`h-10 w-32 ${skeletonStrong}`} />
              </div>
              <div className="flex gap-2">
                <Skeleton className={`h-10 w-12 ${skeletonBase}`} />
                <Skeleton className={`h-10 w-12 ${skeletonBase}`} />
                <Skeleton className={`h-10 w-20 ${skeletonBase}`} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
