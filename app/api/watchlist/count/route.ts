import { db } from "@/app/db";
import { bookmarks, favorites } from "@/app/db/schema";
import { auth } from "@/lib/auth";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id) {
    return NextResponse.json({ count: 0 });
  }

  try {
    const [bookmarksRes, favoritesRes] = await Promise.all([
      db
        .select({ value: count() })
        .from(bookmarks)
        .where(eq(bookmarks.userId, session.user.id)),
      db
        .select({ value: count() })
        .from(favorites)
        .where(eq(favorites.userId, session.user.id)),
    ]);
    const totalCount =
      (bookmarksRes[0]?.value ?? 0) + (favoritesRes[0]?.value ?? 0);
    return NextResponse.json({ count: totalCount });
  } catch (error) {
    console.error("Error fetching watchlist count:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
