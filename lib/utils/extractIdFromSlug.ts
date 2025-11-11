export const extractIdFromSlug = (slug: string) => {
  const match = slug.match(/-(\d+)$/);
  if (!match) {
    return null;
  }
  const id = parseInt(match[1], 10);
  if (id <= 0) {
    return null;
  }
  return id;
};
