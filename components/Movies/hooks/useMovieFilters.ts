"use client";
import { format, isValid, parseISO } from "date-fns";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

type UseMovieFiltersProps = {
  onSubmit?: () => void;
  defaultFrom?: Date;
  defaultTo?: Date;
};

export function safeParse(s: string | null): Date | undefined {
  if (!s) return undefined;
  const d = parseISO(s);
  return isValid(d) ? d : undefined;
}

export function useMovieFilters({
  onSubmit,
  defaultFrom,
  defaultTo,
}: UseMovieFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const initialFrom = searchParams.get("from") || "";
  const initialTo = searchParams.get("to") || "";
  const initialGenres = searchParams.get("genres") || "";

  const parsedGenres = Array.from(
    new Set(
      initialGenres
        .split(",")
        .map(Number)
        .filter((n) => Number.isInteger(n) && n > 0),
    ),
  ).sort((a, b) => a - b);

  const fromDate = safeParse(initialFrom) ?? defaultFrom;
  const toDate = safeParse(initialTo) ?? defaultTo;

  const [pendingFrom, setPendingFrom] = useState<Date | undefined>(fromDate);
  const [pendingTo, setPendingTo] = useState<Date | undefined>(toDate);

  const [selectedGenres, setSelectedGenres] = useState<number[]>(parsedGenres);

  const currentFromStr = pendingFrom ? format(pendingFrom, "yyyy-MM-dd") : "";
  const currentToStr = pendingTo ? format(pendingTo, "yyyy-MM-dd") : "";
  const baseFromStr = fromDate ? format(fromDate, "yyyy-MM-dd") : "";
  const baseToStr = toDate ? format(toDate, "yyyy-MM-dd") : "";

  const currentGenresString = [...selectedGenres]
    .sort((a, b) => a - b)
    .join(",");
  const baseGenresString = parsedGenres.join(",");

  const isChanged =
    currentFromStr !== baseFromStr ||
    currentToStr !== baseToStr ||
    currentGenresString !== baseGenresString;

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());

    if (pendingFrom) params.set("from", format(pendingFrom, "yyyy-MM-dd"));
    else params.delete("from");

    if (pendingTo) params.set("to", format(pendingTo, "yyyy-MM-dd"));
    else params.delete("to");

    if (selectedGenres.length > 0) {
      params.set("genres", currentGenresString);
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
    setPendingFrom(undefined);
    setPendingTo(undefined);
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
    fromDate: pendingFrom,
    setFromDate: setPendingFrom,
    toDate: pendingTo,
    setToDate: setPendingTo,
    selectedGenres,
    toggleGenre,
    handleSearch,
    clearFilters,
    isChanged,
    checkIfFiltersApplied,
  };
}
