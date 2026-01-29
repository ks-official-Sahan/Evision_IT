"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, MessageCircle, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Solutions", href: "#solutions" },
  { label: "Services", href: "#services" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "Resources", href: "#resources" },
  { label: "Company", href: "#company" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [activeSection, setActiveSection] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      const sections = navLinks.map((link) => link.href.slice(1));
      const scrollPosition = window.scrollY + 120;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      setActiveSection("");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8"
        aria-label="Main navigation"
      >
        <a
          href="#"
          className="text-xl font-semibold tracking-tight text-foreground"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          Evision
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <button
              key={link.href}
              type="button"
              onClick={() => scrollToSection(link.href)}
              className={cn(
                "px-3 py-2 text-sm font-medium transition-colors rounded-md",
                activeSection === link.href.slice(1)
                  ? "text-foreground bg-muted"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              )}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground"
            onClick={() => scrollToSection("#contact")}
          >
            Get a Quote
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="h-9 w-9 bg-transparent"
            asChild
          >
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
            >
              <MessageCircle className="h-4 w-4" />
            </a>
          </Button>
          <Button size="sm" onClick={() => scrollToSection("#contact")}>
            Book Free Consultation
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-sm">
            <div className="flex flex-col gap-6 pt-6">
              <div className="flex items-center justify-between">
                <span className="text-lg font-semibold">Menu</span>
              </div>
              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <button
                    key={link.href}
                    type="button"
                    onClick={() => scrollToSection(link.href)}
                    className={cn(
                      "px-4 py-3 text-left text-base font-medium transition-colors rounded-lg",
                      activeSection === link.href.slice(1)
                        ? "text-foreground bg-muted"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  onClick={() => scrollToSection("#contact")}
                  className="w-full"
                >
                  Get a Quote
                </Button>
                <Button
                  onClick={() => scrollToSection("#contact")}
                  className="w-full"
                >
                  Book Free Consultation
                </Button>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a
                    href="https://wa.me/1234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
