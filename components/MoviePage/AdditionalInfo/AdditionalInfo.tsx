import { MovieDetails } from "@/app/types/movie";
import { getMovieKeywords } from "@/lib/movies/getMovieKeywords";

type Props = {
  id: number;
  movie: MovieDetails;
};

type Keyword = {
  id: number;
  name: string;
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
    <div className="px-4 sm:px-6">
      <h3 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
        Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4 text-md text-muted-foreground">
        {detailItems.map((item) => (
          <div key={item.label} className="flex flex-col">
            <span className="font-semibold text-primary">{item.label}: </span>
            <span className="text-white">{item.value}</span>
          </div>
        ))}

        <div className="flex flex-col">
          <span className="font-semibold text-primary">Keywords: </span>
          <div className="flex flex-wrap gap-2 mt-2">
            {keywords.keywords.map((keyword: Keyword) => (
              <span
                key={keyword.id}
                className="inline-block bg-muted-foreground/30 text-primary-foreground rounded-full px-3 py-1 text-sm font-medium"
              >
                {keyword.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
