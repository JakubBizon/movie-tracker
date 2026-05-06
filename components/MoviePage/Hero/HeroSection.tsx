"use client";
import { Movie } from "@/app/types/movie";
import { Trailer } from "@/app/types/trailer";
import TrailerDialog from "./_components/TrailerDialog";
import MovieBackground from "./_components/MovieBackground";
import InteractionButtons from "./_components/InteractionButtons";
import MovieMeta from "./_components/MovieMeta";
import MoviePoster from "./_components/MoviePoster";
import { isBackgroundLight } from "@/lib/utils/isBackgroundLight";

type HeroSectionProps = {
  data: Movie;
  color: string;
  trailerLink: Trailer;
  favoriteIds: string[];
  bookmarkedIds: string[];
};

export default function HeroSection({
  data,
  color,
  trailerLink,
  favoriteIds,
  bookmarkedIds,
}: HeroSectionProps) {
  const isLight = isBackgroundLight(color);

  const glassClass = isLight
    ? "bg-black/10 border-black/10 text-black"
    : "bg-white/10 border-white/10 text-white";
  return (
    <>
      <div
        className="relative w-full lg:min-h-125 min-h-100 hidden sm:flex items-center"
        style={{ backgroundColor: color }}
      >
        <div className="relative w-full max-w-480 mx-auto">
          <MovieBackground
            backdropPath={data.backdrop_path}
            title={data.title}
            color={color}
          />
          <div className="relative z-20 container mx-auto px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 py-8">
              <div className="hidden sm:block">
                <MoviePoster data={data} />
              </div>
              <div className="flex-1 text-white flex flex-col justify-center">
                <MovieMeta data={data} />
                <div className="flex items-start flex-wrap gap-3 pt-6">
                  <TrailerDialog trailerLink={trailerLink} movie={data} />
                  <InteractionButtons
                    initialSelections={{
                      favoriteIds,
                      bookmarkedIds,
                    }}
                    data={data}
                    showRating={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="sm:hidden flex flex-col w-full">
        <div className="relative w-full  min-h-62.5">
          <MovieBackground
            backdropPath={data.backdrop_path}
            title={data.title}
            color="transparent"
          />
          <div className="absolute -bottom-12 left-4 z-30 w-25 shadow-xl">
            <MoviePoster data={data} />
          </div>
        </div>

        <div
          className="pt-16 px-4 pb-8 flex flex-col gap-4"
          style={{ backgroundColor: color }}
        >
          <div className="text-white">
            <MovieMeta data={data} />
          </div>

          <div className="flex items-center flex-wrap flex-row gap-2">
            <div className="shrink-0">
              <TrailerDialog trailerLink={trailerLink} movie={data} />
            </div>
            <InteractionButtons
              glassClass={glassClass}
              initialSelections={{
                favoriteIds,
                bookmarkedIds,
              }}
              data={data}
              showRating={true}
            />
          </div>
        </div>
      </div>
    </>
  );
}
