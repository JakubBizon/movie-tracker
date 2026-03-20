"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Genre } from "@/app/types/movie";
import { Button } from "../ui/button";
import { useState } from "react";
import SelectSort from "./SelectSort";
import { DatePicker } from "./DatePicker";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { format, parseISO } from "date-fns";

type Props = {
  genres: Genre[];
};
export default function Filters({ genres }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [isVisible, setIsVisible] = useState(false);
  const initialFrom = searchParams.get("from");
  const initialTo = searchParams.get("to");
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

  const currentGenresString = selectedGenres.join(",");
  const currentFromStr = fromDate ? format(fromDate, "yyyy-MM-dd") : "";
  const currentToStr = toDate ? format(toDate, "yyyy-MM-dd") : "";

  const isChanged =
    currentFromStr !== initialFrom ||
    currentToStr !== initialTo ||
    currentGenresString !== initialGenres;

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
  };
  return (
    <form onSubmit={handleSearch} className="w-xs pr-4 space-y-4">
      <Card>
        <div
          onClick={() => setIsVisible(!isVisible)}
          className="flex flex-row justify-between items-center text-lg px-4"
        >
          <span className="font-bold">Sort</span>
          {isVisible ? <ChevronDown /> : <ChevronRight />}
        </div>
        {isVisible && (
          <>
            <hr className="border-border" />
            <div className="px-4 flex flex-col w-full space-y-4">
              <h2>Sort By</h2>
              <SelectSort />
            </div>
          </>
        )}
      </Card>

      <Card className="flex flex-col">
        <div className=" flex items-center px-4">
          <h1 className="text-lg font-bold">Filters</h1>
        </div>
        <hr className="border-border" />

        <div className="px-4  py-2 space-y-4">
          <h2>Release dates</h2>
          <div className="flex justify-between items-center">
            <p className="text-neutral-400 font-bold">from</p>
            <DatePicker date={fromDate} onChange={setFromDate} />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-neutral-400 font-bold">to</p>
            <DatePicker date={toDate} onChange={setToDate} />
          </div>
        </div>
        <hr className="border-border" />

        <div className="px-4 py-2 space-y-3">
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
      </Card>

      <Button
        className={`w-full ${isChanged ? "bg-primary text-white hover:bg-primary/90" : "bg-neutral-200 text-neutral-400 cursor-not-allowed border-none"} text-xl rounded-full py-6`}
        variant="outline"
        type="submit"
        disabled={!isChanged}
      >
        Search
      </Button>
    </form>
  );
}
