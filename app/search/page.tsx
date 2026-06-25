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

export async function generateMetadata({ searchParams }: Props) {
  const { q } = await searchParams;
  return {
    title: q ? q : "Search",
  };
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
    <div className="max-w-7xl mx-auto py-8 min-h-[calc(100vh-200px)]">
      <div className="flex flex-col">
        <p className="pb-4 text-xl px-4 sm:px-6">
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
