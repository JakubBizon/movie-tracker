import { cn } from "@/lib/utils";
import { ArrowDown, ArrowUp } from "lucide-react";

type Props = {
  diff: number;
};

export default function RatingDiffBadge({ diff }: Props) {
  const rounded = Math.round(diff * 10) / 10;
  if (rounded === 0)
    return (
      <p className="text-sm text-muted-foreground flex items-center justify-center">
        — Same
      </p>
    );
  const isPositive = rounded > 0;

  return (
    <div className="flex items-center justify-center gap-1">
      {isPositive ? (
        <ArrowUp className="w-4 h-4 text-green-500" />
      ) : (
        <ArrowDown className="w-4 h-4 text-red-500" />
      )}
      <span
        className={cn(
          "text-sm",
          isPositive ? "text-green-500" : "text-red-500",
        )}
      >
        {isPositive ? "+" : ""}
        {rounded}
      </span>
    </div>
  );
}
