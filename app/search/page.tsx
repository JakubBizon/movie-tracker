import SearchListWrapper from "@/components/Search/SearchListWrapper";
import { getSearchPageData } from "@/lib/movies/getSearchPageData";
import { getNormalizedSearchUrl } from "@/lib/pagination/getNormalizedSearchUrl";
import { redirect } from "next/navigation";

interface Props {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const { currentPage, normalizedUrl, shouldRedirect } = getNormalizedSearchUrl(
    {
      q,
      page,
    },
  );

  if (shouldRedirect) {
    redirect(normalizedUrl);
  }
  const searchData = await getSearchPageData(q || "", currentPage);
  console.log("page:", page, "currentPage:", currentPage);

  return (
    <div className="max-w-7xl mx-auto sm:px-8 px-4 py-8 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col">
        <p className="pb-4">
          {searchData.totalResults} results found for {q}
        </p>

        <SearchListWrapper
          movies={searchData.movies}
          bookmarkedIds={searchData.bookmarkedIds}
          favoriteIds={searchData.favoriteIds}
          pagination={{
            currentPage,
            totalPages: searchData.totalPages,
          }}
        />
      </div>
    </div>
  );
}
