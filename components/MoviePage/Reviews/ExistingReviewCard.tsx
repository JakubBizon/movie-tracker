import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Pencil } from "lucide-react";

type Props = {
  onEditStart: () => void;
  existingReview?: string;
};

export default function ExistingReviewCard({
  onEditStart,
  existingReview,
}: Props) {
  return (
    <Card className="p-4 border border-muted-foreground/10 bg-slate-50 dark:bg-card">
      <div className="flex justify-between items-start gap-3">
        <h3 className="text-lg font-semibold">Your review</h3>
        <Button type="button" variant="outline" size="sm" onClick={onEditStart}>
          <Pencil className="size-4" />
          Edit
        </Button>
      </div>
      <p className="whitespace-pre-line wrap-break-word mt-2">
        {existingReview}
      </p>
    </Card>
  );
}
