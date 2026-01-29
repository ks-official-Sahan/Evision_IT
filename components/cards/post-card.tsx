"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/lib/data";

interface PostCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export function PostCard({ post, variant = "default", className }: PostCardProps) {
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  if (variant === "compact") {
    return (
      <Link href={`/blog/${post.slug}`}>
        <Card className={cn("group h-full transition-colors hover:border-accent", className)}>
          <CardContent className="flex gap-4 p-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-md bg-muted">
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.title}
                fill
                className="object-cover"
                sizes="64px"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-foreground line-clamp-2 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {formattedDate}
              </p>
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/blog/${post.slug}`}>
      <Card
        className={cn(
          "group h-full overflow-hidden transition-all hover:shadow-lg hover:border-accent",
          className
        )}
      >
        <div className="relative aspect-video overflow-hidden bg-muted">
          <Image
            src={post.image || "/placeholder.svg"}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <CardContent className="p-5">
          <Badge variant="secondary">{post.category}</Badge>
          <h3 className="mt-3 font-semibold text-foreground line-clamp-2 group-hover:text-accent transition-colors">
            {post.title}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {post.excerpt}
          </p>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={post.author.avatar || "/placeholder.svg"} alt={post.author.name} />
                <AvatarFallback>
                  {post.author.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">
                {post.author.name}
              </span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="h-3 w-3" />
              {post.readingTime} min
            </div>
          </div>

          <div className="mt-4 flex items-center text-sm font-medium text-accent">
            Read article
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
