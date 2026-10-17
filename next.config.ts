/** @type {import('next').NextConfig} */
const nextConfig = {
  // Required for formData() uploads larger than 1MB
  serverActions: {
    bodySizeLimit: "20mb",
  },

  // Required on many Next.js 14.x versions (Vercel included)
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    unoptimized: true,
    domains: ["banginic.com", "res.cloudinary.com"],
  },
};

export default nextConfig;
