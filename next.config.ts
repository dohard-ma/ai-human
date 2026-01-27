import type { NextConfig } from "next";

process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";

const nextConfig: NextConfig = {
  env: {
    PRISMA_CLIENT_ENGINE_TYPE: "library",
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "static.laohuoji.link",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
