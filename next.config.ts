import type { NextConfig } from "next";

// GitHub Pages serves project sites from /<repo-name>. The deploy workflow
// sets BASE_PATH; locally (and on Netlify/Vercel) it stays empty.
const basePath = process.env.BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
  trailingSlash: true,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
