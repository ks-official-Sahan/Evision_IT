import Link from "next/link";
import { Home, Search, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16">
      <Container size="sm">
        <div className="text-center">
          {/* 404 Animation */}
          <div className="relative mb-8">
            <span className="text-[150px] sm:text-[200px] font-bold text-muted/20 select-none leading-none">
              404
            </span>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="h-20 w-20 mx-auto mb-4 rounded-full bg-accent/10 flex items-center justify-center">
                  <Search className="h-10 w-10 text-accent" />
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved. Let's
            get you back on track.
          </p>

          {/* Navigation Options */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button asChild className="gap-2">
              <Link href="/">
                <Home className="h-4 w-4" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" asChild className="gap-2">
              <Link href="/en/contact">Contact Support</Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground mb-4">
              Popular pages you might be looking for:
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/en/services"
                className="text-sm text-accent hover:underline"
              >
                Services
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/en/solutions"
                className="text-sm text-accent hover:underline"
              >
                Solutions
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/en/case-studies"
                className="text-sm text-accent hover:underline"
              >
                Case Studies
              </Link>
              <span className="text-muted-foreground">•</span>
              <Link
                href="/en/blog"
                className="text-sm text-accent hover:underline"
              >
                Blog
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
