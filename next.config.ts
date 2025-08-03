import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // ✅ disables lint checks on Vercel
  },
  typescript: {
    // ignoreBuildErrors: true, // enable this only if you want to bypass TS errors
  },
};

export default nextConfig;
