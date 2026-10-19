import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["10.74.143.99"],
  async redirects() {
    return [
      {
        source: "/about",
        destination: "/#about",
        permanent: false,
      },
      {
        source: "/events",
        destination: "/#events",
        permanent: false,
      },
      {
        source: "/gallery",
        destination: "/#gallery",
        permanent: false,
      },
      // Remove /team redirect to avoid intercepting static assets under /team/*
      {
        source: "/projects",
        destination: "/#projects",
        permanent: false,
      },
    ];
  },
  // Ensure team photos are served with proper cache headers (avoiding stale dev cache)
  async headers() {
    return [
      {
        source: "/team/:path*",
        headers: [
          {
            key: "Cache-Control",
            value:
              process.env.NODE_ENV === "development"
                ? "no-cache, no-store, must-revalidate"
                : "public, max-age=86400, stale-while-revalidate=604800",
          },
        ],
      },
    ];
  },
};

export default nextConfig;