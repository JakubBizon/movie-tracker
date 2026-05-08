import { MovieDetails } from "@/app/types/movie";
import { getMovieKeywords } from "@/lib/movies/getMovieKeywords";

type Props = {
  id: number;
  movie: MovieDetails;
};
type KeywordResponse = {
  id: number;
  keywords: Keyword[];
};
type Keyword = {
  id: number;
  name: string;
};
export default async function AdditionalInfo({ id, movie }: Props) {
  const keywords = await getMovieKeywords(id);
  console.log(keywords);
  return (
    <div className="px-4 sm:px-6">
      <h3 className="dark:text-white flex items-center gap-2 text-black font-semibold text-3xl">
        Details
      </h3>
      <div className="mt-4 text-md text-muted-foreground space-y-2 flex gap-10">
        <div className="flex flex-col space-y-4">
          <div>
            <span className="font-semibold text-primary">Original Title: </span>
            {movie.original_title}
          </div>

          <div>
            <span className="font-semibold text-primary">
              Original Language:{" "}
            </span>
            {movie.original_language.toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <span className="font-semibold text-primary">Budget: </span>
            {movie.budget > 0
              ? ` $${movie.budget.toLocaleString()}`
              : "Budget: N/A"}
          </div>
          <div>
            <span className="font-semibold text-primary">Revenue: </span>
            {movie.revenue > 0
              ? ` $${movie.revenue.toLocaleString()}`
              : "Revenue: N/A"}
          </div>
        </div>

        <div>
          <span className="font-semibold text-primary">Status: </span>
          {movie.status}
        </div>

        {
          //todo add keywords
          /* <div className="flex flex-col">
          <span className="font-semibold text-primary">Keywords: </span>
          <div>
            {keywords.keywords.map((keyword: Keyword) => (
              <span
                key={keyword.id}
                className="inline-block bg-primary text-primary-foreground rounded-full px-3 py-1 text-sm font-medium mr-2"
              >
                {keyword.name}
              </span>
            ))}
          </div>
        </div> */
        }
      </div>
    </div>
  );
}
