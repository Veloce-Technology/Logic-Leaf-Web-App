import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false,
  // Empty turbopack config — silence Turbopack/webpack mismatch warning
  turbopack: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "druqq6b0a.res.cloudinary.com",
      }
    ],
  },
};

export default nextConfig;
