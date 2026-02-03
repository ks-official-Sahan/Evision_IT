/* ============================================================================
   MongoDB Schema Definitions - Evision IT
   ============================================================================ */

import { z } from "zod";
import { SUPPORTED_LOCALES, type Locale } from "@/lib/config";

/* ============================================================================
   Translation Schema - Base type for localizable content
   ============================================================================ */

export const TranslationSchema = z.record(
  z.enum(SUPPORTED_LOCALES as unknown as [string, ...string[]]),
  z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    content: z.string().optional(),
    body: z.string().optional(),
    excerpt: z.string().optional(),
  }),
);

export type Translation = z.infer<typeof TranslationSchema>;

/* ============================================================================
   Quiz Submission Schema - User responses from solution finder quiz
   ============================================================================ */

export const QuizSubmissionSchema = z.object({
  _id: z.any().optional(), // MongoDB ObjectId
  step1: z.enum([
    "web-application",
    "mobile-application",
    "marketing-platform",
    "it-infrastructure",
  ]),
  step2: z.enum(["urgent", "soon", "planned", "flexible"]),
  step3: z.enum([
    "revenue-growth",
    "security-compliance",
    "efficiency",
    "speed",
  ]),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  submittedAt: z.date().default(() => new Date()),
  ipAddress: z.string().optional(),
  userAgent: z.string().optional(),
});

export type QuizSubmission = z.infer<typeof QuizSubmissionSchema>;

/* ============================================================================
   Page Schema - Static pages with translations
   ============================================================================ */

export const PageSchema = z.object({
  _id: z.string().optional(),
  slug: z.string(),
  translations: TranslationSchema,
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type Page = z.infer<typeof PageSchema>;

/* ============================================================================
   Service Schema - Service offerings with translations
   ============================================================================ */

export const ServiceSchema = z.object({
  _id: z.string().optional(),
  slug: z.string(),
  icon: z.string().optional(),
  image: z.string().optional(),
  translations: z.record(
    z.enum(SUPPORTED_LOCALES as unknown as [string, ...string[]]),
    z.object({
      name: z.string(),
      description: z.string(),
      shortDescription: z.string().optional(),
      benefits: z.array(z.string()).optional(),
      features: z.array(z.string()).optional(),
    }),
  ),
  category: z
    .enum(["digital-products", "infrastructure", "managed-support"])
    .optional(),
  price: z.number().optional(),
  areaServed: z.array(z.string()).optional(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type Service = z.infer<typeof ServiceSchema>;

/* ============================================================================
   Case Study Schema - Customer success stories
   ============================================================================ */

export const CaseStudySchema = z.object({
  _id: z.string().optional(),
  slug: z.string(),
  industry: z.string(),
  company: z.string(),
  logo: z.string().optional(),
  translations: z.record(
    z.enum(SUPPORTED_LOCALES as unknown as [string, ...string[]]),
    z.object({
      title: z.string(),
      description: z.string(),
      problem: z.string(),
      solution: z.string(),
      results: z.string(),
      testimonial: z.string().optional(),
    }),
  ),
  metrics: z
    .object({
      label: z.string(),
      value: z.string(),
      icon: z.string().optional(),
    })
    .array()
    .optional(),
  author: z
    .object({
      name: z.string(),
      role: z.string(),
      image: z.string().optional(),
    })
    .optional(),
  image: z.string().optional(),
  services: z.array(z.string()).optional(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type CaseStudy = z.infer<typeof CaseStudySchema>;

/* ============================================================================
   Blog Post Schema - Blog articles with SEO
   ============================================================================ */

export const BlogPostSchema = z.object({
  _id: z.string().optional(),
  slug: z.string(),
  category: z.string(),
  date: z.date(),
  translations: z.record(
    z.enum(SUPPORTED_LOCALES as unknown as [string, ...string[]]),
    z.object({
      title: z.string(),
      description: z.string(),
      excerpt: z.string(),
      body: z.string(),
      seoKeyword: z.string().optional(),
    }),
  ),
  author: z.object({
    name: z.string(),
    email: z.string().email().optional(),
    linkedin: z.string().optional(),
    image: z.string().optional(),
  }),
  featured: z.boolean().default(false),
  tags: z.array(z.string()).optional(),
  image: z.string().optional(),
  readTime: z.number().optional(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type BlogPost = z.infer<typeof BlogPostSchema>;

/* ============================================================================
   Testimonial Schema - Customer testimonials
   ============================================================================ */

export const TestimonialSchema = z.object({
  _id: z.string().optional(),
  company: z.string(),
  author: z.string(),
  role: z.string().optional(),
  image: z.string().optional(),
  translations: z.record(
    z.enum(SUPPORTED_LOCALES as unknown as [string, ...string[]]),
    z.object({
      quote: z.string(),
    }),
  ),
  rating: z.number().min(1).max(5).optional(),
  featured: z.boolean().default(false),
  authorCountry: z.string().optional(),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
  updatedAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type Testimonial = z.infer<typeof TestimonialSchema>;

/* ============================================================================
   Contact Submission Schema - Form submissions
   ============================================================================ */

export const ContactSubmissionSchema = z.object({
  _id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string(),
  locale: z.enum(SUPPORTED_LOCALES as unknown as [string, ...string[]]),
  status: z.enum(["new", "contacted", "converted", "spam"]).default("new"),
  createdAt: z
    .date()
    .optional()
    .default(() => new Date()),
});

export type ContactSubmission = z.infer<typeof ContactSubmissionSchema>;
