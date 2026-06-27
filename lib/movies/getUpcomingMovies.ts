export async function getUpcomingMovies() {
  const today = new Date().toISOString().split("T")[0];
  const futureDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?` +
      `api_key=${process.env.API_KEY}` +
      `&primary_release_date.gte=${today}` +
      `&primary_release_date.lte=${futureDate}` +
      `&sort_by=primary_release_date.asc` +
      {
        next: { revalidate: 3600 },
      },
  );
  if (!res.ok) throw new Error("Failed to fetch upcoming movies");
  return res.json();
}
