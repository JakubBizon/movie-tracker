import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function SelectSort() {
  return (
    <Select defaultValue="p_desc">
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="p_desc">Popularity Descending</SelectItem>
          <SelectItem value="p_asc">Popularity Ascending</SelectItem>
          <SelectItem value="r_desc">Rating Descending</SelectItem>
          <SelectItem value="r_asc">Rating Ascending</SelectItem>
          <SelectItem value="date_desc">Release Date Descending</SelectItem>
          <SelectItem value="date_asc">Release Date Ascending</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
