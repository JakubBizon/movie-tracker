import { Review } from "@/app/types/reviews";
import { getMovieReviews } from "@/lib/movies/getMovieReviews";
import ReviewCard from "./ReviewCard";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AddReviewForm from "./AddReviewForm";
import { Movie } from "@/app/types/movie";
import { getLocalMovieReviews } from "@/lib/movies/getLocalMovieReviews";
import { mapLocalReviewsToTmdbShape } from "@/lib/movies/mapLocalReviewsToTmdbShape";

type Props = {
  movie: Movie;
};

export default async function Reviews({ movie }: Props) {
  const movieId = movie.id;
  const [tmdbData, localReviews, session] = await Promise.all([
    getMovieReviews(movieId),
    getLocalMovieReviews(movieId.toString()),
    await auth.api.getSession({
      headers: await headers(),
    }),
  ]);

  const userId = session?.user.id;
  const currentUserReview = localReviews.find((r) => r.user.id === userId);

  const mappedLocal = mapLocalReviewsToTmdbShape(localReviews);
  const results = [...mappedLocal, ...tmdbData.results].filter(
    (r) => !(userId && r.id === `local-${userId}-${movieId}`),
  );
  return (
    <section className="space-y-5">
      <h2 className="mb-4 text-3xl font-bold">Reviews</h2>
      {results.length === 0 && !!currentUserReview && (
        <p className="text-muted-foreground">No reviews found.</p>
      )}
      <AddReviewForm
        userId={userId}
        movieId={movieId.toString()}
        title={movie.title}
        existingReview={currentUserReview?.review.review}
      />
      {results.length != 0 && (
        <ul className="space-y-4">
          {results.map((review: Review) => (
            <li key={`${review.author}-${review.created_at}`}>
              <ReviewCard review={review} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
