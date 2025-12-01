"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Movie } from "@/app/types/movie";
import Image from "next/image";
import { Calendar, Clock, Info, Play, Plus, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { Button } from "@/components/ui/button";
import { minutesToTime } from "@/lib/utils/minutesToTime";

interface HeroCarouselProps {
  data: Movie[];
}
export default function HeroCarousel({ data }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) return;
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  useEffect(() => {
    if (!api) return;
    const interval = setInterval(() => {
      if (current === count - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [api, current, count]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <div className="w-full max-w-7xl mx-auto px-4 relative dark:text-white text-black">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {data.map((movie) => (
            <CarouselItem key={movie.id}>
              <div className="relative h-[600px] w-full overflow-hidden rounded-lg border-none outline-none shadow-none">
                <Image
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.title}
                  className="object-cover"
                  fill
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-r from-background via-background/80 to-transparent" />
                <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

                <div className="absolute top-20 left-0 p-8 z-10 space-y-3">
                  <h2 className="text-5xl font-bold ">{movie.title}</h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm ">
                    <div className="flex items-center gap-1">
                      <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">
                        {movie.vote_average.toFixed(1)}
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="h-5 w-5 text-muted-foreground" />
                      <span>{movie.release_date.slice(0, 4)}</span>
                    </div>
                    {movie.runtime && (
                      <div className="flex items-center gap-1">
                        <Clock className="h-5 w-5" />
                        <span>{minutesToTime(movie.runtime)} min</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {movie.genres?.map((genre) => (
                      <Badge key={genre.id}>{genre.name}</Badge>
                    ))}
                  </div>

                  <div className="w-3/5 text-lg text-muted-foreground line-clamp-3 text-pretty">
                    {movie.overview}
                  </div>
                  <div className="flex items-center gap-2">
                    <Button>
                      <Play className="h-5 w-5 mr-2 fill-white" />
                      Play trailer
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="glass border-border/50 bg-transparent cursor-pointer"
                    >
                      <Info className="mr-2 h-5 w-5" />
                      More info
                    </Button>
                    <Button
                      size="lg"
                      variant="outline"
                      className="glass border-border/50 bg-transparent cursor-pointer"
                    >
                      <Plus className="mr-2 h-5 w-5" />
                      Add to Watchlist
                    </Button>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex gap-2 justify-center mt-5">
        {Array.from({ length: data.length }).map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`h-1 py-1  px-4 rounded-full  transition-all duration-300 cursor-pointer ${
              index === current
                ? "w-8 bg-primary "
                : "w-4 bg-gray-200 dark:bg-purple-100"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
}
