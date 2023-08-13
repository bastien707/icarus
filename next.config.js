// in next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      appDir: true,
    },
    webpack: (config) => {
      config.externals.push("pino-pretty", "lokijs", "encoding", "fs", "net", "tls");
      return config;
    },
  };
  
  module.exports = nextConfig;