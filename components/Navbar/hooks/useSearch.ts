import { fetchSuggestions } from "@/lib/movies/getSearchSuggestions";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDebounce } from "use-debounce";

export function useSearch(onSuccess?: () => void) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [debouncedQuery] = useDebounce(query, 300);

  const { data, isLoading } = useQuery({
    queryKey: ["search-suggestions", debouncedQuery],
    queryFn: () => fetchSuggestions(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    staleTime: 1000 * 60,
  });

  const handleSelect = (title: string) => {
    router.push(`/search?q=${encodeURIComponent(title)}`);
    onSuccess?.();
    setQuery("");
  };

  const handleSearch = () => {
    if (!query) return;
    router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    onSuccess?.();
    setQuery("");
  };

  const uniqueResults = data?.results
    .filter((movie) => movie.vote_count > 10)
    .filter(
      (movie, index, self) =>
        index === self.findIndex((m) => m.title === movie.title),
    )
    .slice(0, 5);

  return {
    query,
    setQuery,
    handleSelect,
    handleSearch,
    uniqueResults,
    isLoading,
  };
}
