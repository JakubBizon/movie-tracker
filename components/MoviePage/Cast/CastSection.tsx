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
    <div className="flex flex-col px-4 max-w-7xl mx-auto space-y-4">
      <h2 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
        Cast
      </h2>
      <div className="flex  gap-4 overflow-x-auto pb-2">
        {slicedCast.map((cast) => (
          <Card
            key={cast.id}
            className="w-40 flex-shrink-0 p-0 rounded-lg overflow-hidden border-0 shadow-none glass"
          >
            <div className="relative w-full h-52 bg-gray-800">
              <Image
                src={`https://image.tmdb.org/t/p/w342${cast.profile_path}`}
                alt={cast.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <CardContent className="p-3">
              <div className="font-bold text-sm line-clamp-1">{cast.name}</div>
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
