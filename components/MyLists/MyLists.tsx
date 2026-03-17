"use client";

import MediaGrid from "./MediaGrid";
import ListTabs from "./ListTabs";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { useState } from "react";
import { UserMediaItem } from "@/app/types/user-media-item";

interface MyListsProps {
  favorites: UserMediaItem[];
  bookmarks: UserMediaItem[];
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
        items={isActive === "watchlist" ? bookmarks : favorites}
        userId={userId}
      />
    </div>
  );
}
