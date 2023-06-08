/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["res.cloudinary.com", "developers.onemap.sg"],
  },
  experimental: {
    appDir: true,
  },
}

export default nextConfig
