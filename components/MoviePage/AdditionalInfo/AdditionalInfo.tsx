import { Keyword } from "@/app/types/keyword";
import { MovieDetails } from "@/app/types/movie";
import { getMovieKeywords } from "@/lib/movies/getMovieKeywords";

type Props = {
  id: number;
  movie: MovieDetails;
};

type DetailItem = {
  label: string;
  value: string;
};

export default async function AdditionalInfo({ id, movie }: Props) {
  const keywords = await getMovieKeywords(id);
  const detailItems: DetailItem[] = [
    {
      label: "Original Title",
      value: movie.original_title,
    },
    {
      label: "Original Language",
      value: movie.original_language.toUpperCase(),
    },
    {
      label: "Budget",
      value: movie.budget > 0 ? `$${movie.budget.toLocaleString()}` : "N/A",
    },
    {
      label: "Revenue",
      value: movie.revenue > 0 ? `$${movie.revenue.toLocaleString()}` : "N/A",
    },
    {
      label: "Status",
      value: movie.status,
    },
  ];

  return (
    <div className="dark:text-white text-black ">
      <h3 className="font-semibold text-3xl">Details</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 text-md text-black dark:text-white">
        {detailItems.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="font-semibold text-primary">{item.label}: </span>
            <span>{item.value}</span>
          </div>
        ))}

        <div className="flex flex-col">
          <span className="font-semibold text-primary">Keywords: </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.keywords.length === 0 ? (
              <div className="text-muted-foreground">
                No keywords available.
              </div>
            ) : (
              keywords.keywords.map((keyword: Keyword) => (
                <span
                  key={keyword.id}
                  className="inline-block text-black dark:text-white border-primary/50 border-2 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {keyword.name}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
