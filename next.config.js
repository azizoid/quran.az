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

// Injected content via Sentry wizard below

const { withSentryConfig } = require('@sentry/nextjs')

module.exports = withSentryConfig(
  module.exports,
  {
    // For all available options, see:
    // https://github.com/getsentry/sentry-webpack-plugin#options

    // Suppresses source map uploading logs during build
    silent: true,

    org: 'good-ideas',
    project: 'quran-az',
  },
  {
    // For all available options, see:
    // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/

    // Upload a larger set of source maps for prettier stack traces (increases build time)
    widenClientFileUpload: true,

    // Transpiles SDK to be compatible with IE11 (increases bundle size)
    transpileClientSDK: true,

    // Routes browser requests to Sentry through a Next.js rewrite to circumvent ad-blockers (increases server load)
    tunnelRoute: '/monitoring',

    // Hides source maps from generated client bundles
    hideSourceMaps: true,

    // Automatically tree-shake Sentry logger statements to reduce bundle size
    disableLogger: true,
  }
)
