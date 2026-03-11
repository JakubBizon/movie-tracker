"use client";
import { Movie } from "@/app/types/movie";
import { Trailer } from "@/app/types/trailer";
import TrailerDialog from "./_components/TrailerDialog";
import MovieBackground from "./_components/MovieBackground";
import InteractionButtons from "./_components/InteractionButtons";
import MovieMeta from "./_components/MovieMeta";
import MoviePoster from "./_components/MoviePoster";

type HeroSectionProps = {
  data: Movie;
  color: string;
  trailerLink: Trailer;
  initialIsFavorite?: boolean;
  initialIsBookmarked?: boolean;
};

export default function HeroSection({
  data,
  color,
  trailerLink,
  initialIsFavorite,
  initialIsBookmarked,
}: HeroSectionProps) {
  return (
    <div className="relative w-full" style={{ backgroundColor: color }}>
      <div className="relative w-full max-w-[1920px] mx-auto">
        <MovieBackground
          backdropPath={data.backdrop_path}
          title={data.title}
          color={color}
        />

        <div className="relative z-20 h-[600px] container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="h-full flex items-center">
            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 w-full">
              <MoviePoster data={data} />
              <div className="flex-1 text-white flex flex-col justify-center max-w-3xl space-y-4 md:space-y-5">
                <MovieMeta data={data} />

                <div className="flex flex-wrap gap-3 pt-2">
                  <TrailerDialog trailerLink={trailerLink} movie={data} />
                  <InteractionButtons
                    initialIsFavorite={initialIsFavorite}
                    initialIsBookmarked={initialIsBookmarked}
                    data={data}
                    showRating={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
