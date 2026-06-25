import { cache } from "react";

export const getMovieDetails = cache(async (id: number) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}`,
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
