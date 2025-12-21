"use client";

import { Bookmark, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function MyLists() {
  const [isActive, setIsActive] = useState<"watchlist" | "favorites">(
    "watchlist"
  );
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const watchlistRef = useRef<HTMLButtonElement>(null);
  const favoritesRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const activeRef = isActive === "watchlist" ? watchlistRef : favoritesRef;
    const element = activeRef.current;

    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  }, [isActive]);
  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-4xl py-10">My lists</h2>

      <div className="relative">
        <div className="flex flex-row gap-6 text-xl mb-2">
          <button
            ref={watchlistRef}
            onClick={() => setIsActive("watchlist")}
            className={`flex gap-1 cursor-pointer hover:font-semibold transition-colors ${
              isActive === "watchlist"
                ? "font-semibold"
                : "text-muted-foreground"
            }`}
          >
            <Bookmark />
            <span>Watchlist</span>
          </button>

          <button
            ref={favoritesRef}
            onClick={() => setIsActive("favorites")}
            className={`flex gap-1 cursor-pointer hover:font-semibold transition-colors ${
              isActive === "favorites"
                ? "font-semibold"
                : "text-muted-foreground"
            }`}
          >
            <Heart />
            <span>Favorites</span>
          </button>
        </div>
        <hr className="border-border" />

        <div
          style={{
            left: `${indicatorStyle.left}px`,
            width: `${indicatorStyle.width}px`,
          }}
          className="absolute bottom-0 h-[2px] bg-primary transition-all duration-300 ease-out"
        ></div>
      </div>
    </div>
  );
}
