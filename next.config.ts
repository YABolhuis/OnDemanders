import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1", "localhost"],
  async redirects() {
    return [
      { source: "/agenda", destination: "/klussen", permanent: false },
      { source: "/financien", destination: "/klussen", permanent: false },
      { source: "/freelancers", destination: "/aannemers", permanent: false },
    ];
  },
};

export default nextConfig;
