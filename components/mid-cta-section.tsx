"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function MidCTASection() {
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-16 bg-primary text-primary-foreground">
      <div className="mx-auto max-w-4xl px-4 lg:px-8 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl text-balance">
          Ready to accelerate your digital growth?
        </h2>
        <p className="mt-4 text-primary-foreground/80 max-w-2xl mx-auto">
          Join businesses across Sri Lanka and beyond who trust Evision for their digital transformation. 
          Get expert guidance with no obligation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
          <Button
            size="lg"
            variant="secondary"
            onClick={scrollToContact}
            className="gap-2"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={scrollToContact}
            className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
          >
            Get a Quote
          </Button>
        </div>
        <p className="mt-6 text-sm text-primary-foreground/60">
          No obligation. Clear next steps. Response within 24 hours.
        </p>
      </div>
    </section>
  );
}
