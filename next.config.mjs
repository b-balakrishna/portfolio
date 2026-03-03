/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'dist',
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
