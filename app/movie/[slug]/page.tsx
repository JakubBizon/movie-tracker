import SimilarSection from "@/components/MoviePage/Carousel/SimilarSection";
import Cast from "@/components/MoviePage/Cast/Cast";
import MovieHero from "@/components/MoviePage/Hero/MovieHero";
import CastSectionSkeleton from "@/components/MoviePage/Skeletons/CastSectionSkeleton";
import { HeroSectionSkeleton } from "@/components/MoviePage/Skeletons/HeroSectionSkeleton";
import { canonicalSlug } from "@/lib/utils/canonicalSlug";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { Suspense } from "react";

export default async function MoviePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  await canonicalSlug(slug);
  return (
    <div className="bg-transparent dark:bg-secondary w-full font-sans">
      <Suspense fallback={<HeroSectionSkeleton />}>
        <MovieHero id={extractIdFromSlug(slug)} />
      </Suspense>

      <div className="max-w-7xl mx-auto mt-5 space-y-10">
        <Suspense fallback={<CastSectionSkeleton />}>
          <Cast id={extractIdFromSlug(slug)} />
        </Suspense>

        <Suspense>
          <SimilarSection id={extractIdFromSlug(slug)} />
        </Suspense>
      </div>
    </div>
  );
}
