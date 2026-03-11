import { useQuery } from "@tanstack/react-query";

export default function useCheckRating(movieId: number, enabled: boolean) {
  return useQuery({
    queryKey: ["rating", movieId],
    queryFn: async () => {
      const res = await fetch(`/api/movie/rating?movieId=${movieId}`);
      if (!res.ok) throw new Error("Failed to fetch rating");
      return res.json() as Promise<{ rating: number }>;
    },
    enabled: enabled && !!movieId,
    refetchOnWindowFocus: true,
  });
}
