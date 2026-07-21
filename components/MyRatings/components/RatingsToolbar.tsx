import { RatingsSort } from "@/hooks/MyRatings/useMyRatings";
import SortOptionButton from "./SortOptionButton";

type Props = {
  moviesCount: number;
  sort: RatingsSort;
  onSortChange: (value: RatingsSort) => void;
};

const sortOptions: Array<{ value: RatingsSort; label: string }> = [
  { value: "recent", label: "Recent" },
  { value: "highest", label: "Highest first" },
  { value: "lowest", label: "Lowest first" },
];

export default function RatingsToolbar({
  moviesCount,
  sort,
  onSortChange,
}: Props) {
  return (
    <div className="flex flex-col py-4">
      <div className="flex justify-between gap-4 flex-wrap">
        <h2 className="text-xl">{moviesCount} rated movies</h2>
        <div className="flex flex-wrap gap-2">
          {sortOptions.map((option) => (
            <SortOptionButton
              key={option.value}
              value={option.value}
              label={option.label}
              active={sort === option.value}
              onClick={onSortChange}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
