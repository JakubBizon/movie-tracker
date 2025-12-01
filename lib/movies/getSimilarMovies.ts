export async function getSimilarMovies(id: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${process.env.API_KEY}`,
    {
      next: { revalidate: 3600 },
    }
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
}
