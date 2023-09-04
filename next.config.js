/** @type {import('next').NextConfig} */
const nextConfig = {

  experimental: {
    typedRoutes: true,
    serverActions: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.clerk.dev', port: "" },
      { protocol: 'https', hostname: 'dsc.cloud', port: "" },
      { protocol: 'https', hostname: 'www.gravatar.com', port: "" }
    ]
  }
}

module.exports = nextConfig
