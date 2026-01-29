"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getValidLocale, type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { blogPosts } from "@/lib/data";
import { Calendar, User, ArrowRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface BlogPost {
  slug: string;
  title: string;
  category: string;
  description: string;
  content: string;
  date: Date;
  author: string;
}

interface PageProps {
  params: { lang: string };
}

export default function BlogPage({ params }: PageProps) {
  const locale = getValidLocale(params.lang) as Locale;
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState<string | null>(selectedCategory);
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(blogPosts.map((post) => post.category)));
  }, []);

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (searchTerm && !post.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      return true;
    });
  }, [activeCategory, searchTerm]);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  return (
    <>
      {/* Hero Section */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: "Blog", href: `/${locale}/blog` }]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              Blog
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              Latest insights and tips
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Stay updated with our latest articles on digital transformation, IT strategy, and industry trends.
            </p>
          </div>
        </Container>
      </Section>

      {/* Search and Filters */}
      <Section background="muted">
        <Container>
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filters */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Filter by Category
              </h3>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  className="text-sm"
                >
                  All Articles
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={activeCategory === category ? "default" : "outline"}
                    onClick={() => setActiveCategory(category)}
                    className="text-sm"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section>
        <Container>
          {filteredPosts.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <Link key={post.slug} href={`/${locale}/blog/${post.slug}`}>
                  <Card className="h-full glass hover:shadow-lg transition-shadow cursor-pointer overflow-hidden">
                    {/* Featured Image Placeholder */}
                    <div className="h-48 bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center">
                      <span className="text-muted-foreground text-sm">Article Image</span>
                    </div>

                    <CardHeader>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="secondary" className="text-xs">
                          {post.category}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {calculateReadTime(post.content)} min read
                        </span>
                      </div>
                      <CardTitle className="text-lg line-clamp-2">{post.title}</CardTitle>
                      <CardDescription className="line-clamp-2">
                        {post.description}
                      </CardDescription>
                    </CardHeader>

                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {formatDate(post.date)}
                          </div>
                          <div className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {post.author}
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-accent text-sm font-medium pt-2">
                          Read Article
                          <ArrowRight className="h-4 w-4" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No articles found.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setActiveCategory(null);
                  setSearchTerm("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
