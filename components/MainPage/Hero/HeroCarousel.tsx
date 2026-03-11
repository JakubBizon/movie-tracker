"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeroMovie } from "@/app/types/movie";
import HeroSlide from "./_components/HeroSlide";

interface HeroCarouselProps {
  data: HeroMovie[];
}

export default function HeroCarousel({ data }: HeroCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
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
    if (!api || !isVisible) return;
    const interval = setInterval(() => {
      if (current === count - 1) {
        api.scrollTo(0);
      } else {
        api.scrollNext();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [api, current, count, isVisible]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
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
              <HeroSlide movie={movie} />
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
