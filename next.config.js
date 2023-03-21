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
  redirects: async () => [
    {
      source: '/aze/:soorah',
      destination: '/:soorah',
      permanent: true,
    },
    {
      source: '/aze/:soorah/:ayah',
      destination: '/:soorah/:ayah',
      permanent: true,
    },
    {
      source: '/rus/:soorah',
      destination: '/:soorah?t=3',
      permanent: true,
    },
    {
      source: '/rus/:soorah/:ayah',
      destination: '/:soorah/:ayah?t=3',
      permanent: true,
    }
  ],
}
