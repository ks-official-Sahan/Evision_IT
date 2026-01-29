/* ============================================================================
   Root Page - Redirect to default locale
   
   This page handles requests to the root path (/) by redirecting to the
   default locale route (e.g., /en). The proxy middleware in proxy.ts
   will handle most requests, but this provides a fallback redirect.
   ============================================================================ */

import { redirect } from "next/navigation";
import { DEFAULT_LOCALE } from "@/lib/config";

export default function RootPage() {
  redirect(`/${DEFAULT_LOCALE}`);
}
