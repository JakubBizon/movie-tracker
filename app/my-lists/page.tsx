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
import { SortOption } from "../types/list-tabs-sort-options";
import { getOrderBy } from "@/lib/ListTabs/getOrderBy";
import { listParamsSchema } from "@/lib/zod";

type Props = {
  searchParams: Promise<{
    tab?: "watchlist" | "favorites";
    page?: string;
    sort?: SortOption;
  }>;
};

const limit = 12;

export const metadata: Metadata = {
  title: "My Lists",
};

export default async function MyListsHome({ searchParams }: Props) {
  const { page, tab, sort } = listParamsSchema.parse(await searchParams);
  const pageNum = Number(page);
  const isInvalidPage =
    page !== undefined && (!Number.isInteger(pageNum) || pageNum < 1);
  const activeTab = tab === "favorites" ? "favorites" : "watchlist";
  const activeSort: SortOption = sort ?? "added_desc";

  if (isInvalidPage) {
    redirect(`/my-lists?tab=${activeTab}&page=1`);
  }
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return (
      <LoggedOutState
        title="Log in to see your lists"
        description="Your favorite movies and bookmarks will be displayed after logging in"
      />
    );
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
          .orderBy(getOrderBy(bookmarks, activeSort))
      : db
          .select()
          .from(favorites)
          .where(eq(favorites.userId, userId))
          .limit(limit)
          .offset((pageNum - 1) * limit)
          .orderBy(getOrderBy(favorites, activeSort)),
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
    <div className="max-w-7xl w-full mx-auto py-10 px-4 sm:px-6">
      <MyLists
        items={items}
        userId={userId}
        activeTab={activeTab}
        activeSort={activeSort}
        favoritesLength={favoritesCount}
        bookmarksLength={bookmarksCount}
      />
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        activeTab={activeTab}
      />
    </div>
  );
}
