"use client";
import { useRef, ReactNode, useEffect, useState, useCallback } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: ReactNode[];
  section: string;
}

export function Carousel({ items, section }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const checkScroll = useCallback(() => {
    if (document.hidden) return;
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    const timer = setTimeout(checkScroll, 500);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);
    document.addEventListener("visibilitychange", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      document.removeEventListener("visibilitychange", checkScroll);
      clearTimeout(timer);
    };
  }, [checkScroll]);

  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const width = el.clientWidth - 220;
    const scrollAmount = direction === "left" ? -width : width;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6  mb-4 group overflow-hidden">
      <Button
        variant="ghost"
        aria-label={`Previous ${section} movies`}
        size="icon"
        className={`absolute left-4 border border-muted-foreground top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full glass-strong opacity-100 transition-opacity cursor-pointer ${
          canScrollLeft ? "hidden md:flex" : "hidden"
        }`}
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div
        ref={scrollRef}
        className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 px-2"
      >
        {items}
      </div>

      <Button
        variant="ghost"
        aria-label={`Next ${section} movies`}
        size="icon"
        className={`absolute right-4 border border-muted-foreground top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full glass-strong opacity-100 transition-opacity cursor-pointer ${
          canScrollRight ? "hidden md:flex" : "hidden"
        }`}
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
