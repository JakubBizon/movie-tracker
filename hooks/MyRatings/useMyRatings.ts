"use client";

import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import { useQuery } from "@tanstack/react-query";

export type RatingsSort = "highest" | "lowest" | "recent";

type RatingsResponse = {
  average: string | null;
  moviesWithDetails: MyRatingsMovieDetails[];
  sort: RatingsSort;
};
async function fetchRatingsData(sort: RatingsSort): Promise<RatingsResponse> {
  const res = await fetch(`/api/ratings/data?sort=${sort}`);
  if (!res.ok) throw new Error("Failed to fetch ratings data");
  return res.json();
}

const useMyRatings = (sort: RatingsSort = "recent") => {
  const { data, isLoading } = useQuery({
    queryKey: ["ratings-data", sort],
    queryFn: () => fetchRatingsData(sort),
    refetchOnWindowFocus: true,
    staleTime: 1000,
  });

  return {
    data,
    isLoading,
  };
};

export default useMyRatings;
