/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cathabot.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "www.xendit.co",
        port: "",
      },
    ],
  },
};

export default nextConfig;
