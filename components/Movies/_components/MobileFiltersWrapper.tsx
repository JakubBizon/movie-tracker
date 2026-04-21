import FiltersDialog from "./FiltersDialog";
import SortDialog from "./SortDialog";
import { getMovieGenres } from "@/lib/movies/getMovieGenres";

type Props = {
  defaultFrom?: Date;
  defaultTo?: Date;
};

export default async function MobileFiltersWrapper({
  defaultFrom,
  defaultTo,
}: Props) {
  const { genres } = await getMovieGenres();

  return (
    <>
      <SortDialog />
      <FiltersDialog
        genres={genres}
        defaultFrom={defaultFrom}
        defaultTo={defaultTo}
      />
    </>
  );
}
