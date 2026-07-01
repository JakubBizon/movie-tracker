import { LocalReviewRow } from "@/app/types/local-reviews";
import { Review } from "@/app/types/reviews";

export function mapLocalReviewsToTmdbShape(
  localReviews: LocalReviewRow[],
): Review[] {
  return localReviews.map((local) => ({
    author: local.user.name ?? "Anonymous",
    author_details: {
      name: local.user.name ?? "",
      username: local.user.name ?? "",
      avatar_path: local.user.image ? local.user.image : null,
      rating: null,
    },
    content: local.review.review,
    created_at: (local.review.createdAt ?? new Date()).toISOString(),
    updated_at: (local.review.updatedAt ?? new Date()).toISOString(),
    id: `local-${local.review.userId}-${local.review.movieId}`,
  }));
}
