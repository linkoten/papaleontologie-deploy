/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ['cdn.schema.io', 'cdn.swell.store', 'media.graphassets.com'],
  },
  
}

module.exports = nextConfig
