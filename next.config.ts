import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "assets.prodsight.adazol.com",
      },
    ],
  },
  async rewrites() {
    const isDev = process.env.NODE_ENV === "development";
    const domain =
      process.env?.[
        isDev ? "NEXT_PUBLIC_API_DOMAIN_DEV" : "NEXT_PUBLIC_API_DOMAIN"
      ];
    return {
      beforeFiles: [
        {
          source: "/api/v1/:path*",
          destination: `${domain}/:path*`,
        },
      ],
    };
  }
};

export default nextConfig;
