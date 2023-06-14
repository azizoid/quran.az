module.exports = {
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: {
    buildActivity: false,
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
    },
    {
      source: '/:soorah/:ayah/t1',
      destination: '/:soorah/:ayah?t=1',
      permanent: true,
    },
    {
      source: '/:soorah/:ayah/t2',
      destination: '/:soorah/:ayah?t=2',
      permanent: true,
    },
    {
      source: '/:soorah/:ayah/t3',
      destination: '/:soorah/:ayah?t=3',
      permanent: true,
    },
    {
      source: '/:soorah/:ayah/t:1',
      destination: '/:soorah/:ayah?t=1',
      permanent: true,
    },
    {
      source: '/:soorah/:ayah/t:2',
      destination: '/:soorah/:ayah?t=2',
      permanent: true,
    },
    {
      source: '/:soorah/:ayah/t:3',
      destination: '/:soorah/:ayah?t=3',
      permanent: true,
    },
    {
      source: '/index.php/:redirect',
      destination: '/:redirect',
      permanent: true,
    },
  ],
}
