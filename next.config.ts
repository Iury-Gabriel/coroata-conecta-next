import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['images.unsplash.com', 'images.pexels.com', 'eptxlqynlekdnndiwxpd.supabase.co', 'tse2.mm.bing.net'],
  },
};

export default nextConfig;
