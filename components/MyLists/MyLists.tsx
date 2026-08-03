"use client";

import MediaGrid from "./MediaGrid";
import ListTabs from "./ListTabs";
import { useRefreshOnFocus } from "@/hooks/useRefreshOnFocus";
import { UserMediaItem } from "@/app/types/user-media-item";
import { SortOption } from "@/app/types/list-tabs-sort-options";

interface MyListsProps {
  items: UserMediaItem[];
  userId: string;
  activeTab: "watchlist" | "favorites";
  activeSort: SortOption;
  favoritesLength: number;
  bookmarksLength: number;
}

export default function MyLists({
  items,
  userId,
  activeTab,
  activeSort,
  favoritesLength,
  bookmarksLength,
}: MyListsProps) {
  useRefreshOnFocus();

  return (
    <div className="flex flex-col">
      <h2 className="text-4xl mb-10 ">My lists</h2>
      <ListTabs
        activeTab={activeTab}
        activeSort={activeSort}
        favoritesLength={favoritesLength}
        bookmarksLength={bookmarksLength}
      />
      <MediaGrid items={items} userId={userId} />
    </div>
  );
}
