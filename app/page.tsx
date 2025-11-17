import { Suspense } from "react";
import TrendingSection from "@/components/MainPage/CarouselSections/TrendingSection";
import { FlameIcon, Star, Trophy } from "lucide-react";
import PopularSection from "@/components/MainPage/CarouselSections/PopularSection";
import TopRatedSection from "@/components/MainPage/CarouselSections/TopRatedSection";
import { SectionHeader } from "@/components/MainPage/SectionHeader";
import HeroSection from "@/components/MainPage/Hero/HeroSection";

export default function Home() {
  return (
    <div className="bg-transparent dark:bg-secondary w-full font-sans">
      <div className="flex flex-col min-h-screen max-w-7xl mx-auto py-10 w-full ">
        <Suspense>
          <HeroSection />
        </Suspense>

        <SectionHeader
          title="Trending Movies"
          icon={<FlameIcon className="w-8 h-8 text-yellow-300" />}
        />
        <Suspense
          fallback={<div className="bg-black text-white">Ładowanie</div>}
        >
          <TrendingSection />
        </Suspense>

        <SectionHeader
          title="Popular Movies"
          icon={<Star className="h-6 w-6 text-yellow-400" />}
        />
        <Suspense
          fallback={<div className="bg-black text-white">Ładowanie</div>}
        >
          <PopularSection />
        </Suspense>

        <SectionHeader
          title="Top Rated"
          icon={<Trophy className="h-6 w-6 text-amber-500" />}
        />
        <Suspense
          fallback={<div className="bg-black text-white">Ładowanie</div>}
        >
          <TopRatedSection />
        </Suspense>
      </div>
    </div>
  );
}
