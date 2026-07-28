"use client";

import { startTransition, useCallback, useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { HeroMovie } from "@/app/types/movie";
import HeroSlide from "./_components/HeroSlide";
import { authClient } from "@/lib/auth-client";

interface HeroCarouselProps {
  data: HeroMovie[];
}

export default function HeroCarousel({ data }: HeroCarouselProps) {
  const { data: session } = authClient.useSession();
  const userId = session?.user?.id;
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

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

    startTransition(() => {
      setCurrent(api.selectedScrollSnap());
    });

    const onSelect = () => {
      startTransition(() => {
        setCurrent(api.selectedScrollSnap());
      });
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  useEffect(() => {
    if (!api || !isVisible) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 5000);

    return () => clearInterval(interval);
  }, [api, isVisible, current]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api],
  );

  return (
    <div className="relative mx-auto w-full max-w-7xl px-4 dark:text-white text-black">
      <Carousel
        setApi={setApi}
        opts={{ align: "start", loop: true }}
        className="w-full"
      >
        <CarouselContent>
          {data.map((movie, index) => (
            <CarouselItem key={movie.id}>
              <HeroSlide movie={movie} index={index} userId={userId} />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex justify-center gap-2 py-6">
        {data.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to ${index + 1} slide`}
            onClick={() => scrollTo(index)}
            className={`h-1 rounded-full py-1 px-4 transition-all duration-300 cursor-pointer ${
              index === current
                ? "w-8 bg-primary"
                : "w-4 bg-gray-200 dark:bg-purple-100"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
