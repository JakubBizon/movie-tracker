import http from "node:http";

const movie = {
  id: 550,
  title: "Fight Club",
  original_title: "Fight Club",
  original_language: "en",
  overview: "Test overview",
  poster_path: "",
  backdrop_path: "",
  vote_average: 8.87,
  vote_count: 300,
  runtime: 160,
  release_date: "1999-10-15",
  genres: [{ id: 18, name: "Drama" }],
  budget: 63000000,
  revenue: 100853753,
  status: "Released",
};

const routes: Record<string, unknown> = {
  "/movie/550": movie,
  "/movie/550/credits": { id: 550, cast: [], crew: [] },
  "/movie/550/videos": { id: 550, results: [] },
  "/movie/550/keywords": { id: 550, keywords: [] },
  "/movie/550/reviews": {
    page: 1,
    results: [],
    total_pages: 1,
    total_results: 0,
  },
};

export function startMockTmdb(port = 4010) {
  const server = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    const { pathname } = new URL(req.url ?? "", "http://localhost");
    const key = pathname.replace(/^\/3/, "");

    console.log("[mock tmdb]", req.url);

    if (key in routes) {
      return res.end(JSON.stringify(routes[key]));
    }

    console.error("[mock tmdb] UNMOCKED:", req.url);
    res.statusCode = 404;
    res.end(JSON.stringify({ status_message: "Not found" }));
  });
  return new Promise<http.Server>((resolve) =>
    server.listen(port, () => resolve(server)),
  );
}
