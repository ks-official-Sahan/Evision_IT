import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { type Locale, SUPPORTED_LOCALES, siteConfig } from "@/lib/config";
import { getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/json-ld";
import { HeroArticle } from "@/components/ui/hero-article";
import { AuthorCard } from "@/components/ui/author-card";
import { GlassCardArticle } from "@/components/ui/glass-card-article";
import { articleSchema, breadcrumbSchema } from "@/lib/json-ld";
import { blogPosts, getRelatedBlogPosts } from "@/lib/data";
import {
  Calendar,
  Clock,
  Share2,
  ArrowLeft,
  Twitter,
  Linkedin,
  Link2,
  BookOpen,
} from "lucide-react";
import { ReadingProgress } from "./reading-progress";
import { NewsletterForm } from "@/components/blog/newsletter-form";

interface BlogPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.flatMap((post) => [
    { lang: "en", slug: post.slug },
    { lang: "si", slug: post.slug },
    { lang: "ta", slug: post.slug },
    { lang: "ar", slug: post.slug },
  ]);
}

export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const { slug, lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const url = `${siteConfig.url}/${locale}/blog/${post.slug}`;
  const imageUrl = post.image.startsWith("http")
    ? post.image
    : `${siteConfig.url}${post.image.startsWith("/") ? "" : "/"}${post.image}`;

  return {
    title: post.title,
    description: post.excerpt,
    keywords: [post.category, ...(post.tags || []), "blog", "article"],
    openGraph: {
      title: `${post.title} | ${siteConfig.name}`,
      description: post.excerpt,
      url,
      siteName: siteConfig.name,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      modifiedTime: post.updatedAt
        ? new Date(post.updatedAt).toISOString()
        : undefined,
      authors: [post.author.name],
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale:
        locale === "ar"
          ? "ar_AE"
          : locale === "si"
            ? "si_LK"
            : locale === "ta"
              ? "ta_LK"
              : "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [imageUrl],
    },
    alternates: {
      canonical: url,
      languages: Object.fromEntries(
        SUPPORTED_LOCALES.map((l) => [
          l,
          `${siteConfig.url}/${l}/blog/${post.slug}`,
        ]),
      ),
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug, lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedBlogPosts(slug, 3);
  const readingTime = Math.ceil(post.content.split(/\s+/).length / 200);

  const breadcrumbItems = [
    { name: "Home", url: `${siteConfig.url}/${locale}` },
    { name: "Blog", url: `${siteConfig.url}/${locale}/blog` },
    { name: post.title, url: `${siteConfig.url}/${locale}/blog/${slug}` },
  ];

  const shareUrl = `${siteConfig.url}/${locale}/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgress />

      {/* JSON-LD Markup */}
      <JsonLd data={articleSchema(post, locale)} />
      <JsonLd data={breadcrumbSchema(breadcrumbItems)} />

      {/* Hero Section */}
      <HeroArticle
        type="blog"
        breadcrumbs={[
          { label: "Home", href: `/${locale}` },
          { label: "Blog", href: `/${locale}/blog` },
          { label: post.title },
        ]}
        category={post.category}
        title={post.title}
        excerpt={post.excerpt}
        image={post.image}
        imageAlt={post.title}
        metadata={{
          date: post.publishedAt,
          readTime: readingTime,
        }}
      />

      {/* Main Content Area */}
      <main id="main-content" aria-labelledby="article-heading">
        <Section className="py-12 md:py-16">
          <Container size="sm">
            {/* Screen reader only context */}
            <span className="sr-only" id="article-heading">
              {post.title} - {post.category} article by {post.author.name}
            </span>
            <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
              {/* Main Content */}
              <article className="min-w-0">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  {/* Tags */}
                  {post.tags && post.tags.length > 0 && (
                    <div className="not-prose flex flex-wrap gap-2 mb-8">
                      {post.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs px-3 py-1"
                        >
                          #{tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Content - In production, render MDX or HTML content */}
                  <div className="space-y-6">
                    <p className="text-lg leading-relaxed">{post.content}</p>

                    <div className="not-prose bg-muted/50 rounded-xl p-6 border border-border/50">
                      <div className="flex items-center gap-2 mb-2 text-accent">
                        <BookOpen className="h-5 w-5" />
                        <span className="font-semibold">Note</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        This is a placeholder article. In production, render
                        full MDX or HTML content here with proper formatting,
                        code blocks, and embeds.
                      </p>
                    </div>
                  </div>

                  {/* Author Box */}
                  <div className="not-prose mt-12 pt-8 border-t border-border">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                      About the Author
                    </h3>
                    <div className="flex items-start gap-4 p-6 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50">
                      <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-accent/30 ring-offset-2 ring-offset-background">
                        {post.author.avatar ? (
                          <Image
                            src={post.author.avatar}
                            alt={post.author.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                            {post.author.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">
                          {post.author.name}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {post.author.role}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          A passionate technology expert sharing insights on
                          digital transformation and IT strategy.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>

              {/* Sidebar */}
              <aside className="hidden lg:block">
                <div className="sticky top-24 space-y-6">
                  {/* Share Widget */}
                  <div className="p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50">
                    <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                      <Share2 className="h-4 w-4 text-accent" />
                      Share Article
                    </h3>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:bg-[#1DA1F2] hover:text-white hover:border-[#1DA1F2]"
                      >
                        <a
                          href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on Twitter"
                        >
                          <Twitter className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className="hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2]"
                      >
                        <a
                          href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="Share on LinkedIn"
                        >
                          <Linkedin className="h-4 w-4" />
                        </a>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        className="hover:bg-accent hover:text-accent-foreground"
                        aria-label="Copy link"
                      >
                        <Link2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  {/* Article Info */}
                  <div className="p-5 rounded-xl bg-card/80 backdrop-blur-sm border border-border/50 space-y-4">
                    <div className="flex items-center gap-3 text-sm">
                      <Calendar className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Published</span>
                      <time
                        dateTime={post.publishedAt}
                        className="ml-auto font-medium text-foreground"
                      >
                        {new Date(post.publishedAt).toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          },
                        )}
                      </time>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <Clock className="h-4 w-4 text-accent" />
                      <span className="text-muted-foreground">Read time</span>
                      <span className="ml-auto font-medium text-foreground">
                        {readingTime} min
                      </span>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </Container>
        </Section>
      </main>

      {/* Related Articles - Additional reading suggestions */}
      {relatedPosts.length > 0 && (
        <Section
          className="py-12 md:py-16 bg-muted/30"
          aria-labelledby="related-articles-heading"
        >
          <Container>
            <h2
              id="related-articles-heading"
              className="text-2xl md:text-3xl font-bold text-foreground mb-8"
            >
              Related Articles
            </h2>
            {/* SEO: Related content helps with internal linking and topic authority */}
            <p className="sr-only">
              Explore more articles related to {post.category} and similar
              topics covered in this blog post.
            </p>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => {
                const relatedReadTime = Math.ceil(
                  relatedPost.content.split(/\s+/).length / 200,
                );
                return (
                  <GlassCardArticle
                    key={relatedPost.slug}
                    href={`/${locale}/blog/${relatedPost.slug}`}
                    image={relatedPost.image}
                    imageAlt={relatedPost.title}
                    category={relatedPost.category}
                    title={relatedPost.title}
                    excerpt={relatedPost.excerpt}
                    metadata={{
                      date: relatedPost.publishedAt,
                      readTime: relatedReadTime,
                    }}
                  />
                );
              })}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to Blog */}
      <Section className="py-8 md:py-12">
        <Container className="text-center">
          <Link href={`/${locale}/blog`}>
            <Button variant="outline" size="lg" className="group">
              <ArrowLeft className="h-4 w-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Button>
          </Link>
        </Container>
      </Section>

      {/* Newsletter CTA - Lead Generation */}
      <Section
        className="py-16 md:py-24 bg-linear-to-br from-accent/10 via-background to-background"
        aria-labelledby="newsletter-heading"
      >
        <Container className="text-center">
          <h2
            id="newsletter-heading"
            className="text-2xl md:text-3xl font-bold mb-4"
          >
            Stay Updated
          </h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest insights, tips, and
            industry news delivered to your inbox.
          </p>
          {/* SEO: Newsletter subscription improves user engagement metrics */}
          <p className="sr-only">
            Join thousands of professionals receiving weekly updates on
            technology trends, digital transformation strategies, and business
            growth insights from {siteConfig.name}.
          </p>
          <NewsletterForm />
        </Container>
      </Section>
    </>
  );
}
