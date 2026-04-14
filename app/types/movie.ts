import { Trailer } from "./trailer";

export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  runtime?: number;
  genres?: Genre[];
  description: string;
}
export interface HeroMovie extends Movie {
  isFavorite: boolean;
  isBookmarked: boolean;
  trailer: Trailer;
}

export interface TrendingMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
