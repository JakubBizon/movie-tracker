import { TMDB_BASE_URL } from "./tmdb";

export async function getPopularMovies(page: number) {
  const safePage =
    Number.isInteger(page) && page >= 1 && page <= 500 ? page : 1;
  const res = await fetch(
    `${TMDB_BASE_URL}/movie/popular?api_key=${process.env.API_KEY}&page=${safePage}`,
    {
      next: { revalidate: 3600 },
    },
  );

  if (!res.ok) throw new Error("Failed to fetch popular movies");

  return res.json();
}
