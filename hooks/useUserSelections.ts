import { getUserSelections } from "@/app/actions/movieActions";
import { useQuery } from "@tanstack/react-query";

export type UserSelections = {
  favoriteIds: string[];
  bookmarkedIds: string[];
};

export function useUserSelections(
  userId?: string,
  initialData?: UserSelections,
) {
  return useQuery({
    queryKey: ["user-selections", userId],
    queryFn: async () => {
      if (!userId) {
        return {
          favoriteIds: [],
          bookmarkedIds: [],
        };
      }
      return await getUserSelections(userId);
    },
    enabled: !!userId,
    initialData:
      userId && initialData
        ? initialData
        : { favoriteIds: [], bookmarkedIds: [] },
    staleTime: 1000 * 60 * 5,
  });
}
