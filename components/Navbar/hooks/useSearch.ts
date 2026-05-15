import { fetchSuggestions } from "@/lib/movies/getSearchSuggestions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearch() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [debouncedQuery] = useDebounce(query, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["search-suggestions", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60,
    placeholderData: (previousData) => previousData,
  });

  const uniqueResults =
    data?.results
      .filter((movie) => movie.vote_count > 10)
      .filter(
        (movie, index, self) =>
          index === self.findIndex((m) => m.title === movie.title),
      )
      .slice(0, 5) ?? [];

  const closeSuggestions = () => {
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleSelect = (title: string) => {
    setQuery(title);
    closeSuggestions();
    router.push(`/search?q=${encodeURIComponent(title)}`);
  };

  const handleSearch = () => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;
    setQuery(trimmedQuery || "");
    closeSuggestions();
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const selectHighlighted = () => {
    if (
      !isOpen ||
      highlightedIndex < 0 ||
      highlightedIndex >= uniqueResults.length
    ) {
      return false;
    }
    handleSelect(uniqueResults[highlightedIndex].title);
    return true;
  };

  const hasQuery = debouncedQuery.length > 0;
  const hasSuggestions = uniqueResults.length > 0;
  const hasResults = uniqueResults.length > 0;
  const noResults = hasQuery && !isLoading && !hasResults;

  return {
    query,
    setQuery,
    handleSelect,
    handleSearch,
    selectHighlighted,
    uniqueResults,
    hasSuggestions,
    noResults,
    isOpen,
    setIsOpen,
    highlightedIndex,
    setHighlightedIndex,
  };
}
