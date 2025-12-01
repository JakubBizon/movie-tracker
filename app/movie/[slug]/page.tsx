import SimilarSection from "@/components/MoviePage/Carousel/SimilarSection";
import Cast from "@/components/MoviePage/Cast/Cast";
import MovieHero from "@/components/MoviePage/Hero/MovieHero";
import { canonicalSlug } from "@/lib/utils/canonicalSlug";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await canonicalSlug(slug);
  return (
    <div className="bg-transparent dark:bg-secondary w-full font-sans">
      <MovieHero id={extractIdFromSlug(slug)} />

      <div className="max-w-7xl mx-auto">
        <Cast id={extractIdFromSlug(slug)} />
        <SimilarSection id={extractIdFromSlug(slug)} />
      </div>
    </div>
  );
}
