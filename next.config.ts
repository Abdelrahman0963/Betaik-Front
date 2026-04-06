import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',

  // تحسين الصور
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
    // تحسين أداء الصور
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 31536000,
  },

  // تحسين الحزم
  experimental: {
    optimizePackageImports: [
      'lucide-react',
      'react-icons',
      '@tabler/icons-react',
      '@mui/x-date-pickers',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
    ],
    // تحسينات إضافية
    webpackBuildWorker: true,
    optimizeFonts: true,
    isrMemoryCacheSize: 50 * 1024 * 1024,
  },

  // متغيرات البيئة العامة
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },

  // تحسين البناء
  swcMinify: true,
  productionBrowserSourceMaps: false,

  // تحسين الراوتنج
  redirects: async () => [],
  rewrites: async () => [],

  // إعدادات الضغط
  compress: true,

  // React Strict Mode
  reactStrictMode: true,

  // تحسين الأداء - Power Mode
  poweredByHeader: false,
};

export default nextConfig;