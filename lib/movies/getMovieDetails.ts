import { cache } from "react";
import { TMDB_BASE_URL } from "./tmdb";

export const getMovieDetails = cache(async (id: number) => {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}?api_key=${process.env.API_KEY}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Failed to fetch movie details");
  }

  return res.json();
});
