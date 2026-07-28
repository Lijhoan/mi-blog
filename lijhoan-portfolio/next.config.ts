import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Export estático para hosting en Azure (web estática): genera out/
  output: 'export',
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
