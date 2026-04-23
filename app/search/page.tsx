import SearchListWrapper from "@/components/Search/SearchListWrapper";
import { getSearchPageData } from "@/lib/movies/getSearchPageData";

interface Props {
  searchParams: Promise<{
    q?: string;
    page?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q, page } = await searchParams;
  const currentPage = Number(page) || 1;

  const searchData = await getSearchPageData(q || "", currentPage);

  return (
    <div className="max-w-7xl mx-auto sm:px-8 px-4 py-8">
      <div className="flex flex-col">
        <p>
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
