/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "a0.muscache.com",
        protocol: "https",
        port: "",
      },
      {
        hostname: "aslufihfurxijfmbwjbm.supabase.co",
        protocol: "https",
        port: "",
      },
    ],
  },
};

export default nextConfig;
