/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['brasserie-goudale.com', 'cloudflare-ipfs.com', 'cdn.pixabay.com'],
  },
}

module.exports = nextConfig
