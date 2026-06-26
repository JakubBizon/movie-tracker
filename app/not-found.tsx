import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-5xl font-bold">404</h1>
      <p>This page could not be found.</p>

      <div className="flex gap-3">
        <Link
          href="/"
          className="rounded-md border px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-400 "
        >
          Homepage
        </Link>
        <Link
          href="/movie"
          className="rounded-md px-4 py-2 border border-indigo-500/50 bg-transparent text-indigo-500 dark:text-indigo-200 dark:hover:bg-indigo-500/10"
        >
          Browse movies
        </Link>
      </div>
    </main>
  );
}
