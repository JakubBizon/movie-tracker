import { TMDB_BASE_URL } from "./tmdb";

export async function getTrailerLink(id: number) {
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/${id}/videos?api_key=${process.env.API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch trailer link");
  return res.json();
}
