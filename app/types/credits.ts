export interface Cast {
  id: number;
  known_for_deparment: string;
  character: string;
  name: string;
  profile_path: string;
}

export interface Credits {
  cast: Cast[];
}
