/** @type {import('next').NextConfig} */
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const nextConfig = {
  output: "export",
  outputFileTracingRoot: __dirname,
  images: { unoptimized: true },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: false },

  webpack: (config) => {
    // Workaround for build crash in css-minimizer-plugin -> cssnano-simple -> caniuse-lite:
    // Error: Cannot find module './features/array-find'
    // By removing CssMinimizerPlugin, we bypass cssnano/caniuse-lite for builds.
    if (config?.optimization?.minimizer) {
      config.optimization.minimizer = config.optimization.minimizer.filter((minimizer) => {
        const name = minimizer?.constructor?.name;
        return name !== "CssMinimizerPlugin";
      });
    }
    return config;
  },
};

export default nextConfig;
