"use client";

import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import { useQuery } from "@tanstack/react-query";

type RatingsResponse = {
  ratedMovies: unknown[];
  average: string | null;
  moviesWithDetails: MyRatingsMovieDetails[];
};
async function fetchRatingsData(): Promise<RatingsResponse> {
  const res = await fetch("/api/ratings/data");
  if (!res.ok) throw new Error("Failed to fetch ratings data");
  return res.json();
}

const useMyRatings = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["ratings-data"],
    queryFn: fetchRatingsData,
    refetchOnWindowFocus: true,
    staleTime: 1000,
  });

  return {
    data,
    isLoading,
  };
};

export default useMyRatings;
