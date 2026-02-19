/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/studio",
        destination: "https://valoria-homes.sanity.studio/",
        permanent: true
      },
      {
        source: "/studio/:path*",
        destination: "https://valoria-homes.sanity.studio/:path*",
        permanent: true
      }
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com"
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io"
      }
    ]
  }
};

export default nextConfig;
