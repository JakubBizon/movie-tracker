import { notFound, permanentRedirect } from "next/navigation";
import { extractIdFromSlug } from "./extractIdFromSlug";
import { getMovieDetails } from "../movies/getMovieDetails";
import { slugify } from "./slugify";

export async function canonicalMovieOrRedirect(slug: string) {
  const id = extractIdFromSlug(slug);

  if (!id) {
    notFound();
  }

  const movie = await getMovieDetails(id);

  if (!movie) {
    notFound();
  }

  const canonical = slugify(movie.title, id);

  if (slug !== canonical) {
    permanentRedirect(`/movie/${canonical}`);
  }

  return movie;
}
