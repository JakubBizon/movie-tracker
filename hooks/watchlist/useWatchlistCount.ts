import { useQuery } from "@tanstack/react-query";

export default function useWatchlistCount(enabled: boolean) {
  return useQuery({
    queryKey: ["bookmarks", "count"],
    queryFn: async () => {
      const res = await fetch("/api/watchlist/count");
      if (!res.ok) throw new Error("Failed to fetch count");
      return res.json() as Promise<{ count: number }>;
    },
    enabled: enabled,
    refetchOnWindowFocus: true,
  });
}
