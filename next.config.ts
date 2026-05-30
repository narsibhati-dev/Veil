import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  webpack(config, { isServer }) {
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
    return config;
  },
};

export default nextConfig;
