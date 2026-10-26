import { MoviesResponse } from "@/app/types/movie";
import { TMDB_BASE_URL } from "./tmdb";

export async function getSearchResults(
  query: string,
  page: number = 1,
): Promise<MoviesResponse> {
  const res = await fetch(
    `${TMDB_BASE_URL}/search/movie?query=${encodeURIComponent(query)}&page=${page}`,
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) {
    const errorData = await res.json();
    console.error("TMDB API Error:", errorData);
    throw new Error("Failed to fetch search results");
  }
  return (await res.json()) as MoviesResponse;
}
