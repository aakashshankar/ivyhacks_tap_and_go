/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "unsplash.com",
    //     port: "",
    //     pathname: "/photos/**",
    //   },
    // ],
    domains: ["unsplash.com"],
  },
};

export default nextConfig;
