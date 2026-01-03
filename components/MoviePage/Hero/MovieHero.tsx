import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import { notFound } from "next/navigation";
import HeroSection from "./HeroSection";
import { extractDominantColor } from "@/lib/movies/extractDominantColor";
import { getTrailerLink } from "@/lib/movies/getTrailerLink";

type Props = {
  id: number | null;
};
export default async function MovieHero({ id }: Props) {
  if (!id) return notFound();
  const data = await getMovieDetails(id);
  const trailerLink = await getTrailerLink(id);

  const color = await extractDominantColor(data.poster_path);

  return <HeroSection data={data} color={color} trailerLink={trailerLink} />;
}
