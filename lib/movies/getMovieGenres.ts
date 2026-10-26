import { Genre } from "@/app/types/movie";
import { cache } from "react";
import { TMDB_BASE_URL } from "./tmdb";

export const getMovieGenres = cache(async () => {
  const res = await fetch(
    `${TMDB_BASE_URL}/genre/movie/list?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) {
    return { genres: [], error: "Failed to fetch genres" };
  }

  return (await res.json()) as { genres: Genre[] };
});
