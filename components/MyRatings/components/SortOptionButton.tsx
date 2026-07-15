"use client";

import { Button } from "@/components/ui/button";
import { RatingsSort } from "@/hooks/MyRatings/useMyRatings";
import { cn } from "@/lib/utils";

type Props = {
  value: RatingsSort;
  label: string;
  active: boolean;
  onClick: (value: RatingsSort) => void;
};

export default function SortOptionButton({
  value,
  label,
  active,
  onClick,
}: Props) {
  return (
    <Button
      variant={active ? "default" : "ghost"}
      size="sm"
      className={cn(
        "rounded-full",
        active && "bg-indigo-500 text-white hover:bg-indigo-400",
      )}
      onClick={() => onClick(value)}
    >
      {label}
    </Button>
  );
}
