import { Review } from "@/app/types/reviews";
import { getMovieReviews } from "@/lib/movies/getMovieReviews";
import ReviewCard from "./ReviewCard";

type Props = {
  id: number;
};

export default async function Reviews({ id }: Props) {
  const reviews = await getMovieReviews(id);
  const results = reviews.results ?? [];

  return (
    <section className="space-y-5">
      <h2 className="mb-4 text-3xl font-bold">Reviews</h2>

      {results.length === 0 ? (
        <p className="text-muted-foreground">No reviews found.</p>
      ) : (
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
