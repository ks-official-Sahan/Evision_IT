"use client";

import React, { useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { List, ChevronRight } from "lucide-react";

interface TocItem {
  id: string;
  title: string;
  level: number;
}

interface FloatingTocProps {
  items: TocItem[];
  className?: string;
  title?: string;
}

export function FloatingToc({
  items,
  className,
  title = "Contents",
}: FloatingTocProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  // Track scroll position and update active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-20% 0px -70% 0px",
        threshold: 0,
      },
    );

    items.forEach((item) => {
      const element = document.getElementById(item.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [items]);

  const scrollToSection = useCallback((id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100; // Account for fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      setActiveId(id);
      setIsOpen(false);
    }
  }, []);

  return (
    <>
      {/* Desktop Floating TOC */}
      <nav
        className={cn(
          "hidden xl:block fixed left-8 top-1/2 -translate-y-1/2 z-40",
          "w-56 max-h-[60vh] overflow-y-auto",
          "bg-card/80 backdrop-blur-md border border-border/50 rounded-xl",
          "shadow-lg shadow-black/5 dark:shadow-black/20",
          className,
        )}
        aria-label="Table of contents"
      >
        <div className="p-4 border-b border-border/50">
          <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
            <List className="h-4 w-4 text-accent" />
            {title}
          </h3>
        </div>
        <ul className="p-3 space-y-1">
          {items.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => scrollToSection(item.id)}
                className={cn(
                  "w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200",
                  "hover:bg-accent/10 hover:text-accent",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                  item.level > 1 && "pl-6 text-xs",
                  activeId === item.id
                    ? "bg-accent/15 text-accent font-medium border-l-2 border-accent"
                    : "text-muted-foreground",
                )}
              >
                <span className="flex items-center gap-2">
                  {activeId === item.id && (
                    <ChevronRight className="h-3 w-3 shrink-0" />
                  )}
                  <span className="line-clamp-2">{item.title}</span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "xl:hidden fixed bottom-24 right-4 z-50",
          "h-12 w-12 rounded-full",
          "bg-accent text-accent-foreground shadow-lg",
          "flex items-center justify-center",
          "hover:bg-accent/90 transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        )}
        aria-label="Toggle table of contents"
        aria-expanded={isOpen}
      >
        <List className="h-5 w-5" />
      </button>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="xl:hidden fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
            />

            {/* Drawer */}
            <motion.nav
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className={cn(
                "xl:hidden fixed bottom-0 left-0 right-0 z-50",
                "max-h-[70vh] overflow-y-auto",
                "bg-card border-t border-border rounded-t-2xl",
                "shadow-2xl",
              )}
              aria-label="Table of contents"
            >
              <div className="sticky top-0 p-4 border-b border-border bg-card/95 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
                    <List className="h-4 w-4 text-accent" />
                    {title}
                  </h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-muted-foreground hover:text-foreground p-2"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <ul className="p-4 space-y-1">
                {items.map((item) => (
                  <li key={item.id}>
                    <button
                      onClick={() => scrollToSection(item.id)}
                      className={cn(
                        "w-full text-left px-4 py-3 rounded-lg text-base transition-all duration-200",
                        "hover:bg-accent/10 hover:text-accent",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                        item.level > 1 && "pl-8 text-sm",
                        activeId === item.id
                          ? "bg-accent/15 text-accent font-medium"
                          : "text-muted-foreground",
                      )}
                    >
                      {item.title}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
