/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["localhost", "api-prod.olmatuinsa.online", "xendit.co"], // Add the localhost domain here
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "api-prod.olmatuinsa.online",
    //     port: "",
    //   },
    //   {
    //     protocol: "http",
    //     hostname: "localhost:8000",
    //     port: "",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "cathabot.com",
    //     port: "",
    //   },
    //   {
    //     protocol: "https",
    //     hostname: "www.xendit.co",
    //     port: "",
    //   },
    // ],
  },
};

export default nextConfig;
