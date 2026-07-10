import { MyRatingsMovieDetails } from "@/app/types/my-ratings-movie-details";
import { slugify } from "@/lib/utils/slugify";
import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import RatingDiffBadge from "./RatingDiffBadge";

type Props = {
  movie: MyRatingsMovieDetails;
};

export default function MyRatingsMovieCard({ movie }: Props) {
  const href = `/movie/${slugify(movie.title, Number(movie.movieId))}`;

  return (
    <div className="rounded-lg border bg-slate-50  dark:bg-card">
      <div className="flex gap-3 md:gap-6 h-full ">
        <Link href={href} className="shrink-0 w-22 md:w-25">
          <Image
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "/placeholder.png"
            }
            alt={movie.title}
            width={100}
            height={150}
            className="w-full h-full rounded-l-lg object-cover aspect-2/3"
          />
        </Link>

        <div className="flex justify-between items-center flex-col xs:flex-row w-full p-3 md:p-4">
          <Link href={href}>
            <h3 className="line-clamp-2 text-sm font-semibold text-gray-800 dark:text-white md:text-lg">
              {movie.title}
            </h3>
          </Link>

          <div className="flex justify-start xs:justify-center xs:items-center gap-4">
            <div className="flex flex-col items-center">
              <p className="xs:text-2xl text-lg">{movie.rating}</p>
              <span>You</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2">
                <Star className="xs:w-5 xs:h-5 w-4 h-4 " />
                <p className="xs:text-2xl text-lg">
                  {movie.vote_average.toFixed(1)}
                </p>
              </div>
              <span>Global</span>
            </div>
            <RatingDiffBadge diff={movie.rating - movie.vote_average} />
          </div>
        </div>
      </div>
    </div>
  );
}
