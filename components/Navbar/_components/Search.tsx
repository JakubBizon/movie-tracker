"use client";
import { SearchIcon } from "lucide-react";
import { InputGroup, InputGroupInput } from "@/components/ui/input-group";
import { useRef, useState } from "react";
import { Movie } from "@/app/types/movie";
import { useSearch } from "../hooks/useSearch";

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    query,
    setQuery,
    handleSelect,
    handleSearch,
    uniqueResults,
    isLoading,
  } = useSearch(() => setIsOpen(false));

  return (
    <div className="px-5 xl:px-0 relative">
      <InputGroup className="px-2 dark:glass bg-white border-primary dark:border-border/50 dark:text-muted-foreground text-black focus-visible:ring-primary w-full">
        <InputGroupInput
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
            if (e.key === "Escape") {
              setIsOpen(false);
              inputRef.current?.blur();
            }
          }}
          onBlur={() => setTimeout(() => setIsOpen(false), 150)}
          onFocus={() => query.length > 0 && setIsOpen(true)}
          placeholder="Search movies"
        />

        <button onClick={handleSearch}>
          <SearchIcon className="cursor-pointer hover:text-primary transition-colors" />
        </button>
      </InputGroup>
      {isOpen && query && (
        <div className="absolute max-w-2xl top-full left-0 right-0 dark:bg-slate-900 bg-white border border-border rounded-md shadow-lg z-50 overflow-hidden">
          {isLoading && (
            <div className="px-4 py-3 text-sm text-muted-foreground">
              Searching...
            </div>
          )}

          {uniqueResults?.map((item: Movie) => (
            <button
              key={item.id}
              onClick={() => handleSelect(item.title)}
              className="w-full px-4 flex items-center gap-3  py-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              {item.title}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
