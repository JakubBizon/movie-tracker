import { Suspense } from "react";
import TrendingSection from "@/components/MainPage/CarouselSections/TrendingSection";
import PopularSection from "@/components/MainPage/CarouselSections/PopularSection";
import TopRatedSection from "@/components/MainPage/CarouselSections/TopRatedSection";
import HeroSection from "@/components/MainPage/Hero/HeroSection";
import HeroSkeleton from "@/components/MainPage/Hero/HeroSkeleton";
import { SectionSkeleton } from "@/components/MainPage/SectionSkeleton";
import UpcomingSection from "@/components/MainPage/CarouselSections/UpcomingSection";
import { Metadata } from "next";
import LoginSuccessToast from "@/components/LoginSuccessToast";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ login?: string }>;
}) {
  const { login } = await searchParams;
  return (
    <div className="bg-transparent dark:bg-secondary w-full font-sans">
      {login === "success" && <LoginSuccessToast />}
      <div className="flex flex-col max-w-7xl mx-auto pt-5 pb-10 w-full ">
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
