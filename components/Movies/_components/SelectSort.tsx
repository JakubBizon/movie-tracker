import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSort from "../hooks/useSort";
type Props = {
  onSelect?: () => void;
};
const SORT_OPTIONS = [
  { label: "Popularity Descending", value: "p_desc" },
  { label: "Popularity Ascending", value: "p_asc" },
  { label: "Rating Descending", value: "r_desc" },
  { label: "Rating Ascending", value: "r_asc" },
  { label: "Release Date Descending", value: "date_desc" },
  { label: "Release Date Ascending", value: "date_asc" },
];
export default function SelectSort({ onSelect }: Props) {
  const { currentSort, handleValueChange } = useSort();

  return (
    <Select
      defaultValue={currentSort}
      onValueChange={(value: string) => {
        handleValueChange(value);
        if (onSelect) {
          onSelect();
        }
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="max-w-70">
        <SelectGroup>
          {SORT_OPTIONS.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
