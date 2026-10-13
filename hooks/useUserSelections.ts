import { getUserSelections } from "@/app/actions/movieActions";
import { useQuery } from "@tanstack/react-query";

export type UserSelections = {
  favoriteIds: string[];
  bookmarkedIds: string[];
};

export const userSelectionsQueryKey = (userId?: string) =>
  ["user-selections", userId] as const;

export function useUserSelections(
  userId?: string,
  initialData?: UserSelections,
) {
  return useQuery({
    queryKey: userSelectionsQueryKey(userId),
    queryFn: () => getUserSelections(),
    initialData,
    staleTime: 1000 * 60 * 5,
    enabled: !!userId,
  });
}
