/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'out',
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  basePath: '/portfolio',
  assetPrefix: '/portfolio/',
}

export default nextConfig
