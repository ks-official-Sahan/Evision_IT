/**
 * Cached Data Functions - React Server Components Optimized
 *
 * Uses React's cache() function to memoize data fetching at the request level.
 * This ensures each piece of data is only computed once per request, even if
 * multiple components need it.
 *
 * Benefits:
 * - Deduplication: Same data fetched once per request
 * - Works with cacheComponents for component-level caching
 * - Optimized for PPR (Partial Prerendering)
 */

import { cache } from "react";
import {
  services,
  blogPosts,
  caseStudies,
  generalFaqs,
  teamMembers,
  type Service,
  type BlogPost,
  type CaseStudy,
  type TeamMember,
} from "./data";

// ============================================
// CACHED SERVICE FUNCTIONS
// ============================================

/**
 * Get all services - cached per request
 */
export const getAllServices = cache((): Service[] => {
  return services;
});

/**
 * Get a service by slug - cached per request
 */
export const getServiceBySlug = cache((slug: string): Service | undefined => {
  return services.find((s) => s.slug === slug);
});

/**
 * Get services by category - cached per request
 */
export const getServicesByCategory = cache(
  (category: Service["category"]): Service[] => {
    return services.filter((s) => s.category === category);
  },
);

/**
 * Get featured services - cached per request
 */
export const getFeaturedServices = cache((): Service[] => {
  return services.filter((s) => s.isFeatured);
});

/**
 * Get related services by slugs - cached per request
 */
export const getRelatedServices = cache((slugs: string[]): Service[] => {
  return services.filter((s) => slugs.includes(s.slug));
});

// ============================================
// CACHED BLOG FUNCTIONS
// ============================================

/**
 * Get all blog posts - cached per request
 */
export const getAllBlogPosts = cache((): BlogPost[] => {
  return blogPosts;
});

/**
 * Get a blog post by slug - cached per request
 */
export const getBlogPostBySlug = cache((slug: string): BlogPost | undefined => {
  return blogPosts.find((p) => p.slug === slug);
});

/**
 * Get featured blog posts - cached per request
 */
export const getFeaturedPosts = cache((): BlogPost[] => {
  return blogPosts.filter((p) => p.featured);
});

/**
 * Get blog posts by category - cached per request
 */
export const getPostsByCategory = cache((category: string): BlogPost[] => {
  return blogPosts.filter((p) => p.category === category);
});

/**
 * Get related blog posts - cached per request
 */
export const getRelatedBlogPosts = cache(
  (currentSlug: string, limit = 3): BlogPost[] => {
    const currentPost = blogPosts.find((p) => p.slug === currentSlug);
    if (!currentPost) return [];

    return blogPosts
      .filter(
        (p) =>
          p.slug !== currentSlug &&
          (p.category === currentPost.category ||
            p.tags.some((tag) => currentPost.tags.includes(tag))),
      )
      .slice(0, limit);
  },
);

// ============================================
// CACHED CASE STUDY FUNCTIONS
// ============================================

/**
 * Get all case studies - cached per request
 */
export const getAllCaseStudies = cache((): CaseStudy[] => {
  return caseStudies;
});

/**
 * Get a case study by slug - cached per request
 */
export const getCaseStudyBySlug = cache(
  (slug: string): CaseStudy | undefined => {
    return caseStudies.find((c) => c.slug === slug);
  },
);

/**
 * Get featured case studies - cached per request
 */
export const getFeaturedCaseStudies = cache((): CaseStudy[] => {
  return caseStudies.filter((c) => c.featured);
});

/**
 * Get case studies by category - cached per request
 */
export const getCaseStudiesByCategory = cache(
  (category: string): CaseStudy[] => {
    return caseStudies.filter((c) => c.category === category);
  },
);

// ============================================
// CACHED FAQ & TEAM FUNCTIONS
// ============================================

/**
 * Get all FAQs - cached per request
 */
export const getAllFaqs = cache(() => {
  return generalFaqs;
});

/**
 * Get all team members - cached per request
 */
export const getAllTeamMembers = cache((): TeamMember[] => {
  return teamMembers;
});

// ============================================
// AGGREGATED DATA FOR PAGES
// ============================================

/**
 * Get homepage data - aggregated and cached
 */
export const getHomepageData = cache(() => {
  return {
    featuredServices: getFeaturedServices(),
    featuredPosts: getFeaturedPosts().slice(0, 3),
    featuredCaseStudies: getFeaturedCaseStudies().slice(0, 3),
  };
});

/**
 * Get services page data - aggregated and cached
 */
export const getServicesPageData = cache(() => {
  return {
    allServices: getAllServices(),
    featuredServices: getFeaturedServices(),
    categories: [
      { key: "digital", label: "Digital Products & Growth" },
      { key: "infrastructure", label: "Cloud & Infrastructure" },
      { key: "security", label: "Cybersecurity" },
      { key: "managed", label: "Managed IT Services" },
    ] as const,
  };
});

/**
 * Get blog page data - aggregated and cached
 */
export const getBlogPageData = cache(() => {
  return {
    allPosts: getAllBlogPosts(),
    featuredPosts: getFeaturedPosts(),
    categories: [...new Set(blogPosts.map((p) => p.category))],
  };
});

/**
 * Get case studies page data - aggregated and cached
 */
export const getCaseStudiesPageData = cache(() => {
  return {
    allCaseStudies: getAllCaseStudies(),
    featuredCaseStudies: getFeaturedCaseStudies(),
    categories: [...new Set(caseStudies.map((c) => c.category))],
  };
});

/**
 * Get company page data - aggregated and cached
 */
export const getCompanyPageData = cache(() => {
  return {
    teamMembers: getAllTeamMembers(),
    faqs: getAllFaqs(),
  };
});
