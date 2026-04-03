export async function getMovieGenres() {
  const res = await fetch(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}`,
    { next: { revalidate: 86400 } },
  );
  if (!res.ok) {
    return { genres: [], error: "Failed to fetch genres" };
  }
  return res.json();
}
