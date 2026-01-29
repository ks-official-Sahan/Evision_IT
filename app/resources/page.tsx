import { Badge } from "@/components/ui/badge"
import { Metadata } from "next";
import { redirect } from "next/navigation";
import { blogPosts } from "@/data/blogPosts";
import Section from "@/components/ui/section";
import Container from "@/components/ui/container";
import Breadcrumbs from "@/components/ui/breadcrumbs";
import PostCard from "@/components/ui/postCard";
import EmptyState from "@/components/ui/emptyState";

/*
  DEPRECATED: This page has been moved to app/[lang]/resources/page.tsx
  All resources content is now served with full i18n support (EN, SI, TA, AR)
  
  This file is kept for backward compatibility and will redirect users.
  To access resources, use: /en/resources, /si/resources, /ta/resources, or /ar/resources
  
  To be removed in v2.0.0 after migration period.
*/

export default function ResourcesPageDeprecated() {
  redirect("/en/resources");
}

export const metadata: Metadata = {
  title: "Resources",
  description:
    "Free guides, templates, and resources to help you succeed in your digital transformation journey.",
  openGraph: {
    title: "Resources | Evision",
    description:
      "Free guides, templates, and resources to help you succeed in your digital transformation journey.",
  },
};

// For now, resources uses blog posts as guides
// In production, this could be a separate content type
const guides = blogPosts.filter((post) =>
  ["Development", "Infrastructure", "Security"].includes(post.category)
);

export function ResourcesPage() {
  return (
    <>
      {/* Hero */}
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs items={[{ label: "Resources", href: "/resources" }]} />
          <div className="text-center">
            <Badge variant="secondary" className="mb-4">
              Resources
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance">
              Guides & Resources
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
              Free guides, templates, and resources to help you succeed in your
              digital transformation journey.
            </p>
          </div>
        </Container>
      </Section>

      {/* Resources Grid */}
      <Section>
        {guides.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <PostCard key={guide.slug} post={guide} />
            ))}
          </div>
        ) : (
          <EmptyState
            variant="coming-soon"
            title="Resources coming soon"
            description="We're preparing helpful guides and resources. Check back soon or subscribe to our newsletter for updates."
            actionLabel="Subscribe to Newsletter"
            actionHref="/blog"
          />
        )}
      </Section>
    </>
  );
}
