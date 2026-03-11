import { db } from "@/app/db";
import { ratings } from "@/app/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const movieId = url.searchParams.get("movieId");
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user.id || !movieId) {
    return NextResponse.json({ rating: 0 });
  }

  try {
    const result = await db
      .select()
      .from(ratings)
      .where(
        and(eq(ratings.userId, session.user.id), eq(ratings.movieId, movieId)),
      )
      .limit(1);
    const ratingValue = result.length > 0 ? result[0].rating : 0;

    return NextResponse.json({ rating: ratingValue });
  } catch (error) {
    console.error("Error fetching rating:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
