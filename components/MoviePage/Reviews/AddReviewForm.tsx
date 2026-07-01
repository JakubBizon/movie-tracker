"use client";

import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MessageSquarePlus, Pencil } from "lucide-react";
import ExistingReviewCard from "./ExistingReviewCard";
import { useAddReviewForm } from "@/hooks/MoviePage/useAddReviewForm";
import AuthDialog from "../Hero/_components/AuthDialog";
import { useState } from "react";

type Props = {
  userId?: string;
  movieId: string;
  title: string;
  existingReview?: string;
};

const MAX_LENGTH = 2400;

export default function AddReviewForm({
  userId,
  movieId,
  title,
  existingReview,
}: Props) {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const {
    hasReview,
    isEditingMode,
    register,
    errors,
    isSubmitting,
    isDirty,
    content,
    onSubmit,
    handleEditStart,
    handleCancel,
  } = useAddReviewForm(userId, movieId, title, existingReview, () =>
    setIsAuthOpen(true),
  );
  if (!isEditingMode) {
    return (
      <ExistingReviewCard
        onEditStart={() => handleEditStart()}
        existingReview={existingReview}
      />
    );
  }
  return (
    <>
      <form onSubmit={onSubmit} className="space-y-2">
        <Card className="px-0 bg-slate-50 dark:bg-card">
          <CardTitle className="px-6 flex gap-3 items-center">
            {hasReview ? <Pencil /> : <MessageSquarePlus />}
            {hasReview ? "Edit your review" : "Add a new review"}
          </CardTitle>
          <CardContent>
            <Textarea
              maxLength={MAX_LENGTH}
              className="resize-none h-32"
              {...register("content")}
            />
          </CardContent>
          <CardFooter className="flex justify-between items-center text-sm">
            <p className="text-destructive text-sm">
              {errors.content && errors.content.message}
            </p>
            <div className="flex gap-4 items-center">
              <span
                aria-live="polite"
                className="text-muted-foreground text-sm"
              >
                {content.length}/{MAX_LENGTH}
              </span>
              {hasReview && (
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => handleCancel()}
                >
                  Cancel
                </Button>
              )}
              <Button
                type="submit"
                disabled={isSubmitting || (hasReview && !isDirty)}
              >
                {isSubmitting ? "..." : hasReview ? "Update" : "Add"}
              </Button>
            </div>
          </CardFooter>
        </Card>
      </form>

      <AuthDialog
        open={isAuthOpen}
        onOpenChange={setIsAuthOpen}
        type="review"
      />
    </>
  );
}
