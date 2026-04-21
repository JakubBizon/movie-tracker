import Filters from "./Filters";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";

type Props = {
  defaultFrom?: Date;
  defaultTo?: Date;
};

export default async function FiltersWrapper({
  defaultFrom,
  defaultTo,
}: Props) {
  const { genres } = await getMovieGenres();

  return (
    <Filters genres={genres} defaultFrom={defaultFrom} defaultTo={defaultTo} />
  );
}
