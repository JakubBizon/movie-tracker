import { getMovieCast } from "@/lib/movies/getMovieCast";
import { notFound } from "next/navigation";
import CastSection from "./CastSection";
type CastProps = {
  id: number | null;
};
export default async function Cast({ id }: CastProps) {
  if (!id) return notFound();
  const castData = await getMovieCast(id);
  return <CastSection castData={castData} limit={10} />;
}
