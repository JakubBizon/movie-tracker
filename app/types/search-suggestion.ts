import { Movie } from "./movie";

export interface SearchSuggestion {
  page: number;
  results: Movie[];
  total_results: number;
}
