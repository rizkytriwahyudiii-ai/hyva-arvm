import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Tambahkan baris ini di sini
  allowedDevOrigins: ['192.168.1.5'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cimsbuolvgplzoijckvg.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

export default nextConfig;