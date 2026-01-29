/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  headers: async () => [
    {
      source: "/:path*",
      headers: [
        {
          key: "X-Content-Type-Options",
          value: "nosniff",
        },
        {
          key: "X-Frame-Options",
          value: "SAMEORIGIN",
        },
        {
          key: "X-XSS-Protection",
          value: "1; mode=block",
        },
        {
          key: "Referrer-Policy",
          value: "strict-origin-when-cross-origin",
        },
        {
          key: "Permissions-Policy",
          value: "camera=(), microphone=(), geolocation=()",
        },
      ],
    },
  ],
  redirects: async () => [
    // Legacy route redirects (backward compatibility)
    { source: "/services", destination: "/en/services", permanent: true },
    { source: "/blog", destination: "/en/blog", permanent: true },
    { source: "/blog/:slug", destination: "/en/blog/:slug", permanent: true },
    { source: "/case-studies", destination: "/en/case-studies", permanent: true },
    { source: "/case-studies/:slug", destination: "/en/case-studies/:slug", permanent: true },
    { source: "/contact", destination: "/en/contact", permanent: true },
    { source: "/company", destination: "/en/company", permanent: true },
    { source: "/solutions", destination: "/en/solutions", permanent: true },
    { source: "/resources", destination: "/en/resources", permanent: true },
    { source: "/privacy", destination: "/en/privacy", permanent: true },
    { source: "/terms", destination: "/en/terms", permanent: true },
    { source: "/services/:slug", destination: "/en/services/:slug", permanent: true },
  ],
};

export default nextConfig;
