import { checkAverageMovieRating } from "@/app/actions/checkAverageMovieRating";
import AdditionalInfo from "@/components/MoviePage/AdditionalInfo/AdditionalInfo";
import SimilarSection from "@/components/MoviePage/Carousel/SimilarSection";
import Cast from "@/components/MoviePage/Cast/Cast";
import MovieHero from "@/components/MoviePage/Hero/MovieHero";
import Reviews from "@/components/MoviePage/Reviews/Reviews";
import AdditionalInfoSkeleton from "@/components/MoviePage/Skeletons/AdditionalInfoSkeleton";
import CastSectionSkeleton from "@/components/MoviePage/Skeletons/CastSectionSkeleton";
import { HeroSectionSkeleton } from "@/components/MoviePage/Skeletons/HeroSectionSkeleton";
import SimilarSectionSkeleton from "@/components/MoviePage/Skeletons/SimilarSectionSkeleton";
import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import { canonicalMovieOrRedirect } from "@/lib/utils/canonicalMovieOrRedirect";
import { extractIdFromSlug } from "@/lib/utils/extractIdFromSlug";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (!id) return;
  const movie = await getMovieDetails(id);
  if (!movie) return;
  return {
    title: movie.title,
  };
}

export default async function MoviePage({ params }: Props) {
  const { slug } = await params;
  const id = extractIdFromSlug(slug);
  if (!id) {
    notFound();
  }

  const [movie, rating] = await Promise.all([
    canonicalMovieOrRedirect(slug),
    checkAverageMovieRating(id.toString()),
  ]);
  return (
    <div className="bg-transparent dark:bg-secondary w-full font-sans">
      <Suspense fallback={<HeroSectionSkeleton />}>
        <MovieHero movie={movie} rating={rating} />
      </Suspense>

      <div className="mt-5 space-y-10">
        <Suspense fallback={<CastSectionSkeleton />}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Cast id={movie.id} />
          </div>
        </Suspense>

        <Suspense fallback={<AdditionalInfoSkeleton />}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <AdditionalInfo id={movie.id} movie={movie} />
          </div>
        </Suspense>

        <Suspense fallback={null}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <Reviews movie={movie} />
          </div>
        </Suspense>

        <Suspense fallback={<SimilarSectionSkeleton />}>
          <SimilarSection id={movie.id} />
        </Suspense>
      </div>
    </div>
  );
}
