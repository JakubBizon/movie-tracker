export const SORT_OPTIONS = [
  "added_desc",
  "added_asc",
  "rating_desc",
  "rating_asc",
  "release_desc",
  "release_asc",
  "title_asc",
  "title_desc",
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number];
