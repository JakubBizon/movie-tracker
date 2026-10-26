import { TMDB_BASE_URL } from "./tmdb";

export async function getMovieReviews(movieId: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}/reviews?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return { results: [], error: "Failed to fetch reviews" };
  }

  return res.json();
}
