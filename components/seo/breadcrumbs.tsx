"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { breadcrumbSchema } from "@/lib/json-ld";
import { JsonLd } from "./json-ld";

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const allItems = [{ label: "Home", href: "/" }, ...items];

  const schemaItems = allItems.map((item) => ({
    name: item.label,
    url: `${siteConfig.url}${item.href}`,
  }));

  return (
    <>
      <JsonLd data={breadcrumbSchema(schemaItems)} />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground">
          {allItems.map((item, index) => {
            const isLast = index === allItems.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-1.5">
                {index > 0 && (
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                {isLast ? (
                  <span
                    className="font-medium text-foreground"
                    aria-current="page"
                  >
                    {index === 0 ? (
                      <Home className="h-4 w-4" aria-label="Home" />
                    ) : (
                      item.label
                    )}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className="transition-colors hover:text-foreground"
                  >
                    {index === 0 ? (
                      <Home className="h-4 w-4" aria-label="Home" />
                    ) : (
                      item.label
                    )}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
