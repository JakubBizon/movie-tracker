import { Film } from "lucide-react";
import Link from "next/link";

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
    <div className="w-full dark:bg-slate-900 bg-white border-t border-gray-200 dark:border-slate-800">
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="sm:col-span-2 lg:col-span-1 sm:text-left text-center sm:items-start items-center flex flex-col">
            <div className="flex gap-2 text-2xl font-bold items-center mb-4 text-primary">
              <Film className="w-7 h-7" />
              <span>Movie Tracker</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              Track, rate, and discover your favorite movies. Build your
              personal watchlist and share your ratings with the community.
            </p>
          </div>

          {items.map((item, index) => (
            <div key={index} className="flex flex-col gap-4 sm:items-start items-center sm:text-left text-center">
              <h3 className="text-primary font-bold text-sm uppercase tracking-widest">
                {item.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {item.links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-slate-800" />

        <div className="pt-8 text-center">
          <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-500">
            © {new Date().getFullYear()} Movie Tracker. Movie data provided by
            <Link
              href="https://www.themoviedb.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline ml-1"
            >
              TMDB
            </Link>
          </p>
        </div>
      </footer>
    </div>
  );
}
