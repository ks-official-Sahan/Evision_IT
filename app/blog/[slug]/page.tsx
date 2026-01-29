import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { PostCard } from "@/components/cards/post-card";
import { articleSchema } from "@/lib/json-ld";
import { siteConfig } from "@/lib/config";
import { blogPosts, getBlogPostBySlug, getRelatedPosts } from "@/lib/data";
import { Clock, Calendar, ArrowLeft } from "lucide-react";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author.name }],
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `${siteConfig.url}/blog/${post.slug}`,
      images: [{ url: post.image }],
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(slug, 3);
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <JsonLd data={articleSchema(post)} />

      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[
              { label: "Blog", href: "/blog" },
              { label: post.title, href: `/blog/${post.slug}` },
            ]}
          />

          <Button asChild variant="ghost" size="sm" className="mb-6 -ml-2">
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <Badge variant="secondary" className="mb-4">
            {post.category}
          </Badge>
          <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {post.title}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-foreground">{post.author.name}</p>
                <p className="text-sm text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {formattedDate}
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readingTime} min read
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Image */}
      <Section padding="none">
        <Container>
          <div className="relative aspect-video overflow-hidden rounded-xl bg-muted">
            <Image
              src={post.image || "/placeholder.svg"}
              alt={post.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>
        </Container>
      </Section>

      {/* Article Content */}
      <Section>
        <Container size="sm">
          <article className="prose prose-neutral dark:prose-invert max-w-none">
            {/* In a real app, this would render the actual blog content */}
            <p>
              This is placeholder content for the article. In a production
              environment, this would be rendered from a CMS like Contentful,
              Sanity, or a markdown file.
            </p>
            <h2>Key Takeaways</h2>
            <p>
              The content would include formatted text, images, code blocks, and
              other rich media elements.
            </p>
          </article>

          {/* Tags */}
          <div className="mt-10 pt-6 border-t border-border">
            <h3 className="text-sm font-medium text-foreground mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="outline">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </Container>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section background="muted">
          <div className="text-center mb-10">
            <Badge variant="secondary" className="mb-4">
              Related Articles
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground">
              Continue reading
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedPosts.map((relatedPost) => (
              <PostCard key={relatedPost.slug} post={relatedPost} />
            ))}
          </div>
        </Section>
      )}

      {/* CTA */}
      <Section background="primary" className="text-center">
        <div className="mx-auto max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to start your project?
          </h2>
          <p className="mt-4 text-lg opacity-90">
            Let&apos;s discuss how we can help bring your ideas to life.
          </p>
          <div className="mt-8">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
