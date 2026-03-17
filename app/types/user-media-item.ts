export type MediaItemType = "favorite" | "bookmark";

export interface UserMediaItem {
  userId: string;
  movieId: string;
  title: string;
  posterPath: string | null;
  voteAverage: string | null;
  type: MediaItemType;
}
