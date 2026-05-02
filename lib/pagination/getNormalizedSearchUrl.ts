interface SearchUrlParams {
  q?: string;
  page?: string;
}

interface NormalizedSearchUrlResult {
  currentPage: number;
  normalizedUrl: string;
  shouldRedirect: boolean;
}

export function normalizePage(page?: string): number {
  const parsed = Number(page);

  if (!Number.isInteger(parsed) || parsed < 1) {
    return 1;
  }

  return parsed;
}

export function getNormalizedSearchUrl({
  q,
  page,
}: SearchUrlParams): NormalizedSearchUrlResult {
  const currentPage = normalizePage(page);
  const params = new URLSearchParams();

  if (q) {
    params.set("q", q);
  }

  if (currentPage > 1) {
    params.set("page", String(currentPage));
  }

  const query = params.toString();
  const normalizedUrl = query ? `/search?${query}` : "/search";

  const originalParams = new URLSearchParams();

  if (q) {
    originalParams.set("q", q);
  }

  if (page) {
    originalParams.set("page", page);
  }

  const originalQuery = originalParams.toString();
  const originalUrl = originalQuery ? `/search?${originalQuery}` : "/search";

  return {
    currentPage,
    normalizedUrl,
    shouldRedirect: originalUrl !== normalizedUrl,
  };
}
