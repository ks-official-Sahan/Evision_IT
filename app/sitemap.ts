import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/config";
import { services, blogPosts, caseStudies } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  const locales = ["en", "si", "ta", "ar"];

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      changeFrequency: "weekly",
      priority: 1,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/en`,
      changeFrequency: "weekly",
      priority: 0.9,
      lastModified: new Date(),
    },
  ];

  // Service pages
  const serviceRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    services.map((service) => ({
      url: `${baseUrl}/${locale}/services/${service.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    }))
  );

  // Blog posts
  const blogRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    blogPosts.map((post) => ({
      url: `${baseUrl}/${locale}/blog/${post.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
      lastModified: new Date(post.date),
    }))
  );

  // Case studies
  const caseStudyRoutes: MetadataRoute.Sitemap = locales.flatMap((locale) =>
    caseStudies.map((study) => ({
      url: `${baseUrl}/${locale}/case-studies/${study.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    }))
  );

  // Main section pages
  const mainPages: MetadataRoute.Sitemap = locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}/services`,
      changeFrequency: "weekly" as const,
      priority: 0.9,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${locale}/blog`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${locale}/case-studies`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
      lastModified: new Date(),
    },
    {
      url: `${baseUrl}/${locale}/contact`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      lastModified: new Date(),
    },
  ]);

  return [
    ...staticRoutes,
    ...mainPages,
    ...serviceRoutes,
    ...blogRoutes,
    ...caseStudyRoutes,
  ];
}
