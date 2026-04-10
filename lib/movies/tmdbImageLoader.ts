export const tmdbImageLoader = ({
  src,
  width,
}: {
  src: string;
  width: number;
}) => {
  let size = "w300";
  if (width > 1280) size = "original";
  else if (width > 780) size = "w1280";
  else if (width > 342) size = "w780";
  else size = "w342";

  return `https://image.tmdb.org/t/p/${size}${src}`;
};
