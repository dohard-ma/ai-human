import type { NextConfig } from "next";

process.env.PRISMA_CLIENT_ENGINE_TYPE = "library";

const nextConfig: NextConfig = {
  env: {
    PRISMA_CLIENT_ENGINE_TYPE: "library",
  },
};

export default nextConfig;
