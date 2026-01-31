"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { siteConfig, navLinks, type Locale } from "@/lib/config";
import { cn } from "@/lib/utils";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import ThemeSwitcher from "@/components/layout/theme-switcher";
import { useTheme } from "next-themes";

interface SiteHeaderProps {
  locale?: Locale;
}

export function SiteHeader({ locale = "en" }: SiteHeaderProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const { resolvedTheme } = useTheme();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use dark logo for light theme, light logo for dark theme
  const logoSrc =
    mounted && resolvedTheme === "dark"
      ? "/logo/logo_light.png"
      : "/logo/logo_dark.png";

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border"
          : "bg-transparent",
      )}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            {mounted ? (
              <Image
                src={logoSrc}
                alt={siteConfig.name}
                width={140}
                height={40}
                className="h-8 w-auto"
                priority
              />
            ) : (
              <span className="text-xl font-bold text-foreground">
                {siteConfig.name}
              </span>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === `/${locale}`
                  : pathname.startsWith(`/${locale}${link.href}`);
              const href =
                link.href === "/" ? `/${locale}` : `/${locale}${link.href}`;
              return (
                <Link
                  key={link.href}
                  href={href}
                  className={cn(
                    "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeSwitcher />
            <Button asChild>
              <Link href={`/${locale}/contact`}>Get Started</Link>
            </Button>
          </div>

          {/* Mobile Actions */}
          <div className="flex lg:hidden items-center gap-2">
            <LanguageSwitcher currentLocale={locale} />
            <ThemeSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[350px]">
                <SheetHeader>
                  <SheetTitle>{siteConfig.name}</SheetTitle>
                </SheetHeader>
                <nav className="mt-8 flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const isActive =
                      link.href === "/"
                        ? pathname === `/${locale}`
                        : pathname.startsWith(`/${locale}${link.href}`);
                    const href =
                      link.href === "/"
                        ? `/${locale}`
                        : `/${locale}${link.href}`;
                    return (
                      <Link
                        key={link.href}
                        href={href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "px-4 py-3 text-base font-medium rounded-md transition-colors",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground hover:text-foreground hover:bg-muted",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                  <div className="mt-4 pt-4 border-t border-border">
                    <Button asChild className="w-full">
                      <Link
                        href={`/${locale}/contact`}
                        onClick={() => setIsOpen(false)}
                      >
                        Get Started
                      </Link>
                    </Button>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </header>
  );
}
