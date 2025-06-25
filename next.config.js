/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features if needed
  experimental: {
    // Server actions are enabled by default in Next.js 14+
  },
  
  // Configure rewrites to proxy API calls to the Python backend
  async rewrites() {
    return [
      {
        source: '/backend/:path*',
        destination: 'http://localhost:5001/:path*',
      },
    ];
  },
  
  // Handle images and other assets
  images: {
    domains: ['localhost'],
    unoptimized: true, // For development
  },
  
  // Enable webpack 5 features
  webpack: (config, { isServer }) => {
    // Exclude backend directory from Next.js compilation
    config.module.rules.push({
      test: /\.(js|jsx|ts|tsx)$/,
      exclude: /backend/,
    });
    
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    return config;
  },
  
  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Output configuration for static export if needed
  // output: 'export',
  // trailingSlash: true,
};

module.exports = nextConfig;
