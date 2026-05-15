"use client";

import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useRef } from "react";
import { Movie } from "@/app/types/movie";
import { useSearch } from "../hooks/useSearch";
import { cn } from "@/lib/utils";

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);

  const {
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
  } = useSearch();

  return (
    <div className="relative px-5 xl:px-0">
      <InputGroup className="w-full border-primary bg-white px-2 text-black focus-visible:ring-primary dark:border-border/50 dark:bg-slate-800 dark:text-white">
        <InputGroupInput
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setHighlightedIndex(-1);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();

              if (selectHighlighted()) return;

              handleSearch();
              setIsOpen(false);
            }

            if (e.key === "ArrowDown") {
              e.preventDefault();

              if (!isOpen) setIsOpen(true);
              if (!hasSuggestions) return;

              setHighlightedIndex((prev) =>
                prev < uniqueResults.length - 1 ? prev + 1 : 0,
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();

              if (!isOpen) setIsOpen(true);
              if (!hasSuggestions) return;

              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : uniqueResults.length - 1,
              );
            }

            if (e.key === "Escape") {
              setIsOpen(false);
              setHighlightedIndex(-1);
              inputRef.current?.blur();
            }
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Search movies"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          role="combobox"
        />

        <button type="button" onClick={handleSearch} disabled={!query}>
          <SearchIcon className="cursor-pointer transition-colors hover:text-primary" />
        </button>
      </InputGroup>

      {isOpen && query && (uniqueResults.length > 0 || noResults) && (
        <div
          id="search-suggestions"
          role="listbox"
          className="absolute left-0 right-0 top-full z-50 max-w-2xl overflow-hidden rounded-md border border-border bg-white shadow-lg dark:bg-slate-900"
        >
          {uniqueResults.map((item: Movie, index: number) => (
            <button
              type="button"
              key={item.id}
              role="option"
              aria-selected={highlightedIndex === index}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(item.title);
                setIsOpen(false);
                setHighlightedIndex(-1);
              }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2 text-left transition-colors",
                highlightedIndex === index
                  ? "bg-slate-100 dark:bg-slate-800"
                  : "bg-transparent",
              )}
            >
              {item.title}
            </button>
          ))}

          {noResults && (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              No results
            </div>
          )}
        </div>
      )}
    </div>
  );
}
