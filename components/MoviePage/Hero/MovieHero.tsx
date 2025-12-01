import { getMovieDetails } from "@/lib/movies/getMovieDetails";
import { notFound } from "next/navigation";
import HeroSection from "./HeroSection";
import { extractDominantColor } from "@/lib/movies/extractDominantColor";

type Props = {
  id: number | null;
};
export default async function MovieHero({ id }: Props) {
  if (!id) return notFound();
  const data = await getMovieDetails(id);

  const color = await extractDominantColor(data.poster_path);

  return <HeroSection data={data} color={color} />;
}
