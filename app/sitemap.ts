import type { MetadataRoute } from "next";
import { siteConfig, SUPPORTED_LOCALES } from "@/lib/config";
import { services, blogPosts, caseStudies } from "@/lib/data";

/**
 * Sitemap Generator - SEO/AEO/GEO Optimized
 *
 * Generates comprehensive sitemap with:
 * - All locale variants for internationalization
 * - Non-localized routes (redirected via 301s) for better indexing
 * - Proper priority hierarchy based on page importance
 * - Last modified dates for freshness signals
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales = [...SUPPORTED_LOCALES];
  const now = new Date();

  // ============================================
  // NON-LOCALIZED ROUTES (for indexing/crawling)
  // These redirect to /en via 301, but help with discovery
  // ============================================
  const nonLocalizedRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1, lastModified: now },
    {
      url: `${baseUrl}/services`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${baseUrl}/solutions`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${baseUrl}/blog`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/case-studies`,
      changeFrequency: "weekly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/company`,
      changeFrequency: "monthly",
      priority: 0.7,
      lastModified: now,
    },
    {
      url: `${baseUrl}/resources`,
      changeFrequency: "weekly",
      priority: 0.7,
      lastModified: now,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: now,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: "yearly",
      priority: 0.3,
      lastModified: now,
    },
  ];

  // Non-localized service pages
  const nonLocalizedServiceRoutes: MetadataRoute.Sitemap = services.map(
    (service) => ({
      url: `${baseUrl}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    }),
  );

  // Non-localized blog pages
  const nonLocalizedBlogRoutes: MetadataRoute.Sitemap = blogPosts.map(
    (post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(post.publishedAt),
    }),
  );

  // Non-localized case study pages
  const nonLocalizedCaseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(
    (study) => ({
      url: `${baseUrl}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    }),
  );

  // ============================================
  // LOCALIZED ROUTES (primary content)
  // ============================================

  // Locale home pages
  const localeHomePages: MetadataRoute.Sitemap = locales.map((locale) => ({
    url: `${baseUrl}/${locale}`,
    changeFrequency: "weekly" as const,
    priority: 0.95,
    lastModified: now,
  }));

  // Service pages (all locales)
  const serviceRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${baseUrl}/${locale}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    })),
  );

  // Blog posts (all locales)
  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(post.publishedAt),
    })),
  );

  // Case studies (all locales)
  const caseStudyRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    caseStudies.map((study) => ({
      url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    })),
  );

  // Main section pages (all locales)
  const mainPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/services`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/solutions`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/case-studies`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/company`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/resources`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/privacy`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      lastModified: now,
    },
    {
      url: `${baseUrl}/${locale}/terms`,
      changeFrequency: "yearly" as const,
      priority: 0.3,
      lastModified: now,
    },
  ]);

  return [
    // Non-localized routes first (for discovery)
    ...nonLocalizedRoutes,
    ...nonLocalizedServiceRoutes,
    ...nonLocalizedBlogRoutes,
    ...nonLocalizedCaseStudyRoutes,
    // Localized routes (primary content)
    ...localeHomePages,
    ...mainPages,
    ...serviceRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
  ];
}
