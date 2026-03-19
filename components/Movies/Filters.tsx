"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "../ui/card";
import { Genre } from "@/app/types/movie";
import { Button } from "../ui/button";
import { useState } from "react";
import SelectSort from "./SelectSort";

type Props = {
  genres: Genre[];
};
export default function Filters({ genres }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className="w-xs pr-4 space-y-4">
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
            <input type="date" className="border rounded-md px-2 py-2" />
          </div>

          <div className="flex justify-between items-center">
            <p className="text-neutral-400 font-bold">to</p>
            <input
              type="date"
              placeholder=""
              className="border rounded-md px-2 py-2"
            />
          </div>
        </div>
        <hr className="border-border" />

        <div className="px-4 py-2 space-y-3">
          <h2 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
            Genres
          </h2>
          <div className="flex flex-wrap gap-2">
            {genres.map((genre: Genre) => (
              <button
                key={genre.id}
                className="px-3 py-1 text-sm rounded-full border border-border hover:bg-accent hover:text-accent-foreground transition-colors cursor-pointer"
              >
                {genre.name}
              </button>
            ))}
          </div>
        </div>
      </Card>

      <Button
        className="w-full text-xl bg-primary text-white rounded-full py-6"
        variant="outline"
      >
        Search
      </Button>
    </div>
  );
}
