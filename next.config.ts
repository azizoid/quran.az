import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  output: 'standalone',
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  reactStrictMode: true,
  devIndicators: false,
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: 'default-src "self"; script-src "none"; sandbox;',
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.quran.az',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'quran.az',
        port: '',
      },
    ],
    // Disable image optimization in production to prevent transformAlgorithm errors
    // This is a workaround for Next.js 16.0.7 + React 19 compatibility issues in standalone builds
    unoptimized: process.env.NODE_ENV === 'production',
  },
  experimental: {
    serverActions: {
      // Only allow production domains - remove localhost in production
      allowedOrigins:
        process.env.NODE_ENV === 'production'
          ? ['quran.az', 'www.quran.az']
          : ['quran.az', 'www.quran.az', 'localhost:3000'],
    },
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

export default nextConfig
