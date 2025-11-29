import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        domains: ['images.pexels.com'], // <-- add the domain here
    },
    reactStrictMode: true,
};

export default nextConfig;
