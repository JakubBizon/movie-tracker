import { TMDB_BASE_URL } from "./tmdb";

export async function getMovieCast(id: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/credits?api_key=${process.env.API_KEY}`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
}
