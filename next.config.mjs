/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'], // Specify custom page extensions if your files use custom names inside src
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        fs: false,
      };
    }
    return config;
  },
  // Specify that the base directory for your application is 'src'
  basePath: '/src',
  // Specify the directory where pages are located (this is optional if your pages are inside `src/pages`)
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
};

export default nextConfig;
