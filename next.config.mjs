/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com', // adicione este domínio
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com', // se ainda precisar deste
      },
    ],
  },
};

export default nextConfig;
