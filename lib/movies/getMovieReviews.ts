export async function getMovieReviews(movieId: number) {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );

  if (!res.ok) {
    return { keywords: [], error: "Failed to fetch reviews" };
  }

  return res.json();
}
