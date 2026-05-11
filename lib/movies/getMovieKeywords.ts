export async function getMovieKeywords(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/keywords?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) {
    return { genres: [], error: "Failed to fetch movie keywords" };
  }
  return res.json();
}
