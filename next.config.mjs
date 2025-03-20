/** @type {import('next').NextConfig} */
const nextConfig = {
    output:"export",
    env: {
        PUBLIC_URL: process.env.PUBLIC_URL,
    },
    images:{
        unoptimized:true
    }
};

export default nextConfig;
