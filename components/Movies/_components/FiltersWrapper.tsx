import { Genre } from "@/app/types/movie";
import Filters from "./Filters";

type Props = {
  genresPromise: Promise<{ genres: Genre[] }>;
  defaultFrom?: Date;
  defaultTo?: Date;
};

export default async function FiltersWrapper({
  genresPromise,
  defaultFrom,
  defaultTo,
}: Props) {
  const { genres } = await genresPromise;
  return (
    <Filters genres={genres} defaultFrom={defaultFrom} defaultTo={defaultTo} />
  );
}
