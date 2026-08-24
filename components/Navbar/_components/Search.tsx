"use client";

import { SearchIcon, XIcon } from "lucide-react";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useRef } from "react";
import { Movie } from "@/app/types/movie";
import { useSearch } from "../hooks/useSearch";
import { cn } from "@/lib/utils";
import useRecentSearches from "../hooks/useRecentSearches";

export function Search() {
  const inputRef = useRef<HTMLInputElement>(null);
  const { addSearch, removeSearch, recentSearches, clearSearches } =
    useRecentSearches();
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
    activeListLength,
  } = useSearch(addSearch, recentSearches);

  return (
    <div className="relative">
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
                prev < activeListLength - 1 ? prev + 1 : 0,
              );
            }

            if (e.key === "ArrowUp") {
              e.preventDefault();

              if (!isOpen) setIsOpen(true);
              if (!hasSuggestions) return;

              setHighlightedIndex((prev) =>
                prev > 0 ? prev - 1 : activeListLength - 1,
              );
            }

            if (e.key === "Escape") {
              setIsOpen(false);
              setHighlightedIndex(-1);
              inputRef.current?.blur();
            }
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onFocus={() => setIsOpen(true)}
          placeholder="Search movies"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="search-suggestions"
          role="combobox"
        />

        <button
          type="button"
          aria-label="Search"
          onClick={handleSearch}
          disabled={!query}
        >
          <SearchIcon className="cursor-pointer transition-colors hover:text-primary" />
        </button>
      </InputGroup>
      {isOpen && !query && recentSearches.length > 0 && (
        <div className="absolute left-0 right-0 w-full top-full z-50 overflow-hidden rounded-md border border-border bg-white shadow-lg dark:bg-slate-900">
          <div className="flex items-center justify-between px-4 py-2 text-sm text-muted-foreground">
            <span>Recent searches</span>
            <button
              type="button"
              onMouseDown={(e) => {
                e.preventDefault();
                clearSearches();
              }}
              className="text-xs hover:text-primary"
            >
              Clear all
            </button>
          </div>

          {recentSearches.map((search, index) => (
            <div
              key={search}
              onMouseEnter={() => setHighlightedIndex(index)}
              className={cn(
                "flex items-center justify-between px-4 w-full py-2 transition-colors",
                highlightedIndex === index
                  ? "bg-slate-100 dark:bg-slate-800"
                  : "bg-transparent",
              )}
            >
              <button
                type="button"
                role="option"
                aria-selected={highlightedIndex === index}
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect(search);
                }}
                className="flex-1 text-left"
              >
                {search}
              </button>

              <button
                type="button"
                onMouseDown={(e) => {
                  e.preventDefault();
                  removeSearch(search);
                }}
                className="ml-2 rounded p-1 text-muted-foreground hover:text-red-500"
                aria-label={`Remove ${search} from recent searches`}
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
      {isOpen && query && (uniqueResults.length > 0 || noResults) && (
        <div className="absolute left-0 right-0 top-full z-50 overflow-hidden rounded-md border border-border bg-white shadow-lg dark:bg-slate-900">
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
