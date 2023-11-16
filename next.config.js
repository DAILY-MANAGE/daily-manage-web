/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com'],
  },
  experimental: {
    serverComponentsExternalPackages: []
  },
};

module.exports = nextConfig;
