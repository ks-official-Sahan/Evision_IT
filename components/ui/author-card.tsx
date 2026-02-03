import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";
import { cn } from "@/lib/utils";

interface AuthorCardProps {
  name: string;
  role: string;
  avatar?: string;
  linkedin?: string;
  className?: string;
  variant?: "inline" | "card";
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function AuthorCard({
  name,
  role,
  avatar,
  linkedin,
  className,
  variant = "inline",
}: AuthorCardProps) {
  if (variant === "card") {
    return (
      <div
        className={cn(
          "flex flex-col items-center p-6 rounded-xl",
          "bg-card/80 backdrop-blur-md border border-border/50",
          className,
        )}
      >
        {/* Avatar */}
        <div className="relative w-20 h-20 rounded-full overflow-hidden mb-4 ring-2 ring-accent/30 ring-offset-2 ring-offset-background">
          {avatar ? (
            <Image
              src={avatar}
              alt={`${name}'s profile photo`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
              {getInitials(name)}
            </div>
          )}
        </div>

        {/* Name */}
        <h4 className="font-semibold text-foreground text-lg">{name}</h4>

        {/* Role */}
        <p className="text-sm text-muted-foreground mb-3">{role}</p>

        {/* LinkedIn link */}
        {linkedin && (
          <Link
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm text-accent hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
            aria-label={`Visit ${name}'s LinkedIn profile`}
          >
            <Linkedin className="w-4 h-4" aria-hidden="true" />
            <span>Connect</span>
          </Link>
        )}
      </div>
    );
  }

  // Inline variant (default)
  return (
    <div className={cn("flex items-center gap-3", className)}>
      {/* Avatar */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden ring-1 ring-border shrink-0">
        {avatar ? (
          <Image
            src={avatar}
            alt={`${name}'s profile photo`}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-accent/20 flex items-center justify-center text-accent font-medium text-sm">
            {getInitials(name)}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col min-w-0">
        <span className="font-medium text-foreground text-sm truncate">
          {name}
        </span>
        <span className="text-xs text-muted-foreground truncate">{role}</span>
      </div>

      {/* LinkedIn (inline) */}
      {linkedin && (
        <Link
          href={linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto text-muted-foreground hover:text-accent transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded p-1"
          aria-label={`Visit ${name}'s LinkedIn profile`}
        >
          <Linkedin className="w-4 h-4" aria-hidden="true" />
        </Link>
      )}
    </div>
  );
}
