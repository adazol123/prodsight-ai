import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'sdmntprwestus.oaiusercontent.com'
      }
    ]
  },
  async rewrites() {
    return {
      beforeFiles: [
      {
        source : "/api/v1/:path*",
        destination: `${process.env.NEXT_PUBLIC_API_DOMAIN!}/:path*`
      }
    ]
    }
  },
}

export default nextConfig
