"use client";
import { format, parseISO } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";

type UseMovieFiltersProps = {
  onSubmit?: () => void;
};

export function useMovieFilters({ onSubmit }: UseMovieFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFrom = searchParams.get("from") || "";
  const initialTo = searchParams.get("to") || "";
  const initialGenres = searchParams.get("genres") || "";

  const [fromDate, setFromDate] = useState<Date | undefined>(
    initialFrom ? parseISO(initialFrom) : undefined,
  );
  const [toDate, setToDate] = useState<Date | undefined>(
    initialTo ? parseISO(initialTo) : undefined,
  );
  const [selectedGenres, setSelectedGenres] = useState(
    searchParams.get("genres")?.split(",").map(Number).filter(Boolean) || [],
  );

  const currentFromStr = fromDate ? format(fromDate, "yyyy-MM-dd") : "";
  const currentToStr = toDate ? format(toDate, "yyyy-MM-dd") : "";
  const currentGenresString = [...selectedGenres]
    .sort((a, b) => a - b)
    .join(",");
  const sortedInitialGenres = initialGenres
    ? initialGenres
        .split(",")
        .map(Number)
        .sort((a, b) => a - b)
        .join(",")
    : "";

  const isChanged =
    currentFromStr !== initialFrom ||
    currentToStr !== initialTo ||
    currentGenresString !== sortedInitialGenres;

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (fromDate) params.set("from", format(fromDate, "yyyy-MM-dd"));
    else params.delete("from");

    if (toDate) params.set("to", format(toDate, "yyyy-MM-dd"));
    else params.delete("to");

    if (selectedGenres.length > 0) {
      params.set("genres", selectedGenres.join(","));
    } else {
      params.delete("genres");
    }
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    onSubmit?.();
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    params.delete("genres");
    params.set("page", "1");
    setFromDate(undefined);
    setToDate(undefined);
    setSelectedGenres([]);
    router.push(`${pathname}?${params.toString()}`);
  };

  const checkIfFiltersApplied = () => {
    const params = new URLSearchParams(searchParams.toString());
    return (
      params.has("from") ||
      params.has("to") ||
      (params.has("genres") && params.get("genres") !== "")
    );
  };

  return {
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    selectedGenres,
    toggleGenre,
    handleSearch,
    clearFilters,
    isChanged,
    checkIfFiltersApplied,
  };
}
