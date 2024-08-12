// next.config.js
const nextConfig = {
  webpack(config) {
    // Add the SVG loader
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
};

module.exports = nextConfig;
