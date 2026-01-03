export interface Results {
  key: string;
  type: string;
  site: string;
}

export interface Trailer {
  results: Results[];
  id: number;
}
