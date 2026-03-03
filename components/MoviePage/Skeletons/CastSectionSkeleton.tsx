import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function CastSectionSkeleton() {
  return (
    <div className="flex flex-col px-4 max-w-7xl mx-auto space-y-4 bg-muted/20">
      <Skeleton className="h-9 w-24 mb-1" />
      <div className="flex gap-4 overflow-x-auto pb-2">
        {[...Array(8)].map((_, i) => (
          <Card
            key={i}
            className="w-40 shrink-0 p-0 rounded-lg overflow-hidden border-0 shadow-none backdrop-blur-sm"
          >
            <div className="relative w-full h-52">
              <Skeleton className="w-full h-full rounded-none" />
            </div>

            <CardContent className="p-3 space-y-2">
              <Skeleton className="h-4 w-full" />

              <div className="space-y-1">
                <Skeleton className="h-3 w-4/5" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
