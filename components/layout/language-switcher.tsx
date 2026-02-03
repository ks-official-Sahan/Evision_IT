"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SUPPORTED_LOCALES, LOCALE_LABELS, type Locale } from "@/lib/config";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  currentLocale: Locale;
  className?: string;
  variant?: "outline" | "ghost";
}

export function LanguageSwitcher({
  currentLocale,
  className,
  variant = "outline",
}: LanguageSwitcherProps) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (newLocale: Locale) => {
    // Replace the current locale in the pathname with the new one
    const segments = pathname.split("/");

    // The first segment after "/" is the locale
    if (
      segments.length > 1 &&
      SUPPORTED_LOCALES.includes(segments[1] as Locale)
    ) {
      segments[1] = newLocale;
    } else {
      // If no locale in path, prepend it
      segments.splice(1, 0, newLocale);
    }

    const newPath = segments.join("/") || `/${newLocale}`;
    router.push(newPath);
  };

  const currentLabel = LOCALE_LABELS[currentLocale];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={variant}
          size="sm"
          className={cn("gap-2 h-9", className)}
          aria-label="Select language"
        >
          <Globe className="h-5 w-5" />
          {/* <span className="hidden sm:inline">{currentLabel.name}</span> */}
          <span className="text-sm">{currentLocale.toUpperCase()}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {SUPPORTED_LOCALES.map((locale) => {
          const label = LOCALE_LABELS[locale];
          const isActive = locale === currentLocale;

          return (
            <DropdownMenuItem
              key={locale}
              onClick={() => handleLocaleChange(locale)}
              className={cn(
                "flex items-center justify-between cursor-pointer",
                isActive && "bg-accent",
              )}
            >
              <div className="flex flex-col">
                <span className="font-medium">{label.label}</span>
                <span className="text-xs text-muted-foreground">
                  {label.nativeName}
                </span>
              </div>
              {isActive && <Check className="h-4 w-4 text-accent-foreground" />}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
