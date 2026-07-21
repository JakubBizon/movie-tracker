"use client";
import useMyRatings, { RatingsSort } from "@/hooks/MyRatings/useMyRatings";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyRatingsEmptyRatingsState from "./components/MyRatingsEmptyState";
import MyRatingsPageHeader from "./components/MyRatingsPageHeader";
import RatingsSummarySection from "./components/RatingsSummarySection";
import RatingsToolbar from "./components/RatingsToolbar";
import RatingsList from "./components/RatingsList";

type Props = {
  initialSort: RatingsSort;
};

export default function MyRatingsClient({ initialSort }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sort = (searchParams.get("sort") as RatingsSort) ?? initialSort;

  const { data, isLoading } = useMyRatings(sort);

  const handleSortChange = (newSort: RatingsSort) => {
    const params = new URLSearchParams(searchParams.toString());

    params.set("sort", newSort);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };
  if (isLoading) return null;

  if (!data || data.moviesWithDetails.length === 0) {
    return <MyRatingsEmptyRatingsState />;
  }

  const { average, moviesWithDetails } = data;

  return (
    <div className="flex flex-col max-w-7xl py-10 mx-auto px-4 sm:px-6 min-h-[calc(100vh-300px)]">
      <MyRatingsPageHeader />

      <RatingsSummarySection
        movies={moviesWithDetails}
        moviesCount={moviesWithDetails.length}
        average={average ?? "0"}
      />

      <RatingsToolbar
        moviesCount={moviesWithDetails.length}
        sort={sort}
        onSortChange={handleSortChange}
      />

      <RatingsList movies={moviesWithDetails} />
    </div>
  );
}
