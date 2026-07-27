import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  async redirects() {
    return [
      {
        source: "/about-us",
        destination: "/about",
        permanent: true,
      },
      {
        source: "/feedback",
        destination: "/products/tellus",
        permanent: true,
      },
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/feedback-solution",
        destination: "/products/tellus",
        permanent: true,
      },
      {
        source: "/tell-us-feedback-solution",
        destination: "/products/tellus",
        permanent: true,
      },
      {
        source: "/products/childwood-children-play-equipment",
        destination: "/products/childwood",
        permanent: true,
      },
      {
        source: "/products/indoor-digital-signag",
        destination: "/products/indoor-digital-signage",
        permanent: true,
      },
      {
        source: "/products/godspeed/smart-touch-table",
        destination: "/products/smart-touch-table",
        permanent: true,
      },
      {
        source: "/products/godspeed/interactive-wayfinding-kiosk",
        destination: "/products/wayfinding-kiosk",
        permanent: true,
      },
      {
        source: "/products/godspeed/speed-touch-series-touch-screen-kiosk",
        destination: "/products/touch-screen-kiosk",
        permanent: true,
      },
      {
        source: "/products/godspeed/video-wall",
        destination: "/products/video-wall",
        permanent: true,
      },
      {
        source: "/services/hardware-for-restaurant-and-bar",
        destination: "/services/hardware",
        permanent: true,
      },
      {
        source: "/services/consulting-for-it-networking",
        destination: "/services/it-networking",
        permanent: true,
      },
      {
        source: "/outdoor-play-equipment",
        destination: "/products/childwood",
        permanent: false,
      },
      {
        source: "/products/godspeed",
        destination: "/products",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;