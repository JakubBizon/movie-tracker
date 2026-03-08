"use client";

import { Bookmarks } from "@/app/types/bookmarks";
import { Favorites } from "@/app/types/favorites";
import MediaGrid from "./MediaGrid";
import ListTabs from "./ListTabs";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useState } from "react";

interface MyListsProps {
  favorites: Favorites[];
  bookmarks: Bookmarks[];
  userId: string;
}

export default function MyLists({
  favorites,
  bookmarks,
  userId,
}: MyListsProps) {
  useRefreshOnFocus();
  const [isActive, setIsActive] = useState<"watchlist" | "favorites">(
    "watchlist",
  );

  return (
    <div className="max-w-7xl mx-auto ">
      <h2 className="text-4xl py-10">My lists</h2>
      <ListTabs
        active={isActive}
        onChange={setIsActive}
        favoritesLength={favorites.length}
        bookmarksLength={bookmarks.length}
      />
      <MediaGrid
        type={isActive}
        items={isActive === "watchlist" ? bookmarks : favorites}
        userId={userId}
      />
    </div>
  );
}
