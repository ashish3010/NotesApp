import type { NextConfig } from "next";

const isGithubPages = process.env.NODE_ENV === "production";
const repoName = "NotesApp";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: isGithubPages ? `/${repoName}` : undefined,
  assetPrefix: isGithubPages ? `/${repoName}/` : undefined,
};
export default nextConfig;
