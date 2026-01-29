"use client";

import Link from "next/link";
import { Button } from "./button";
import { ArrowRight, MessageCircle } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { analytics } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface CTAGroupProps {
  primaryText?: string;
  primaryHref?: string;
  secondaryText?: string;
  secondaryHref?: string;
  showWhatsApp?: boolean;
  align?: "left" | "center";
  size?: "default" | "lg";
  className?: string;
}

export function CTAGroup({
  primaryText = "Book Consultation",
  primaryHref = "/contact",
  secondaryText,
  secondaryHref,
  showWhatsApp = false,
  align = "left",
  size = "default",
  className,
}: CTAGroupProps) {
  const handleWhatsAppClick = () => {
    analytics.whatsappClick(window.location.pathname);
  };

  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row gap-3",
        {
          "items-center justify-center": align === "center",
          "items-start": align === "left",
        },
        className
      )}
    >
      <Button asChild size={size === "lg" ? "lg" : "default"}>
        <Link href={primaryHref}>
          {primaryText}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>

      {secondaryText && secondaryHref && (
        <Button asChild variant="outline" size={size === "lg" ? "lg" : "default"}>
          <Link href={secondaryHref}>{secondaryText}</Link>
        </Button>
      )}

      {showWhatsApp && (
        <Button
          asChild
          variant="outline"
          size={size === "lg" ? "lg" : "default"}
          className="gap-2 bg-transparent"
          onClick={handleWhatsAppClick}
        >
          <a
            href={siteConfig.links.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Contact us on WhatsApp"
          >
            <MessageCircle className="h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      )}
    </div>
  );
}
