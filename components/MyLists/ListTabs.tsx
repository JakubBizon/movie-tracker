"use client";

import Link from "next/link";
import { Bookmark, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ListTabsProps {
  activeTab: "watchlist" | "favorites";
  favoritesLength: number;
  bookmarksLength: number;
}

export default function ListTabs({
  activeTab,
  favoritesLength,
  bookmarksLength,
}: ListTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const watchlistRef = useRef<HTMLAnchorElement>(null);
  const favoritesRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const activeRef = activeTab === "watchlist" ? watchlistRef : favoritesRef;
    const element = activeRef.current;

    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  }, [activeTab, favoritesLength, bookmarksLength]);

  return (
    <div className="relative">
      <div className="flex flex-row gap-6 text-xl mb-2">
        <Link
          href="?tab=watchlist"
          ref={watchlistRef}
          className={`flex gap-1 cursor-pointer hover:font-semibold transition-colors ${
            activeTab === "watchlist"
              ? "font-semibold"
              : "text-muted-foreground"
          }`}
        >
          <Bookmark />
          <span>Watchlist {bookmarksLength > 0 && `(${bookmarksLength})`}</span>
        </Link>

        <Link
          href="?tab=favorites"
          ref={favoritesRef}
          className={`flex gap-1 cursor-pointer hover:font-semibold transition-colors ${
            activeTab === "favorites"
              ? "font-semibold"
              : "text-muted-foreground"
          }`}
        >
          <Heart />
          <span>Favorites {favoritesLength > 0 && `(${favoritesLength})`}</span>
        </Link>
      </div>

      <hr className="border-border" />

      <div
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
      />
    </div>
  );
}
