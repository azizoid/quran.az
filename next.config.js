module.exports = {
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
  },
  experimental: {
    largePageDataBytes: 128 * 100000,
  },
}
