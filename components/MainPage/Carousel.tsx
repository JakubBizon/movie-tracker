"use client";
import { useRef, ReactNode, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface CarouselProps {
  items: ReactNode[];
}

export function Carousel({ items }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const checkScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScroll();
    const timer = setTimeout(checkScroll, 500);

    el.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      el.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, []);
  const scroll = (direction: "left" | "right") => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -1000 : 1000;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <div className="relative max-w-7xl mx-auto px-4 py-4 mb-4 group">
      <Button
        variant="ghost"
        size="icon"
        className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full glass-strong opacity-100  transition-opacity cursor-pointer ${
          canScrollLeft ? "" : "hidden"
        }`}
        onClick={() => scroll("left")}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>

      <div
        ref={scrollRef}
        className="flex flex-row gap-4 overflow-x-auto scrollbar-hide scroll-smooth py-4 -my-4 px-2"
      >
        {items}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 rounded-full glass-strong  opacity-100  transition-opacity cursor-pointer ${
          canScrollRight ? "" : "hidden"
        }`}
        onClick={() => scroll("right")}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
