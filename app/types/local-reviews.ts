export type LocalReviewRow = {
  user: {
    id: string;
    name: string;
    image: string | null;
  };
  review: {
    userId: string;
    movieId: string;
    review: string;
    title: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
};
