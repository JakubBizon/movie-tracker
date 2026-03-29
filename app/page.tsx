import { Suspense } from "react";
import TrendingSection from "@/components/MainPage/CarouselSections/TrendingSection";
import PopularSection from "@/components/MainPage/CarouselSections/PopularSection";
import TopRatedSection from "@/components/MainPage/CarouselSections/TopRatedSection";
import HeroSection from "@/components/MainPage/Hero/HeroSection";
import HeroSkeleton from "@/components/MainPage/Hero/HeroSkeleton";
import { SectionSkeleton } from "@/components/MainPage/SectionSkeleton";
import UpcomingSection from "@/components/MainPage/CarouselSections/UpcomingSection";

export default function Home() {
  return (
    <div className="bg-transparent dark:bg-secondary w-full font-sans">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto py-10 w-full ">
        <Suspense fallback={<HeroSkeleton />}>
          <HeroSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton isTrending={true} />}>
          <TrendingSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <PopularSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <TopRatedSection />
        </Suspense>

        <Suspense fallback={<SectionSkeleton />}>
          <UpcomingSection />
        </Suspense>
      </div>
    </div>
  );
}
