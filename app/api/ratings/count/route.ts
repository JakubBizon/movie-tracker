import { db } from "@/app/db";
import { ratings } from "@/app/db/schema";
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
    const ratingsCount = await db
      .select({ value: count() })
      .from(ratings)
      .where(eq(ratings.userId, session.user.id));
    return NextResponse.json({ count: ratingsCount[0]?.value ?? 0 });
  } catch (error) {
    console.error("Error fetching watchlist count:", error);

    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
