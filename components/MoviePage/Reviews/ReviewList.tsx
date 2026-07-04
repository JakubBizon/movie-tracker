"use client";

import { Review } from "@/app/types/reviews";
import ReviewCard from "./ReviewCard";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";

type Props = {
  results: Review[];
};
const INITIAL_COUNT = 3;

export default function ReviewList({ results }: Props) {
  const [showAll, setShowAll] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const visible = showAll ? results : results.slice(0, INITIAL_COUNT);

  const handleToggle = () => {
    const willShowAll = !showAll;
    setShowAll(willShowAll);

    if (!willShowAll && containerRef.current) {
      requestAnimationFrame(() => {
        containerRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  };

  return (
    <div ref={containerRef} className="flex flex-col justify-center gap-4">
      <ul className="space-y-4">
        {visible.map((review: Review) => (
          <li key={`${review.author}-${review.created_at}`}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
      {results.length > INITIAL_COUNT && (
        <Button
          onClick={handleToggle}
          className="mx-auto flex items-center gap-1 rounded-full border border-border px-4 py-2 text-sm text-white font-medium dark:text-foreground transition-colors hover:bg-indigo-400"
        >
          {showAll ? "Hide" : "Show all reviews"}
        </Button>
      )}
    </div>
  );
}
