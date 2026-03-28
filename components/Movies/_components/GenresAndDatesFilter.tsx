"use client";

import { Card } from "@/components/ui/card";
import { Genre } from "@/app/types/movie";
import { Button } from "@/components/ui/button";
import { DatePicker } from "./DatePicker";

import { useMovieFilters } from "../hooks/useMovieFilters";

type Props = {
  genres: Genre[];
  onSubmit?: () => void;
};

export default function GenresAndDatesFilter({ genres, onSubmit }: Props) {
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
  } = useMovieFilters({ onSubmit });

  return (
    <form onSubmit={handleSearch} className="w-full space-y-4">
      <Card className="flex flex-col">
        <div className="flex items-center justify-between px-4">
          <h1 className="text-lg font-bold">Filters</h1>

          {checkIfFiltersApplied() && (
            <button
              type="button"
              className="cursor-pointer text-sm "
              onClick={clearFilters}
            >
              Clear filters
            </button>
          )}
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
            {genres.map((genre: Genre) => {
              const isActive = selectedGenres.includes(genre.id);
              return (
                <button
                  type="button"
                  key={genre.id}
                  onClick={() => toggleGenre(genre.id)}
                  className={`px-3 py-1 text-sm rounded-full border transition-colors cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground border-primary"
                      : "border-border hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {genre.name}
                </button>
              );
            })}
          </div>
        </div>
        <hr className="border-border" />

        <div className="px-4 space-y-3 flex items-center flex-col">
          <Button
            type="submit"
            disabled={!isChanged}
            className="w-full cursor-pointer"
          >
            Apply Filters
          </Button>
        </div>
      </Card>
    </form>
  );
}
