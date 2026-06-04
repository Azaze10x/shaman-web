import type { NextConfig } from "next";

const isGithubPages = process.env.GITHUB_PAGES === "true";
/** Custom domain (shamantech.co) serves at site root — no /shaman-web prefix. */
const basePath = isGithubPages ? "" : "";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  output: isGithubPages ? "export" : undefined,
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: isGithubPages,
  images: {
    unoptimized: isGithubPages,
    formats: isGithubPages ? undefined : ["image/avif", "image/webp"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
