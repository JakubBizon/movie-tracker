import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import z from "zod";
import { reviewSchema } from "@/lib/zod";
import { addReviewAction } from "@/app/actions/addReviewAction";

export const MAX_LENGTH = 2400;

type ReviewFormValues = z.infer<typeof reviewSchema>;

export function useAddReviewForm(
  userId: string | undefined,
  movieId: string,
  title: string,
  existingReview: string | undefined,
  onAuthRequired: () => void,
) {
  const hasReview = Boolean(existingReview);
  const [isEditingMode, setIsEditingMode] = useState(!hasReview);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<ReviewFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: { content: existingReview ?? "" },
  });

  const content = useWatch({
    control,
    name: "content",
    defaultValue: existingReview ?? "",
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!userId) {
      onAuthRequired();
      return;
    }
    const result = await addReviewAction(userId, movieId, title, data.content);
    if (result.success) {
      toast.success(hasReview ? "Review updated!" : "Review added!");
      setIsEditingMode(false);
    } else {
      toast.error(result.error ?? "Something went wrong");
    }
  });

  const handleEditStart = () => {
    reset({ content: existingReview ?? "" });
    setIsEditingMode(true);
  };

  const handleCancel = () => setIsEditingMode(false);

  return {
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
  };
}
