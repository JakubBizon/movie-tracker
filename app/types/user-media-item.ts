export type MediaItemType = "favorite" | "watchlist";

export interface UserMediaItem {
  userId: string;
  movieId: string;
  title: string;
  posterPath: string | null;
  voteAverage: string | null;
  type: MediaItemType;
  releaseDate: string | null;
}
