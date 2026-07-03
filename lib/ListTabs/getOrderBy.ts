import { bookmarks, favorites } from "@/app/db/schema";
import { SortOption } from "@/app/types/list-tabs-sort-options";
import { asc, desc } from "drizzle-orm";

export function getOrderBy(
  table: typeof bookmarks | typeof favorites,
  sort: SortOption,
) {
  switch (sort) {
    case "added_asc":
      return asc(table.createdAt);
    case "rating_desc":
      return desc(table.voteAverage);
    case "rating_asc":
      return asc(table.voteAverage);
    case "release_desc":
      return desc(table.releaseDate);
    case "release_asc":
      return asc(table.releaseDate);
    case "title_asc":
      return asc(table.title);
    case "title_desc":
      return desc(table.title);
    case "added_desc":
    default:
      return desc(table.createdAt);
  }
}
