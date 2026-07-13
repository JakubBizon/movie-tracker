import { useQuery } from "@tanstack/react-query";

const ratingsCountKey = "ratings-count" as const;

async function fetchRatingsCount(): Promise<{ count: number }> {
  const res = await fetch("api/ratings/count");
  if (!res.ok) throw new Error("Failed to fetch ratings count");
  return res.json();
}
export default function useRatingsCount(enabled: boolean) {
  const { data, isLoading } = useQuery({
    queryKey: [ratingsCountKey],
    queryFn: fetchRatingsCount,
    enabled: enabled,
  });
  return {
    ratingsCount: data?.count ?? 0,
    isLoadingRatings: isLoading,
  };
}
