"use client";

import MediaGrid from "./MediaGrid";
import ListTabs from "./ListTabs";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { UserMediaItem } from "@/app/types/user-media-item";

interface MyListsProps {
  items: UserMediaItem[];
  userId: string;
  activeTab: "watchlist" | "favorites";
  favoritesLength: number;
  bookmarksLength: number;
}

export default function MyLists({
  items,
  userId,
  activeTab,
  favoritesLength,
  bookmarksLength,
}: MyListsProps) {
  useRefreshOnFocus();

  return (
    <div className="flex flex-col max-w-7xl mx-auto px-4 sm:px-6 min-h-[calc(100vh-300px)]">
      <h2 className="text-4xl py-10">My lists</h2>
      <ListTabs
        activeTab={activeTab}
        favoritesLength={favoritesLength}
        bookmarksLength={bookmarksLength}
      />
      <MediaGrid items={items} userId={userId} />
    </div>
  );
}
