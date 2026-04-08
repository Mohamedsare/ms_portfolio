import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/contact/submit/",
        destination: "/api/contact",
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/**" },
      { protocol: "https", hostname: "via.placeholder.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
