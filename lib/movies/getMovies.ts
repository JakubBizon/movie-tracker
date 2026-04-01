import { Options } from "@/app/types/search-params-options";

const sortMap: Record<string, string> = {
  p_desc: "popularity.desc",
  p_asc: "popularity.asc",
  r_desc: "vote_average.desc",
  r_asc: "vote_average.asc",
  date_desc: "primary_release_date.desc",
  date_asc: "primary_release_date.asc",
};

export async function getMovies(
  page: number,
  options?: Options,
  preset?: "top-rated" | "upcoming",
) {
  const { sort, genres, from, to } = options || {};

  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  url.searchParams.set("page", page.toString());
  const defaultSort =
    preset === "top-rated" ? "vote_average.desc" : "popularity.desc";
  const sortBy = sort && sortMap[sort] ? sortMap[sort] : defaultSort;
  url.searchParams.set("sort_by", sortBy);
  if (preset === "top-rated") {
    url.searchParams.set("vote_count.gte", "300");
  }
  if (preset === "upcoming") {
    const today = new Date().toISOString().split("T")[0];
    const two_monthsLater = new Date();
    two_monthsLater.setMonth(two_monthsLater.getMonth() + 2);

    url.searchParams.set("primary_release_date.gte", today);
    url.searchParams.set(
      "primary_release_date.lte",
      two_monthsLater.toISOString().split("T")[0],
    );
  }

  if (genres) url.searchParams.set("with_genres", genres);
  if (from) url.searchParams.set("primary_release_date.gte", from);
  if (to) url.searchParams.set("primary_release_date.lte", to);
  if (sortBy.includes("vote_average") && preset != "upcoming") {
    url.searchParams.set("vote_count.gte", "300");
  }
  const res = await fetch(url.toString(), {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });
  if (!res.ok) {
    const errorData = await res.json();
    console.error("TMDB API Error:", errorData);
    throw new Error("Failed to fetch movies");
  }
  return res.json();
}
