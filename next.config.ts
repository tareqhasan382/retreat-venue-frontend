import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.pexels.com',
                // Optional: Can specify a specific path if needed, e.g., pathname: '/photos/**',
            },
            {
                protocol: 'https',
                hostname: 'randomuser.me', // <-- ADD THIS HOSTNAME
                port: '',
                pathname: '/**', // Allows any path/subfolder on this host
            },
            {
                protocol: 'https',
                hostname: 'i0.wp.com', // This allows images from the 'i0.wp.com' host
                port: '',
                pathname: '/**', // Allows any path/subfolder on this host
            },
            {
                protocol: 'https',
                hostname: 'example.com',
            },
        ],
    },
};

export default nextConfig;
