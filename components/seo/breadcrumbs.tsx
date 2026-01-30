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
  locale?: string;
}

export function Breadcrumbs({ items, locale = "en" }: BreadcrumbsProps) {
  const homeHref = `/${locale}`;
  const allItems = [{ label: "Home", href: homeHref }, ...items];

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
            // Ensure hrefs inside items are also localized if they aren't already absolute or localized
            // For now, assume items passed in are correctly formatted relative paths WITHOUT locale or WITH locale if controlled by caller.
            // In the page.tsx I passed `/services` and `/services/slug`. I should probably prefix them in the caller or here.
            // Caller passed: /services. I should probably handle this in caller to be cleaner, but caller lines were `/services`.
            // Wait, in previous step I changed caller to pass `/services` instead of `/${locale}/services`?
            // Actually, in the ReplacementContent above I changed it to `/services`...
            // Ah, I should have kept `/${locale}/services` in the caller if I wanted to be explicit.
            // But let's assume caller sends relative paths? No, caller sends full paths typically.
            // Let's check what I wrote to page.tsx: `href: '/services'`
            // So I need to prefix here? Or fix page.tsx?
            // Existing logic in page.tsx was `/${locale}/services`. I CHANGED IT in the tool call to just `/services`.
            // I should revert that change or handle it here.

            // Simple approach: Breadcrumbs usually take exact hrefs. The caller should be responsible for the full path.
            // My previous tool call for page.tsx removed ${locale}. That was a mistake if I don't handle it here.
            // Let's assume I will fix page.tsx or handle it.
            // If I look at the ReplaceFileContent call I made:
            // I changed `href: '/${locale}/services'` to `href: '/services'`.
            // Be consistent. The component should probably prepend locale if missing? No, that's messy.
            // It is safer to make the caller responsible.
            // So I will update this component to just use the passed locale for HOME link.

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
                    href={
                      index === 0
                        ? homeHref
                        : item.href.startsWith(`/${locale}`)
                          ? item.href
                          : `/${locale}${item.href.startsWith("/") ? "" : "/"}${item.href}`
                    }
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
