import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverActions: {
      bodySizeLimit: "6mb", // slightly above your 5MB limit
    },
  },
  images: {
    domains: ['images.pexels.com', 'media.istockphoto.com', "cdn.pixabay.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com"
      }
    ]
  }
};

export default nextConfig;