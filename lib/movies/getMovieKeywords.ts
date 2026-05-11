import { KeywordsResponse } from "@/app/types/keyword";

export async function getMovieKeywords(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return { keywords: [], error: "Failed to fetch movie keywords" };
  }

  return (await res.json()) as KeywordsResponse;
}
