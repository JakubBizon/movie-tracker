"use client";
import { useEffect, useState } from "react";

const RECENT_SEARCHES_KEY = "recent-searches";

const useRecentSearches = () => {
  const localStorageInit = () => {
    try {
      const storedSearches = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (!storedSearches) {
        return [];
      }
      const parsedSearches = JSON.parse(storedSearches);
      if (
        Array.isArray(parsedSearches) &&
        parsedSearches.every((item) => typeof item === "string")
      ) {
        return parsedSearches;
      }
      return [];
    } catch (error) {
      console.error("Failed to load recent searches from localStorage", error);
      return [];
    }
  };

  const [recentSearches, setRecentSearches] = useState<string[]>(() =>
    localStorageInit(),
  );

  useEffect(() => {
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(recentSearches));
  }, [recentSearches]);

  const addSearch = (newSearch: string) => {
    const trimmed = newSearch.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== trimmed.toLowerCase(),
      );
      return [trimmed, ...filtered].slice(0, 5);
    });
  };

  const removeSearch = (search: string) => {
    const trimmed = search.trim();
    if (!trimmed) return;

    setRecentSearches((prev) =>
      prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase()),
    );
  };

  const clearSearches = () => {
    setRecentSearches([]);
  };
  return {
    addSearch,
    removeSearch,
    recentSearches,
    clearSearches,
  };
};

export default useRecentSearches;
