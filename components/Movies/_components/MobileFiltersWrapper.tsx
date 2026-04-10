import { Genre } from "@/app/types/movie";
import FiltersDialog from "./FiltersDialog";
import SortDialog from "./SortDialog";

type Props = {
  genresPromise: Promise<{ genres: Genre[] }>;
  defaultFrom?: Date;
  defaultTo?: Date;
};

export default async function MobileFiltersWrapper({
  genresPromise,
  defaultFrom,
  defaultTo,
}: Props) {
  const { genres } = await genresPromise;

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
