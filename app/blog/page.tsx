import { Input } from "@/components/ui/input"
import { CardContent } from "@/components/ui/card"
import { CardTitle } from "@/components/ui/card"
import { CardHeader } from "@/components/ui/card"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Section, Container, Breadcrumbs, Rss, PostCard } from "@/components"
import { redirect } from "next/navigation";
import { blogPosts } from "@/data/blogPosts"; // Assuming blogPosts is imported from a data file
import { getFeaturedPosts } from "@/utils/getFeaturedPosts"; // Assuming getFeaturedPosts is imported from a utils file

/*
  DEPRECATED: This page has been moved to app/[lang]/blog/page.tsx
  All blog content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access the blog, use: /en/blog, /si/blog, /ta/blog, or /ar/blog
  
  To be removed in v2.0.0 after migration period.
*/

export default function BlogPageDeprecated() {
  redirect("/en/blog");
}

export function BlogPage() {
  const featuredPosts = getFeaturedPosts();
  const recentPosts = blogPosts.slice(0, 6);
  const categories = [...new Set(blogPosts.map((post) => post.category))];

  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Blog", href: "/blog" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Blog
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Insights & Resources
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Expert insights on technology, digital transformation, and
              business growth strategies.
            </p>
            <div className="mt-6 flex items-center justify-center gap-4">
              <Button asChild variant="outline" size="sm">
                <Link href="/rss.xml">
                  <Rss className="mr-2 h-4 w-4" />
                  RSS Feed
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Featured Posts */}
      {featuredPosts.length > 0 && (
        <Section>
          <div className="mb-8">
            <Badge variant="outline" className="mb-2">
              Featured
            </Badge>
            <h2 className="text-2xl font-semibold text-foreground">
              Featured Articles
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {featuredPosts.map((post) => (
              <PostCard key={post.slug} post={post} variant="featured" />
            ))}
          </div>
        </Section>
      )}

      {/* Recent Posts + Sidebar */}
      <Section background="muted">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Posts Grid */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold text-foreground mb-8">
              Recent Articles
            </h2>
            <div className="grid gap-6 sm:grid-cols-2">
              {recentPosts.map((post) => (
                <PostCard key={post.slug} post={post} />
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Newsletter */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Newsletter</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <form className="space-y-3">
                  <Input
                    type="email"
                    placeholder="you@example.com"
                    aria-label="Email address"
                  />
                  <Button type="submit" className="w-full">
                    Subscribe
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Categories */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant="secondary"
                      className="cursor-pointer hover:bg-accent hover:text-accent-foreground"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>
    </>
  );
}
