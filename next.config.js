/** @type {import('next').NextConfig} */
const WithPwa = require("next-pwa");

const nextConfig = WithPwa({
  reactStrictMode: true,
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
    disable: process.env.NODE_ENV === "development",
  },
});

module.exports = nextConfig;
