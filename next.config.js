/** @type {import('next').NextConfig} */
const withLess = require("next-with-less");
const withTM = require("next-transpile-modules")(["antd"]); // Transpile antd

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  // Configuration pour LESS
  lessLoaderOptions: {
    lessOptions: {
      modifyVars: {},
    },
  },
};

module.exports = withTM(withLess(nextConfig));