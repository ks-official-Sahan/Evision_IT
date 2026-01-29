"use client";

const metrics = [
  { value: "120+", label: "Projects Delivered" },
  { value: "85%", label: "Lead Growth" },
  { value: "1.8s", label: "Faster Load Time" },
  { value: "25+", label: "Industries Served" },
];

const partners = [
  "Partner 1",
  "Partner 2",
  "Partner 3",
  "Partner 4",
  "Partner 5",
  "Partner 6",
];

export function ProofStrip() {
  return (
    <section className="py-16 lg:py-20 bg-background border-y border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 mb-12">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center">
              <div className="text-3xl font-semibold text-foreground lg:text-4xl">
                {metric.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Partner Logos */}
        <div className="border-t border-border pt-10">
          <p className="text-center text-sm text-muted-foreground mb-8">
            Trusted by leading organizations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-12">
            {partners.map((partner) => (
              <div
                key={partner}
                className="flex h-10 w-24 items-center justify-center rounded bg-muted/50 text-xs text-muted-foreground lg:w-32"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
