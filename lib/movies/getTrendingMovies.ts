export async function getTrendingMovies(page = 1) {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.API_KEY}&page=${page}`,
    {
      next: { revalidate: 3600 },
    },
  );
  if (!res.ok) throw new Error("Failed to fetch trending movies");
  return res.json();
}
