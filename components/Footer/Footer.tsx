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
    <div className="w-full dark:bg-slate-900 bg-transparent border-t border-gray-200 dark:border-none">
      <footer className="container mx-auto max-w-[1200px] sm:px-10 px-6 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-12">
          <div className="flex gap-10 flex-col justify-center lg:max-w-xs">
            <div className="text-primary flex gap-2 text-2xl font-bold items-center">
              <Film className="w-8 h-8" />
              <span>Movie Tracker</span>
            </div>
            <div className="">
              <span className="">
                Track, rate, and discover your favorite movies. Build your
                personal watchlist and share your ratings with the community.
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-16 md:gap-24">
            {items.map((item, index) => (
              <div key={index} className="flex flex-col gap-5">
                <h3 className="text-blue-500 font-bold text-sm uppercase tracking-widest">
                  {item.title}
                </h3>
                <ul className="flex flex-col gap-3">
                  {item.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={link.href}
                        className="text-[15px] dark:text-slate-400 dark:hover:text-white text-gray-700 hover:text-blue-500   transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-slate-800/30 dark:border-gray-50/80 text-center">
          <p className="text-sm text-slate-500 dark:text-white">
            Movie data provided by TMDB
          </p>
        </div>
      </footer>
    </div>
  );
}
