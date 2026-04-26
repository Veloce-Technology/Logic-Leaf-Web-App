import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  // Empty turbopack config — silence Turbopack/webpack mismatch warning
  turbopack: {},
};

export default nextConfig;
