import { Bookmark, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

interface ListTabsProps {
  active: "watchlist" | "favorites";
  onChange: (tab: "watchlist" | "favorites") => void;
  favoritesLength: number;
  bookmarksLength: number;
}

export default function ListTabs({
  active,
  onChange,
  favoritesLength,
  bookmarksLength,
}: ListTabsProps) {
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });
  const watchlistRef = useRef<HTMLButtonElement>(null);
  const favoritesRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const activeRef = active === "watchlist" ? watchlistRef : favoritesRef;
    const element = activeRef.current;

    if (element) {
      setIndicatorStyle({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  }, [active, favoritesLength, bookmarksLength]);

  return (
    <div className="relative">
      <div className="flex flex-row gap-6 text-xl mb-2">
        <button
          ref={watchlistRef}
          onClick={() => onChange("watchlist")}
          className={`flex gap-1 cursor-pointer hover:font-semibold transition-colors ${
            active === "watchlist" ? "font-semibold" : "text-muted-foreground"
          }`}
        >
          <Bookmark />
          <span>Watchlist {bookmarksLength > 0 && `(${bookmarksLength})`}</span>
        </button>

        <button
          ref={favoritesRef}
          onClick={() => onChange("favorites")}
          className={`flex gap-1 cursor-pointer hover:font-semibold transition-colors ${
            active === "favorites" ? "font-semibold" : "text-muted-foreground"
          }`}
        >
          <Heart />
          <span>Favorites {favoritesLength > 0 && `(${favoritesLength})`}</span>
        </button>
      </div>
      <hr className="border-border" />

      <div
        style={{
          left: `${indicatorStyle.left}px`,
          width: `${indicatorStyle.width}px`,
        }}
        className="absolute bottom-0 h-0.5 bg-primary transition-all duration-300 ease-out"
      ></div>
    </div>
  );
}
