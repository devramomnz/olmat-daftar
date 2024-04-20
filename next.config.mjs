/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost"], // Add the localhost domain here
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
