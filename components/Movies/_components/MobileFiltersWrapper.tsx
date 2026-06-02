import FiltersDialog from "./FiltersDialog";
import SortDropdown from "./SortDropdown";
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
      <SortDropdown />
      <FiltersDialog
        genres={genres}
        defaultFrom={defaultFrom}
        defaultTo={defaultTo}
      />
    </>
  );
}
