"use client";

import Link from "next/link";
import { Bookmark, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ListTabsFilters from "./ListTabsFilters";

interface ListTabsProps {
  activeTab: "watchlist" | "favorites";
  activeSort: string;
  favoritesLength: number;
  bookmarksLength: number;
}

export default function ListTabs({
  activeTab,
  activeSort,
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
    <div className="border-b border-border pb-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <div className="relative">
          <div className="flex gap-6 text-xl">
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
              <span>
                Watchlist {bookmarksLength > 0 && `(${bookmarksLength})`}
              </span>
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
              <span>
                Favorites {favoritesLength > 0 && `(${favoritesLength})`}
              </span>
            </Link>
          </div>
          <div
            style={{
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
            }}
            className="absolute -bottom-2 h-0.5 bg-primary transition-all duration-300 ease-out"
          />
        </div>

        <div className="md:ml-auto">
          <ListTabsFilters activeSort={activeSort} />
        </div>
      </div>
    </div>
  );
}
