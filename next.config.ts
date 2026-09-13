import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    "127.0.0.1",
    "localhost",
    "*.localhost",
    "*.agent.cvm.dev",
    "**.agent.cvm.dev",
  ],
  async redirects() {
    return [
      { source: "/agenda", destination: "/klussen", permanent: false },
      { source: "/financien", destination: "/klussen", permanent: false },
      { source: "/freelancers", destination: "/klussen", permanent: false },
      { source: "/aannemers", destination: "/klussen", permanent: false },
      { source: "/aannemers/:path*", destination: "/klussen", permanent: false },
    ];
  },
};

export default nextConfig;
