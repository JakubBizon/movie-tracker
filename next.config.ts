import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["image.tmdb.org"],
    qualities: [75, 85, 90],
  },
};

export default nextConfig;
