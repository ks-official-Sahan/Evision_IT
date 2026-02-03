"use client";

import { useState, useMemo, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { type Locale } from "@/lib/config";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GlassCardArticle } from "@/components/ui/glass-card-article";
import { AuthorCard } from "@/components/ui/author-card";
import { EmptyState } from "@/components/ui/empty-state";
import { blogPosts, type BlogPost } from "@/lib/data";
import {
  Calendar,
  ArrowRight,
  Search,
  X,
  Sparkles,
  Clock,
  Tag,
  ImageOff,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogClientContentProps {
  locale: Locale;
  dict?: Record<string, unknown>;
  featuredPosts?: BlogPost[];
}

function BlogContent({
  locale,
  dict,
  featuredPosts = [],
}: BlogClientContentProps) {
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get("category");
  const searchQuery = searchParams.get("q");

  const [activeCategory, setActiveCategory] = useState<string | null>(
    selectedCategory,
  );
  const [searchTerm, setSearchTerm] = useState(searchQuery || "");
  const [featuredImageErrors, setFeaturedImageErrors] = useState<
    Record<string, boolean>
  >({});

  const blogDict = (dict?.blog || {}) as Record<string, string>;

  // Get unique categories
  const categories = useMemo(() => {
    return Array.from(new Set(blogPosts.map((post) => post.category)));
  }, []);

  // Filter blog posts
  const filteredPosts = useMemo(() => {
    return blogPosts.filter((post) => {
      if (activeCategory && post.category !== activeCategory) return false;
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        const matchesTitle = post.title.toLowerCase().includes(searchLower);
        const matchesExcerpt = post.excerpt.toLowerCase().includes(searchLower);
        const matchesTags = post.tags?.some((tag) =>
          tag.toLowerCase().includes(searchLower),
        );
        if (!matchesTitle && !matchesExcerpt && !matchesTags) return false;
      }
      return true;
    });
  }, [activeCategory, searchTerm]);

  const clearFilters = useCallback(() => {
    setActiveCategory(null);
    setSearchTerm("");
  }, []);

  const hasActiveFilters = activeCategory !== null || searchTerm.length > 0;

  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const words = content.split(/\s+/).length;
    return Math.ceil(words / wordsPerMinute);
  };

  const handleFeaturedImageError = (slug: string) => {
    setFeaturedImageErrors((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <>
      {/* Featured Posts Section - Clean Horizontal Layout */}
      {featuredPosts.length > 0 && !hasActiveFilters && (
        <Section className="py-12 md:py-16 bg-muted/20">
          <Container>
            {/* Section Header */}
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="h-5 w-5 text-accent" aria-hidden="true" />
              <h2 className="text-xl font-semibold">
                {blogDict.featured || "Featured Articles"}
              </h2>
              {/* Screen reader only description */}
              <span className="sr-only">
                Explore our top recommended articles on digital transformation,
                technology, and business growth
              </span>
            </div>

            {/* Featured Grid - Bento Style */}
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Main Featured Post */}
              {featuredPosts[0] && (
                <Link
                  href={`/${locale}/blog/${featuredPosts[0].slug}`}
                  className={cn(
                    "group relative flex flex-col overflow-hidden rounded-2xl",
                    "bg-card/90 backdrop-blur-xl border border-border/60",
                    "transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 hover:-translate-y-1",
                    "lg:row-span-2 min-h-[400px] lg:min-h-[500px]",
                  )}
                >
                  {/* Background image */}
                  <div className="absolute inset-0">
                    {!featuredImageErrors[featuredPosts[0].slug] ? (
                      <Image
                        src={featuredPosts[0].image}
                        alt={featuredPosts[0].title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                        onError={() =>
                          handleFeaturedImageError(featuredPosts[0].slug)
                        }
                      />
                    ) : (
                      <div className="absolute inset-0 bg-linear-to-br from-accent/20 via-muted to-background flex items-center justify-center">
                        <ImageOff
                          className="w-16 h-16 text-muted-foreground/40"
                          aria-hidden="true"
                        />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-linear-to-t from-card via-card/70 to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative mt-auto p-6 lg:p-8">
                    <Badge className="mb-4 bg-accent text-accent-foreground shadow-lg">
                      <Sparkles className="w-3 h-3 mr-1" aria-hidden="true" />
                      Featured
                    </Badge>
                    <Badge
                      variant="secondary"
                      className="ml-2 bg-card/80 backdrop-blur-sm"
                    >
                      {featuredPosts[0].category}
                    </Badge>

                    <h3 className="text-2xl lg:text-3xl font-bold text-foreground line-clamp-3 group-hover:text-accent transition-colors mt-3 mb-3">
                      {featuredPosts[0].title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {featuredPosts[0].excerpt}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" aria-hidden="true" />
                        {calculateReadTime(featuredPosts[0].content)} min read
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" aria-hidden="true" />
                        {new Date(
                          featuredPosts[0].publishedAt,
                        ).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Secondary Featured Posts */}
              <div className="flex flex-col gap-6">
                {featuredPosts.slice(1, 3).map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${locale}/blog/${post.slug}`}
                    className={cn(
                      "group relative flex overflow-hidden rounded-2xl",
                      "bg-card/90 backdrop-blur-xl border border-border/60",
                      "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5",
                      "min-h-[180px] lg:min-h-[220px]",
                    )}
                  >
                    {/* Side image */}
                    <div className="relative w-1/3 shrink-0">
                      {!featuredImageErrors[post.slug] ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="200px"
                          onError={() => handleFeaturedImageError(post.slug)}
                        />
                      ) : (
                        <div className="absolute inset-0 bg-linear-to-br from-accent/10 via-muted to-background flex items-center justify-center">
                          <ImageOff
                            className="w-8 h-8 text-muted-foreground/40"
                            aria-hidden="true"
                          />
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex flex-col justify-center p-5 grow">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          variant="secondary"
                          className="text-xs bg-accent/20 text-accent"
                        >
                          {post.category}
                        </Badge>
                        <Badge className="text-xs bg-accent/80 text-accent-foreground">
                          <Sparkles className="w-2.5 h-2.5 mr-0.5" />
                          Featured
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors mb-2">
                        {post.title}
                      </h3>

                      <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 text-xs text-muted-foreground mt-auto">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                          {calculateReadTime(post.content)} min
                        </span>
                        <AuthorCard
                          name={post.author.name}
                          role={post.author.role}
                          avatar={post.author.avatar}
                          variant="inline"
                          className="scale-90 origin-left"
                        />
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Search and Filters */}
      <Section
        className="py-8 md:py-12 bg-muted/30 border-y border-border/30"
        aria-labelledby="blog-filters-heading"
      >
        <Container>
          {/* Screen reader heading */}
          <h2 id="blog-filters-heading" className="sr-only">
            Search and filter blog articles
          </h2>

          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <label htmlFor="blog-search" className="sr-only">
                Search articles by title, content, or tags
              </label>
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground"
                aria-hidden="true"
              />
              <Input
                id="blog-search"
                type="search"
                placeholder={blogDict.searchPlaceholder || "Search articles..."}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-10 h-12 bg-card/80 backdrop-blur-sm border-border/50 focus:border-accent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-muted transition-colors"
                  aria-label="Clear search"
                >
                  <X className="h-4 w-4 text-muted-foreground" />
                </button>
              )}
            </div>

            {/* Category Filters */}
            <div>
              <h3
                id="category-filters-heading"
                className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4 flex items-center gap-2"
              >
                <Tag className="h-4 w-4 text-accent" aria-hidden="true" />
                {blogDict.filterByCategory || "Categories"}
              </h3>
              <div
                className="flex flex-wrap gap-2"
                role="group"
                aria-labelledby="category-filters-heading"
              >
                <Button
                  variant={activeCategory === null ? "default" : "outline"}
                  onClick={() => setActiveCategory(null)}
                  size="sm"
                  aria-pressed={activeCategory === null}
                  className={cn(
                    "transition-all",
                    activeCategory === null && "shadow-md",
                  )}
                >
                  {blogDict.allCategories || "All"}
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      activeCategory === category ? "default" : "outline"
                    }
                    onClick={() => setActiveCategory(category)}
                    size="sm"
                    aria-pressed={activeCategory === category}
                    className={cn(
                      "transition-all",
                      activeCategory === category && "shadow-md",
                    )}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Active filters summary */}
            {hasActiveFilters && (
              <div
                className="flex items-center gap-3 pt-2 border-t border-border/30"
                role="status"
                aria-live="polite"
              >
                <span className="text-sm text-muted-foreground">
                  Active filters:
                </span>
                <div className="flex flex-wrap gap-2">
                  {searchTerm && (
                    <Badge
                      variant="secondary"
                      className="gap-1 pr-1 bg-accent/20 text-accent"
                    >
                      &quot;{searchTerm}&quot;
                      <button
                        onClick={() => setSearchTerm("")}
                        className="ml-1 p-0.5 rounded-full hover:bg-accent/30 transition-colors"
                        aria-label="Remove search filter"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                  {activeCategory && (
                    <Badge
                      variant="secondary"
                      className="gap-1 pr-1 bg-accent/20 text-accent"
                    >
                      {activeCategory}
                      <button
                        onClick={() => setActiveCategory(null)}
                        className="ml-1 p-0.5 rounded-full hover:bg-accent/30 transition-colors"
                        aria-label={`Remove ${activeCategory} filter`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-muted-foreground hover:text-foreground"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Blog Posts Grid */}
      <Section className="py-12 md:py-16" aria-labelledby="articles-heading">
        <Container>
          {/* Screen reader heading */}
          <h2 id="articles-heading" className="sr-only">
            All blog articles
          </h2>

          {filteredPosts.length > 0 ? (
            <>
              {/* Results count */}
              <p
                className="text-sm text-muted-foreground mb-6"
                role="status"
                aria-live="polite"
              >
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </p>

              {/* Grid - uniform height cards */}
              <div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                role="list"
              >
                {filteredPosts.map((post, index) => (
                  <div key={post.slug} role="listitem">
                    <GlassCardArticle
                      href={`/${locale}/blog/${post.slug}`}
                      image={post.image}
                      imageAlt={post.title}
                      category={post.category}
                      title={post.title}
                      excerpt={post.excerpt}
                      metadata={{
                        date: post.publishedAt,
                        readTime: calculateReadTime(post.content),
                        author: post.author.name,
                      }}
                      className={cn(
                        "h-full animate-fade-in",
                        `stagger-${Math.min(index + 1, 5)}`,
                      )}
                    />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <EmptyState
              icon={<Search className="h-12 w-12" />}
              title={blogDict.noResults || "No articles found"}
              description="Try adjusting your search or filters to find what you're looking for."
              action={
                <Button variant="outline" onClick={clearFilters}>
                  {blogDict.clearFilters || "Clear Filters"}
                </Button>
              }
            />
          )}
        </Container>
      </Section>
    </>
  );
}

export function BlogClientContent({
  locale,
  dict,
  featuredPosts,
}: BlogClientContentProps) {
  return (
    <Suspense fallback={<div className="h-96" />}>
      <BlogContent locale={locale} dict={dict} featuredPosts={featuredPosts} />
    </Suspense>
  );
}
