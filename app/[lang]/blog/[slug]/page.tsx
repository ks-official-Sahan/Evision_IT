import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { getValidLocale, type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { blogPosts, getRelatedBlogPosts } from "@/lib/data";
import { siteConfig } from "@/lib/config";
import { Calendar, User, Clock, Share2, ArrowLeft } from "lucide-react";

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

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `${siteConfig.url}/${locale}/blog/${post.slug}`,
      type: "article",
      publishedTime: post.date.toISOString(),
      authors: [post.author],
    },
    alternates: {
      canonical: `/${locale}/blog/${post.slug}`,
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

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    image: `${siteConfig.url}/og-image.jpg`,
    datePublished: post.date.toISOString(),
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
  };

  return (
    <>
      {/* JSON-LD Markup */}
      <JsonLd data={articleSchema} />

      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[
              { label: "Blog", href: `/${locale}/blog` },
              { label: post.title, href: `/${locale}/blog/${post.slug}` },
            ]}
            locale={locale}
          />

          <div className="mt-8">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">{post.category}</Badge>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              {post.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl text-pretty">
              {post.description}
            </p>

            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-4">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.date.toISOString()}>
                  {formatDate(post.date)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readingTime} min read</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section>
        <Container size="sm">
          <article className="prose prose-invert max-w-none dark:prose-invert">
            {/* Content HTML - In production, render MDX or HTML content */}
            <div className="space-y-6 text-foreground">
              <p className="text-lg leading-relaxed text-muted-foreground">
                {post.content.substring(0, 500)}...
              </p>
              <div className="bg-secondary/20 rounded-lg p-6 border border-border">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> This is a placeholder article. In production, render full MDX or HTML content here with proper formatting, code blocks, and embeds.
                </p>
              </div>
            </div>
          </article>
        </Container>
      </Section>

      {/* Share Section */}
      <Section background="muted">
        <Container size="sm">
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium text-foreground">Share this article</p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Articles */}
      {relatedPosts.length > 0 && (
        <Section>
          <Container>
            <h2 className="text-3xl font-bold text-foreground mb-8">Related Articles</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {relatedPosts.map((relatedPost) => (
                <Link key={relatedPost.slug} href={`/${locale}/blog/${relatedPost.slug}`}>
                  <Card className="h-full glass hover:shadow-lg transition-shadow cursor-pointer">
                    <div className="h-40 bg-gradient-to-br from-accent/20 to-secondary/20" />
                    <CardContent className="pt-6">
                      <Badge variant="secondary" className="mb-2 text-xs">
                        {relatedPost.category}
                      </Badge>
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {relatedPost.description}
                      </p>
                      <div className="text-accent text-sm font-medium">
                        Read Article →
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Back to Blog */}
      <Section className="text-center">
        <Container size="sm">
          <Button asChild variant="outline">
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </Container>
      </Section>
    </>
  );
}
