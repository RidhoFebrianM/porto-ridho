import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false, // hide the floating "N" badge in dev
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
