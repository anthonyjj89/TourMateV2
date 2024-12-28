/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    "@repo/ui",
    "@repo/auth",
    "@repo/database",
    "@repo/shared",
    "@repo/types",
  ],
  typescript: {
    ignoreBuildErrors: false,
  },
  eslint: {
    ignoreDuringBuilds: false,
  },
  experimental: {
    externalDir: true,
    outputFileTracingRoot: require("path").join(__dirname, "../../"),
  },
}

module.exports = nextConfig;
