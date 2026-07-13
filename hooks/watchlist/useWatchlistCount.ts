import { useQuery } from "@tanstack/react-query";

export const watchlistCountQueryKey = ["watchlist", "count"] as const;

export default function useWatchlistCount(enabled: boolean) {
  const { data, isLoading } = useQuery({
    queryKey: watchlistCountQueryKey,
    queryFn: async () => {
      const res = await fetch("/api/watchlist/count");
      if (!res.ok) throw new Error("Failed to fetch count");
      return res.json() as Promise<{ count: number }>;
    },
    enabled: enabled,
    refetchOnWindowFocus: true,
  });

  return {
    myListCount: data?.count ?? 0,
    isLoadingMyLists: isLoading,
  };
}
