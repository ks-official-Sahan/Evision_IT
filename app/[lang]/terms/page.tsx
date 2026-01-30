import { type Locale } from "@/lib/config";
import { getDictionary, getValidLocale } from "@/lib/i18n/get-dict";
import { Section } from "@/components/ui/section";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Breadcrumbs } from "@/components/seo/breadcrumbs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.terms.title} | Evision IT`,
    description: dict.terms.acceptance,
    robots: "noindex,follow",
  };
}

export default async function TermsPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <Section
        padding="lg"
        className="bg-gradient-to-b from-muted/50 to-background"
      >
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: dict.terms.title, href: `/${locale}/terms` }]}
          />

          <div className="mt-8">
            <Badge variant="secondary" className="mb-6">
              {dict.terms.title}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {dict.terms.title}
            </h1>
            <p className="text-muted-foreground">
              {dict.terms.lastUpdated}: January 28, 2025
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {dict.terms.acceptance}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using this website, you accept and agree to be
                bound by the terms and provision of this agreement.
              </p>
            </div>

            {[
              {
                title: dict.terms.acceptanceUse,
                content:
                  "You agree to use this website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment.",
              },
              {
                title: dict.terms.intellectualProperty,
                content:
                  "All content on this website, including text, graphics, logos, images, and software, is the property of Evision IT or its content suppliers.",
              },
              {
                title: dict.terms.limitation,
                content:
                  "In no event shall Evision IT be liable for any damages (including, without limitation, damages for loss of data or profit) arising out of the use or inability to use the materials.",
              },
              {
                title: dict.terms.changes,
                content:
                  "Evision IT reserves the right to modify these terms and conditions at any time. Changes will be effective immediately upon posting.",
              },
            ].map((section, idx) => (
              <Card key={idx} className="glass">
                <CardHeader>
                  <CardTitle>{section.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {section.content}
                  </p>
                </CardContent>
              </Card>
            ))}

            <Card className="glass border-accent/20">
              <CardHeader>
                <CardTitle>{dict.terms.contact}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these terms, contact us at
                  legal@evisionit.com
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
