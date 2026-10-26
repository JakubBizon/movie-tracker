import { TMDB_BASE_URL } from "@/lib/movies/tmdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams.get("query");
  if (!query) return NextResponse.json({ results: [] });

  const res = await fetch(
    `${TMDB_BASE_URL}/movie/search/movie?api_key=${process.env.API_KEY}&query=${encodeURIComponent(query)}`,
  );
  const data = await res.json();

  return NextResponse.json(data);
}
