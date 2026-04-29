import type { NextConfig } from "next";
import packageJson from "./package.json";

const commitHash = process.env.VERCEL_GIT_COMMIT_SHA?.slice(0, 8) ?? "local";
const deploymentId = process.env.VERCEL_DEPLOYMENT_ID ?? "local";

const nextConfig: NextConfig = {
  /* config options here */
  // typescript: {
  //   ignoreBuildErrors: true, // Use temporarily
  // },
  env: {
    NEXT_PUBLIC_APP_VERSION: `${packageJson.version}+${commitHash}+${deploymentId}`,
  },
};

export default nextConfig;
