/** @type {import('next').NextConfig} */

const withPWA = require("@ducanh2912/next-pwa").default({
  dest: "public",
  // cacheOnFrontEndNav: true,
  // aggressiveFrontEndNavCaching: true,
  // reloadOnOnline: true,
  // swcMinify: true,
  // disable: process.env.NODE_ENV === "development",
  // workboxOptions: {
  //   disableDevLogs: true,
  // },

  // ... other options you like
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['s3.eu-west-2.amazonaws.com'],
  },
  // Disable unnecessary features in development
  typescript: {
    ignoreBuildErrors: true, // During development only
  },
};

module.exports = nextConfig;