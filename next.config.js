const withTM = require('next-transpile-modules')(['@lifi/widget']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/dapp/:path*',
        destination: '/dapp/',
      },
    ]
  },
  trailingSlash: true,
  reactStrictMode: true,
  experimental: {
    scrollRestoration: true,
  },
  images: {
    unoptimized: true
  }
}

module.exports = withTM(nextConfig)
