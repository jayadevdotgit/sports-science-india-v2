import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Keep the local production preview separate from the running dev server.
  distDir: process.env.SSI_LOCAL_PREVIEW === '1' ? '.next-preview' : '.next',
};

export default nextConfig;
