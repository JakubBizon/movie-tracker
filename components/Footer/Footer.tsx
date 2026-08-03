import { Film } from "lucide-react";
import Link from "next/link";
import HashLink from "../HashLink";

const items = [
  {
    title: "Discover",
    links: [
      { name: "Trending", href: "/#trending" },
      { name: "Popular", href: "/movie" },
      { name: "Top Rated", href: "/movie/top-rated" },
      { name: "Upcoming", href: "/movie/upcoming" },
    ],
  },
  {
    title: "Account",
    links: [
      { name: "My Lists", href: "/my-lists" },
      { name: "My Ratings", href: "/my-ratings" },
      { name: "Settings", href: "/settings" },
    ],
  },
  {
    title: "Legal",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Contact", href: "/contact" },
    ],
  },
];

export default function Footer() {
  return (
    <div className="w-full border-t border-gray-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <footer className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:gap-16">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
            <div className="mb-4 flex gap-2 text-2xl font-bold text-primary">
              <Film className="h-7 w-7" />
              <span>Movie Tracker</span>
            </div>

            <p className="min-w-2xs lg:max-w-md max-w-64 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
              Track, rate, and discover your favorite movies. Build your
              personal watchlist and share your ratings with the community.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 text-center sm:grid-cols-3 sm:text-left lg:max-w-2xl lg:justify-self-end">
            {items.map((item) => (
              <div key={item.title} className="flex min-w-fit flex-col gap-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-primary">
                  {item.title}
                </h3>

                <ul className="flex flex-col gap-2">
                  {item.links.map((link) => (
                    <li key={link.name}>
                      <HashLink
                        href={link.href}
                        className="text-sm text-gray-600 transition-colors duration-200 hover:text-primary dark:text-gray-400 dark:hover:text-primary"
                      >
                        {link.name}
                      </HashLink>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 border-t border-gray-200 dark:border-slate-800" />

        <div className="pt-8 text-center">
          <p className="text-xs text-gray-600 dark:text-gray-500 sm:text-sm">
            © {new Date().getFullYear()} Movie Tracker. Movie data provided by
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 text-primary hover:underline"
            >
              TMDB
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
