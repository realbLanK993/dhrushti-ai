/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  assetPrefix: "/",
  env: {
    PUBLIC_URL: process.env.PUBLIC_URL,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
