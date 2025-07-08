import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'sdmntprwestus.oaiusercontent.com'
      }
    ]
  }
}

export default nextConfig
