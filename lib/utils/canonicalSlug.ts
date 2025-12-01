import { notFound, permanentRedirect } from "next/navigation";
import { extractIdFromSlug } from "./extractIdFromSlug";
import { getMovieDetails } from "../movies/getMovieDetails";
import { slugify } from "./slugify";

export async function canonicalSlug(slug: string) {
  const id = extractIdFromSlug(slug);

  if (!id) {
    return notFound();
  }
  const movie = await getMovieDetails(id);
  if (!movie) {
    return notFound();
  }

  const canonicalSlug = slugify(movie.title, id);

  if (slug !== canonicalSlug) {
    permanentRedirect(`/movie/${canonicalSlug}`);
  }
}
