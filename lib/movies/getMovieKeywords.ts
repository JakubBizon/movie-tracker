import { KeywordsResponse } from "@/app/types/keyword";
import { TMDB_BASE_URL } from "./tmdb";

export async function getMovieKeywords(movieId: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/keywords?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return { keywords: [], error: "Failed to fetch movie keywords" };
  }

  return (await res.json()) as KeywordsResponse;
}
