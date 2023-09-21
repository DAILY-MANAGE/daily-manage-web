/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['source.unsplash.com'],
  },
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@prisma/client", "bcryptjs"]
  },
};

module.exports = nextConfig;
