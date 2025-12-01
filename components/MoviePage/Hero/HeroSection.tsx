import { Movie } from "@/app/types/movie";
import { Badge } from "@/components/ui/badge";
import { minutesToTime } from "@/lib/utils/minutesToTime";
import { Star, Play, Plus, Info } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

type HeroSectionProps = {
  data: Movie;
  color: string;
};

export default function HeroSection({ data, color }: HeroSectionProps) {
  console.log(color);
  return (
    <div className="relative w-full" style={{ backgroundColor: color }}>
      <div className="relative w-full max-w-[1920px] mx-auto">
        <div className="absolute inset-0 max-h-[600px] w-full overflow-hidden">
          <Image
            src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
            alt={data.title}
            fill
            className="object-cover object-top w-full h-full"
            priority
            quality={85}
          />

          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to right, ${color} 0%, ${color}f0 25%, ${color}80 50%, transparent 75%)`,
            }}
          />
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `linear-gradient(to top, ${color} 0%, ${color}cc 20%, transparent 60%)`,
            }}
          />

          <div className="absolute inset-0 z-10 bg-gradient-radial from-transparent via-transparent to-black/50" />
        </div>

        <div className="relative z-20 h-[600px] container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="h-full flex items-center">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full">
              <div className="shrink-0">
                <div className="relative w-48 md:w-64 lg:w-80 xl:w-96 aspect-[2/3] rounded-xl overflow-hidden shadow-2xl ring-1 ring-white/10 hover:ring-white/30">
                  <Image
                    src={`https://image.tmdb.org/t/p/w500${data.poster_path}`}
                    alt={data.title}
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                  />
                </div>
              </div>

              <div className="flex-1 text-white flex flex-col justify-center max-w-3xl space-y-4 md:space-y-5">
                <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight drop-shadow-lg">
                  {data.title}
                </h1>

                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm md:text-base">
                  <div className="flex items-center gap-1.5 bg-yellow-500/20 backdrop-blur-sm px-3 py-1.5 rounded-full border border-yellow-500/30">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-yellow-400">
                      {data.vote_average.toFixed(1)}
                    </span>
                  </div>

                  <span className="text-gray-200 font-medium px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md">
                    {data.release_date.slice(0, 4)}
                  </span>

                  {data.runtime && (
                    <span className="text-gray-200 px-2 py-1 bg-white/10 backdrop-blur-sm rounded-md">
                      {minutesToTime(data.runtime)}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap">
                  {data.genres?.slice(0, 4).map((genre) => (
                    <Badge
                      className="text-sm md:text-base bg-white/15 hover:bg-white/25 transition-colors backdrop-blur-sm text-white border border-white/20 px-3 py-1"
                      key={genre.id}
                    >
                      {genre.name}
                    </Badge>
                  ))}
                </div>

                <p className="text-sm md:text-base lg:text-lg text-gray-100 leading-relaxed max-w-3xl text-pretty drop-shadow-md">
                  {data.overview}
                </p>

                <div className="flex flex-wrap gap-3 pt-2">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-gray-200 font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Play className="w-5 h-5 mr-2 fill-current" />
                    Play Trailer
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white border-white/30 hover:border-white/50 font-semibold px-6 md:px-8 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Info className="w-5 h-5 mr-2" />
                    More Info
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/30 hover:border-white/50 shadow-lg hover:scale-105 transition-transform"
                  >
                    <Plus className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
