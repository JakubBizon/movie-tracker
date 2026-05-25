"use client";
import { Review } from "@/app/types/reviews";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Props = {
  review: Review;
};

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString("pl-PL", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
export default function ReviewCard({ review }: Props) {
  const [expanded, setExpanded] = useState(false);
  const isLongReview = review.content.length > 300;
  return (
    <Card className="p-4">
      <h3 className="text-lg font-semibold">{review.author}</h3>
      <p className="mb-2 text-sm text-gray-600">
        {formatDate(review.created_at)}
      </p>
      <p
        className={cn(
          "whitespace-pre-line",
          expanded ? "line-clamp-none" : "line-clamp-4",
        )}
      >
        {review.content}
      </p>

      {isLongReview && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm font-medium text-blue-600 hover:underline"
        >
          {expanded ? "Show less" : "Show more"}
        </button>
      )}
    </Card>
  );
}
