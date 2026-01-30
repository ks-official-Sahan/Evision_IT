import Link from "next/link";
import { Search, Home, FileQuestion } from "lucide-react";
// We don't import styled components here to keep it simple or we can use generic classes
// app/not-found.tsx renders inside app/layout.tsx, so Tailwind is available

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background text-foreground">
      <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          404 - Page Not Found
        </h1>
        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          The page you are looking for does not exist. It might have been moved
          or deleted.
        </p>
        <div className="flex gap-4 mt-6">
          <Link
            href="/"
            className="inline-flex h-11 items-center justify-center rounded-md bg-primary px-8 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            <Home className="mr-2 h-4 w-4" />
            Go Home
          </Link>
          <Link
            href="/en/contact"
            className="inline-flex h-11 items-center justify-center rounded-md border border-input bg-background px-8 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}
