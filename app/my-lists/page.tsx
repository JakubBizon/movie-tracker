import MyLists from "@/components/MyLists/MyLists";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { db } from "../db";
import { bookmarks, favorites } from "../db/schema";
import { eq } from "drizzle-orm";
import { UserMediaItem } from "../types/user-media-item";
import LoggedOutState from "@/components/MyLists/LoggedOutState";
import CustomPagination from "@/components/Movies/_components/CustomPagination";
import { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  searchParams: Promise<{
    tab?: "watchlist" | "favorites";
    page?: string;
  }>;
};

const limit = 12;

export const metadata: Metadata = {
  title: "My Lists",
};

export default async function MyListsHome({ searchParams }: Props) {
  const { page, tab } = await searchParams;
  const pageNum = Number(page);
  const isInvalidPage =
    page !== undefined && (!Number.isInteger(pageNum) || pageNum < 1);
  const activeTab = tab === "favorites" ? "favorites" : "watchlist";
  if (isInvalidPage) {
    redirect(`/my-lists?tab=${activeTab}&page=1`);
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return <LoggedOutState />;
  }

  const userId = session.user.id;
  const isWatchlist = activeTab === "watchlist";

  const [rawItems, totalCount] = await Promise.all([
    isWatchlist
      ? db
          .select()
          .from(bookmarks)
          .where(eq(bookmarks.userId, userId))
          .limit(limit)
          .offset((pageNum - 1) * limit)
      : db
          .select()
          .from(favorites)
          .where(eq(favorites.userId, userId))
          .limit(limit)
          .offset((pageNum - 1) * limit),
    isWatchlist
      ? db.$count(bookmarks, eq(bookmarks.userId, userId))
      : db.$count(favorites, eq(favorites.userId, userId)),
  ]);

  const items: UserMediaItem[] = rawItems.map((item) => ({
    ...item,
    type: isWatchlist ? "watchlist" : "favorite",
  }));

  const [favoritesCount, bookmarksCount] = await Promise.all([
    db.$count(favorites, eq(favorites.userId, userId)),
    db.$count(bookmarks, eq(bookmarks.userId, userId)),
  ]);
  const totalPages = Math.max(1, Math.ceil(totalCount / limit));
  if (pageNum > totalPages) {
    redirect(`/my-lists?tab=${activeTab}&page=${totalPages}`);
  }

  const currentPage = page ? pageNum : 1;

  return (
    <>
      <MyLists
        items={items}
        userId={userId}
        activeTab={activeTab}
        favoritesLength={favoritesCount}
        bookmarksLength={bookmarksCount}
      />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        activeTab={activeTab}
      />
    </>
  );
}
