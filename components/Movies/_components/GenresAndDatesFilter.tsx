"use client";

import { Card } from "@/components/ui/card";
import { Genre } from "@/app/types/movie";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DatePicker";
import { useMovieFilters } from "../hooks/useMovieFilters";
import GenresList from "./GenresList";

type Props = {
  genres: Genre[];
  onSubmit?: () => void;
  defaultFrom?: Date;
  defaultTo?: Date;
};

export default function GenresAndDatesFilter({
  genres,
  onSubmit,
  defaultFrom,
  defaultTo,
}: Props) {
  const {
    handleSearch,
    toggleGenre,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    selectedGenres,
    checkIfFiltersApplied,
    isChanged,
    clearFilters,
  } = useMovieFilters({ onSubmit, defaultFrom, defaultTo });

  return (
    <form onSubmit={handleSearch} className="w-full space-y-4">
      <Card className="flex flex-col">
        <div className="px-4">
          <h1 className="text-lg font-bold">Filters</h1>
        </div>
        <hr className="border-border" />

        <div className="px-4 space-y-4">
          <h2>Release dates</h2>
          <div className="flex justify-between items-center gap-4">
            <p className="text-neutral-400 font-bold w-12">from</p>
            <DatePicker
              date={fromDate}
              onChange={setFromDate}
              disabled={(date: Date) => (toDate ? date > toDate : false)}
            />
          </div>

          <div className="flex justify-between items-center gap-4">
            <p className="text-neutral-400 font-bold w-12">to</p>
            <DatePicker
              date={toDate}
              onChange={setToDate}
              disabled={(date: Date) => (fromDate ? date < fromDate : false)}
            />
          </div>
        </div>
        <hr className="border-border" />

        <div className="px-4 space-y-3">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Genres
          </h2>
          <div className="flex flex-wrap gap-2">
            <GenresList
              genres={genres}
              toggleGenre={toggleGenre}
              selectedGenres={selectedGenres}
            />
          </div>
        </div>
        <hr className="border-border" />

        <div className="px-4 space-y-2 flex flex-col items-center">
          <Button
            type="submit"
            disabled={!isChanged}
            className="w-full cursor-pointer"
          >
            Apply Filters
          </Button>
          {checkIfFiltersApplied() && (
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
        </div>
      </Card>
    </form>
  );
}
