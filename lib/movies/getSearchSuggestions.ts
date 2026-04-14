import { SearchSuggestion } from "@/app/types/search-suggestion";

export async function fetchSuggestions(
  query: string,
): Promise<SearchSuggestion> {
  const res = await fetch(
    `/api/search/suggestions?query=${encodeURIComponent(query)}`,
  );
  if (!res.ok) throw new Error("Failed to fetch suggestions");
  return res.json();
}
