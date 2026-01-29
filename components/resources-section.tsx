"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, BookOpen, Mail } from "lucide-react";

const resources = [
  {
    id: 1,
    title: "10 Signs Your Website Needs a Redesign",
    tag: "Web Development",
    excerpt:
      "Is your website holding back your business? Learn the key indicators that it's time for a refresh.",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "E-commerce SEO: A Complete Guide for 2026",
    tag: "Marketing",
    excerpt:
      "Master the latest SEO strategies to drive organic traffic and boost your online store's visibility.",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Mobile App Development: Native vs Cross-Platform",
    tag: "App Development",
    excerpt:
      "Explore the pros and cons of each approach to make the right choice for your mobile project.",
    readTime: "6 min read",
  },
];

export function ResourcesSection() {
  const [email, setEmail] = useState("");

  return (
    <section id="resources" className="py-16 lg:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <Badge variant="secondary" className="mb-4">
              Resources
            </Badge>
            <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
              Insights & guides
            </h2>
            <p className="mt-2 text-muted-foreground">
              Expert knowledge to help you make informed decisions.
            </p>
          </div>
          <Button variant="outline" className="gap-2 self-start sm:self-auto bg-transparent">
            View all resources
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          {/* Resource Cards */}
          {resources.map((resource) => (
            <Card
              key={resource.id}
              className="group cursor-pointer border-border hover:border-accent/50 transition-all hover:shadow-md"
            >
              <CardHeader className="pb-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-muted-foreground mb-3">
                  <BookOpen className="h-5 w-5" />
                </div>
                <Badge variant="secondary" className="w-fit text-xs">
                  {resource.tag}
                </Badge>
                <h3 className="text-base font-semibold text-foreground mt-2 group-hover:text-accent transition-colors">
                  {resource.title}
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-3">
                  {resource.excerpt}
                </p>
                <span className="text-xs text-muted-foreground">
                  {resource.readTime}
                </span>
              </CardContent>
            </Card>
          ))}

          {/* Newsletter Card */}
          <Card className="border-accent/30 bg-accent/5">
            <CardHeader className="pb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-accent-foreground mb-3">
                <Mail className="h-5 w-5" />
              </div>
              <h3 className="text-base font-semibold text-foreground">
                Stay updated
              </h3>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Get the latest insights and tips delivered to your inbox.
              </p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setEmail("");
                }}
                className="space-y-3"
              >
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="Email address"
                />
                <Button type="submit" className="w-full">
                  Subscribe
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
