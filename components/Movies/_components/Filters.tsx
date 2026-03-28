"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Genre } from "@/app/types/movie";
import { useState } from "react";
import SelectSort from "./SelectSort";
import GenresAndDatesFilter from "./GenresAndDatesFilter";

type Props = {
  genres: Genre[];
};
export default function Filters({ genres }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="w-full space-y-4">
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

      <GenresAndDatesFilter genres={genres} />
    </div>
  );
}
