'use client';

import React from "react"

import { cn } from "@/lib/utils";
import { FileQuestion, Search, FolderOpen, AlertCircle } from "lucide-react";
import { Button } from "./button";
import Link from "next/link";

type EmptyStateVariant = "no-results" | "no-data" | "error" | "coming-soon";

interface EmptyStateProps {
  variant?: EmptyStateVariant;
  title?: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  onAction?: () => void;
  className?: string;
}

const defaultContent: Record<
  EmptyStateVariant,
  { icon: React.ElementType; title: string; description: string }
> = {
  "no-results": {
    icon: Search,
    title: "No results found",
    description:
      "We couldn't find what you're looking for. Try adjusting your search or filters.",
  },
  "no-data": {
    icon: FolderOpen,
    title: "Nothing here yet",
    description: "Content is being prepared. Check back soon.",
  },
  error: {
    icon: AlertCircle,
    title: "Something went wrong",
    description:
      "We encountered an error loading this content. Please try again.",
  },
  "coming-soon": {
    icon: FileQuestion,
    title: "Coming soon",
    description:
      "This section is under development. We're working hard to bring you great content.",
  },
};

export function EmptyState({
  variant = "no-data",
  title,
  description,
  actionLabel,
  actionHref,
  onAction,
  className,
}: EmptyStateProps) {
  const content = defaultContent[variant];
  const Icon = content.icon;

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Icon className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-foreground">
        {title || content.title}
      </h3>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        {description || content.description}
      </p>
      {(actionLabel && actionHref) || onAction ? (
        <div className="mt-6">
          {actionHref ? (
            <Button asChild>
              <Link href={actionHref}>{actionLabel}</Link>
            </Button>
          ) : (
            <Button onClick={onAction}>{actionLabel}</Button>
          )}
        </div>
      ) : null}
    </div>
  );
}
