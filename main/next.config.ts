import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // Required for next/image in static export
  },
  basePath: '/your-repo-name', // if deploying from a repo that's not your username.github.io
};

export default nextConfig;
