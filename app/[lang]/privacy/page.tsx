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

export const dynamic = "force-static";

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.privacy.title} | Evision IT`,
    description: dict.privacy.introduction,
    robots: "noindex,follow",
  };
}

export default async function PrivacyPage({ params }: PageProps) {
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
            items={[{ label: dict.privacy.title, href: `/${locale}/privacy` }]}
          />

          <div className="mt-8">
            <Badge variant="secondary" className="mb-6">
              {dict.privacy.title}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4">
              {dict.privacy.title}
            </h1>
            <p className="text-muted-foreground">
              {dict.privacy.lastUpdated}: January 28, 2025
            </p>
          </div>
        </Container>
      </Section>

      <Section>
        <Container size="sm">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold mb-4">
                {dict.privacy.introduction}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                At Evision IT, we respect your privacy and are committed to
                protecting your personal data. This Privacy Policy explains how
                we collect, use, and protect your information.
              </p>
            </div>

            {[
              {
                title: dict.privacy.dataCollection,
                content:
                  "We collect information you provide directly, such as when you contact us, submit forms, or use our services.",
              },
              {
                title: dict.privacy.dataUse,
                content:
                  "We use your information to provide services, respond to inquiries, and improve our offerings.",
              },
              {
                title: dict.privacy.dataProtection,
                content:
                  "We implement industry-standard security measures to protect your data from unauthorized access.",
              },
              {
                title: dict.privacy.yourRights,
                content:
                  "You have the right to access, correct, and delete your personal data upon request.",
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
                <CardTitle>{dict.privacy.contact}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  For privacy inquiries, contact us at privacy@evisionit.com
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>
    </>
  );
}
