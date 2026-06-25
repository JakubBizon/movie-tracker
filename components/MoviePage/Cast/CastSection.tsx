import { Credits } from "@/app/types/credits";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

type CastSectionProps = {
  castData: Credits;
  limit: number;
};

export default function CastSection({ castData, limit }: CastSectionProps) {
  const slicedCast = castData.cast.slice(0, limit);

  return (
    <div className="flex flex-col space-y-4">
      <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
        Cast
      </h2>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {slicedCast.map((cast) => (
          <Card
            key={cast.id}
            className="sm:w-40 w-32 shrink-0 p-0 rounded-lg overflow-hidden border-0 shadow-none dark:glass bg-card"
          >
            <div className="relative w-full aspect-3/4 sm:min-h-52 min-h-40 bg-gray-800 ]">
              {cast.profile_path ? (
                <Image
                  src={`https://image.tmdb.org/t/p/w185${cast.profile_path}`}
                  alt={cast.name}
                  fill
                  sizes="(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 185px"
                  fetchPriority="high"
                  className="object-cover rounded-t-lg"
                />
              ) : (
                <Image
                  src={`/placeholder_people.png`}
                  alt={cast.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <CardContent className="p-3">
              <div className="font-bold text-xs">{cast.name}</div>
              <div className="text-xs text-muted-foreground line-clamp-2">
                {cast.character}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
