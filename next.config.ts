import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack(config, { isServer }) {
    // Force all bs58 imports to the root installation.
    // Some wallet-adapter packages declare bs58 as a dependency; npm dedupes it
    // but webpack's exports-map resolution constructs nested paths that don't
    // exist, producing ENOENT. The alias below short-circuits that lookup.
    config.resolve.alias = {
      ...config.resolve.alias,
      bs58: path.resolve("./node_modules/bs58"),
    };

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
        stream: false,
        buffer: false,
        fs: false,
        path: false,
        os: false,
      };
      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const { ProvidePlugin } = require("webpack");
      config.plugins.push(new ProvidePlugin({ Buffer: ["buffer", "Buffer"] }));
    }
    config.experiments = { ...config.experiments, asyncWebAssembly: true };

    // Suppress dynamic-require warning from ox/viem/reown chain definitions
    config.module = {
      ...config.module,
      exprContextCritical: false,
    };

    return config;
  },
};

export default nextConfig;
