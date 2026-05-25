export type Review = {
  author: string;
  content: string;
  created_at: string;
};

export type ReviewResponse = {
  id: number;
  resutls: Review[];
};
