import { startMockTmdb } from "./mock-tmdb";

export default async function globalSetup() {
  const server = await startMockTmdb(4010);
  return async () => {
    server.close();
  };
}
