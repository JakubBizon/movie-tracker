export interface Genre {
  id: number;
  name: string;
}
export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  overview: string;
  backdrop_path: string;
  runtime?: number;
  genres?: Genre[];
  description: string;
}

export interface TrendingMoviesResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}
