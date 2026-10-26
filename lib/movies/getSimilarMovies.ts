import { MoviesResponse } from "@/app/types/movie";
import { TMDB_BASE_URL } from "./tmdb";

export async function getSimilarMovies(id: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/similar?api_key=${process.env.API_KEY}`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    if (res.status === 404) return null;

    throw new Error("Failed to fetch similar additional movies");
  }
  return (await res.json()) as MoviesResponse;
}
