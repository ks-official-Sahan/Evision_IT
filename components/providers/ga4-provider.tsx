"use client";

import React from "react"

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { pageview } from "@/lib/analytics";

export function GA4Provider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Track page views
    pageview(pathname);
  }, [pathname]);

  return <>{children}</>;
}
