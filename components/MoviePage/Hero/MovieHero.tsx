import { notFound } from "next/navigation";
import HeroSection from "./HeroSection";
import { extractDominantColor } from "@/lib/movies/extractDominantColor";
import { getTrailerLink } from "@/lib/movies/getTrailerLink";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSelections } from "@/app/actions/movieActions";
import { Movie } from "@/app/types/movie";

type Props = {
  movie: Movie;
};
export default async function MovieHero({ movie }: Props) {
  if (!movie.id) return notFound();
  const trailerLink = await getTrailerLink(movie.id);

  const color = await extractDominantColor(movie.poster_path);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const { favoriteIds, bookmarkedIds } = userId
    ? await getUserSelections(userId)
    : { favoriteIds: [], bookmarkedIds: [] };

  return (
    <HeroSection
      data={movie}
      color={color}
      trailerLink={trailerLink}
      favoriteIds={favoriteIds}
      bookmarkedIds={bookmarkedIds}
      userId={userId}
    />
  );
}
