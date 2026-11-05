import type { NextConfig } from "next";
import "./src/lib/env/clientEnv";
import "./src/lib/env/serverEnv";

const nextConfig: NextConfig = {
  experimental: {
    agentUpgrade: "security",
  },
  /* config options here */
  reactCompiler: true,
  typedRoutes: true,
  serverExternalPackages: ["@prisma/client", "@prisma/adapter-libsql"],
};

export default nextConfig;
