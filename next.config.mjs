/** @type {import('next').NextConfig} */
const nextConfig = {
  // Cache Components - enables PPR (Partial Pre-Rendering)
  // Data is dynamic by default, use "use cache" directive to opt-in
  cacheComponents: true,

  // Cache profiles for semantic freshness control
  cacheLife: {
    // For marketing content, blog posts, docs
    "static-content": {
      stale: 3600, // 1 hour client cache
      revalidate: 86400, // 1 day server revalidation
      expire: 604800, // 1 week expiration
    },
    // For frequently changing content
    "dynamic-content": {
      stale: 60, // 1 minute client cache
      revalidate: 300, // 5 minute server revalidation
      expire: 3600, // 1 hour expiration
    },
    // For product/service data
    "product-data": {
      stale: 300, // 5 min client cache
      revalidate: 3600, // 1 hour server revalidation
      expire: 86400, // 1 day expiration
    },
  },

  typescript: {
    ignoreBuildErrors: true,
  },

  // Images - optimized for performance
  images: {
    unoptimized: process.env.NODE_ENV === "development",
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.cloudinary.com",
      },
    ],
  },

  // Performance optimizations
  reactCompiler: true,
  reactStrictMode: true,
  poweredByHeader: false,
  generateEtags: true,
  compress: true,

  // Output configuration for deployment
  // output: "standalone",

  // Cache and performance
  httpAgentOptions: {
    keepAlive: true,
  },

  // Logging (reduce in production)
  logging:
    process.env.NODE_ENV === "development"
      ? {
          fetches: {
            fullUrl: true,
            hmrRefreshes: true,
          },
          incomingRequests: true,
        }
      : undefined,

  // Build optimizations
  cleanDistDir: true,
  productionBrowserSourceMaps: false,

  // Experimental features for maximum performance
  experimental: {
    // Turbopack caching - critical for dev/build speed
    turbopackFileSystemCacheForDev: true,
    turbopackFileSystemCacheForBuild: true,
    turbopackMinify: true,

    // CSS optimizations
    cssChunking: true,
    optimizeCss: true,
    useLightningcss: true,

    // React optimizations for SSR
    optimizeServerReact: true,
    optimisticClientCache: true,

    // Server minification for smaller bundles
    serverMinification: true,

    // View transitions for smooth page navigation
    viewTransition: true,

    // Package import optimization for tree-shaking
    optimizePackageImports: [
      "lucide-react",
      "framer-motion",
      "motion",
      "@radix-ui/react-icons",
      "clsx",
      "gsap",
      "@tabler/icons-react",
      "tailwind-merge",
      "@radix-ui/react-slot",
      "@radix-ui/react-accordion",
      "@radix-ui/react-dropdown-menu",
      "@radix-ui/react-dialog",
    ],

    // Use multiple CPUs for builds
    cpus: 4,
  },

  // Security headers with aggressive caching
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "SAMEORIGIN" },
        { key: "X-XSS-Protection", value: "1; mode=block" },
        { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
        { key: "X-DNS-Prefetch-Control", value: "on" },
      ],
    },
    // Cache static assets aggressively (1 year, immutable)
    {
      source: "/logo/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/images/:path*",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/:path*.png",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/:path*.svg",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/:path*.woff2",
      headers: [
        { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
      ],
    },
    {
      source: "/site.webmanifest",
      headers: [
        { key: "Cache-Control", value: "public, max-age=86400" },
        { key: "Content-Type", value: "application/manifest+json" },
      ],
    },
    // Cache API responses with stale-while-revalidate
    {
      source: "/api/:path*",
      headers: [
        {
          key: "Cache-Control",
          value: "public, s-maxage=60, stale-while-revalidate=300",
        },
      ],
    },
  ],

  // SEO-friendly redirects (301 permanent for legacy routes)
  redirects: async () => [
    { source: "/services", destination: "/en/services", permanent: true },
    { source: "/blog", destination: "/en/blog", permanent: true },
    { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: true },
    {
      source: "/case-studies",
      destination: "/en/case-studies",
      permanent: true,
    },
    {
      source: "/case-studies/:slug",
      destination: "/en/case-studies/:slug",
      permanent: true,
    },
    { source: "/contact", destination: "/en/contact", permanent: true },
    { source: "/company", destination: "/en/company", permanent: true },
    { source: "/solutions", destination: "/en/solutions", permanent: true },
    { source: "/resources", destination: "/en/resources", permanent: true },
    { source: "/privacy", destination: "/en/privacy", permanent: true },
    { source: "/terms", destination: "/en/terms", permanent: true },
    {
      source: "/services/:slug",
      destination: "/en/services/:slug",
      permanent: true,
    },
  ],
};

export default nextConfig;
