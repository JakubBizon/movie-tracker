import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { slugify } from "@/lib/utils/slugify";
import { notFound, permanentRedirect } from "next/navigation";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  console.log(id);

  if (!id) {
    return notFound();
  }
  const movie = await getMovieDetails(id);
  console.log(movie, "xd");
  if (!movie) {
    return notFound();
  }

  const canonicalSlug = slugify(movie.title, id);

  console.log("Canonical slug:", canonicalSlug);
  console.log("Slugs match:", slug === canonicalSlug);

  if (slug !== canonicalSlug) {
    console.log("Redirecting to:", `/movie/${canonicalSlug}`);
    permanentRedirect(`/movie/${canonicalSlug}`);
  }

  return (
    <div className="min-h-screen">
      <div>aha</div>
    </div>
  );
}
