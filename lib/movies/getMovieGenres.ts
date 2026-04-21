import { Genre } from "@/app/types/movie";
import { cache } from "react";

export const getMovieGenres = cache(async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) {
    return { genres: [], error: "Failed to fetch genres" };
  }

  return (await res.json()) as { genres: Genre[] };
});
