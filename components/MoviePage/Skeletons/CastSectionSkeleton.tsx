import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CastSectionSkeleton() {
  return (
    <div className="flex flex-col px-4 sm:px-6 max-w-7xl mx-auto space-y-4">
      <Skeleton className="h-9 w-24" />

      <div className="flex gap-4 overflow-hidden pb-2">
        {[...Array(8)].map((_, i) => (
          <Card
            key={i}
            className="sm:w-40 w-32 shrink-0 p-0 rounded-lg overflow-hidden border-0 shadow-none dark:glass bg-muted-foreground/10"
          >
            <div className="relative w-full aspect-3/4 sm:min-h-52 min-h-40">
              <Skeleton className="h-full w-full rounded-none" />
            </div>

            <CardContent className="p-3">
              <div className="space-y-2">
                <Skeleton className="h-3 w-5/6" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
