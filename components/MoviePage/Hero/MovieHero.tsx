import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import { notFound } from "next/navigation";
import HeroSection from "./HeroSection";
import { extractDominantColor } from "@/lib/movies/extractDominantColor";
import { getTrailerLink } from "@/lib/movies/getTrailerLink";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserSelections } from "@/app/actions/movieActions";

type Props = {
  id: number | null;
};
export default async function MovieHero({ id }: Props) {
  if (!id) return notFound();
  const data = await getMovieDetails(id);
  const trailerLink = await getTrailerLink(id);

  const color = await extractDominantColor(data.poster_path);
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const userId = session?.user?.id;
  const { favoriteIds, bookmarkedIds } = userId
    ? await getUserSelections(userId)
    : { favoriteIds: [], bookmarkedIds: [] };
  return (
    <HeroSection
      data={data}
      color={color}
      trailerLink={trailerLink}
      initialIsFavorite={favoriteIds.includes(data.id.toString())}
      initialIsBookmarked={bookmarkedIds.includes(data.id.toString())}
    />
  );
}
