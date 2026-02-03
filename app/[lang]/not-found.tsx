import Link from "next/link";
import {
  Home,
  ArrowLeft,
  Search,
  FileQuestion,
  HelpCircle,
  Mail,
  Map,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] flex items-center justify-center py-20 relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />

      <Container size="lg" className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Column: Visual & 404 Status */}
          <div className="order-2 lg:order-1 relative">
            <div className="relative z-10">
              <div className="text-[12rem] sm:text-[15rem] font-bold text-muted-foreground/10 leading-none select-none tracking-tighter mix-blend-multiply dark:mix-blend-overlay">
                404
              </div>
              <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 text-center">
                <div className="text-4xl sm:text-5xl font-bold bg-clip-text text-transparent bg-linear-to-r from-brand-primary to-accent mb-4">
                  Page Not Found
                </div>
                <p className="text-muted-foreground text-lg max-w-md mx-auto">
                  We checked everywhere, but we couldn&apos;t find the page you
                  were looking for.
                </p>
              </div>
            </div>

            {/* Decorative Liquid Glass Elements */}
            <div
              className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full border border-border/40 bg-background/10 backdrop-blur-md shadow-xl animate-float dark:border-white/20 dark:bg-white/5"
              style={{ animationDelay: "0s" }}
            />
            <div
              className="absolute bottom-1/4 left-1/4 w-24 h-24 rounded-full border border-border/40 bg-background/10 backdrop-blur-md shadow-xl animate-float dark:border-white/20 dark:bg-white/5"
              style={{ animationDelay: "2s" }}
            />
          </div>

          {/* Right Column: Bento Grid Navigation & Actions */}
          <div className="order-1 lg:order-2 space-y-8">
            <div className="space-y-2">
              <h1 className="text-2xl font-bold tracking-tight text-foreground">
                Let&apos;s get you back on track
              </h1>
              <p className="text-muted-foreground">
                Here are some helpful links to guide you back to safety.
              </p>
            </div>

            {/* Bento Grid Quick Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Home Card */}
              <Link href="/" className="group block">
                <div className="h-full p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 hover:border-accent/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="h-10 w-10 rounded-full bg-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-accent">
                      <Home className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                      Home Page
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Return to the main landing page.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Services Card */}
              <Link href="/services" className="group block">
                <div className="h-full p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 hover:border-accent/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="h-10 w-10 rounded-full bg-brand-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 text-brand-primary dark:text-brand-primary">
                      <Search className="h-5 w-5" />
                    </div>
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                      Our Services
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Explore our full range of solutions.
                    </p>
                  </div>
                </div>
              </Link>

              {/* Contact Card */}
              <Link href="/contact" className="group block sm:col-span-2">
                <div className="h-full p-6 rounded-2xl border border-border bg-card/50 hover:bg-card/80 hover:border-accent/30 hover:shadow-lg transition-all duration-300 relative overflow-hidden flex items-center gap-6">
                  <div className="absolute inset-0 bg-linear-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="h-12 w-12 shrink-0 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 text-foreground">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="relative z-10">
                    <h3 className="font-semibold text-lg mb-1 group-hover:text-accent transition-colors">
                      Need Assistance?
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Our support team is ready to help you find exactly what
                      you need.
                    </p>
                  </div>
                  <div className="ml-auto">
                    <ArrowLeft className="h-5 w-5 rotate-180 text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <HelpCircle className="h-4 w-4" />
              <span>Lost? Try using the search bar in the header.</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
