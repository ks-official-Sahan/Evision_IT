'use client';

import { Section } from '@/components/ui/section';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/seo/breadcrumbs';
import type { Locale } from '@/lib/config';

interface CompanyClientProps {
  locale: Locale;
  dict: any;
}

export default function CompanyClient({ locale, dict }: CompanyClientProps) {

  return (
    <>
      <Section padding="lg" className="bg-gradient-to-b from-muted/50 to-background">
        <Container size="sm">
          <Breadcrumbs
            items={[{ label: dict.company.title, href: `/${locale}/company` }]}
            locale={locale}
          />

          <div className="mt-8 text-center">
            <Badge variant="secondary" className="mb-6">
              {dict.company.title}
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl text-balance mb-4">
              {dict.company.subtitle}
            </h1>
          </div>
        </Container>
      </Section>

      {/* Mission & Vision */}
      <Section>
        <Container>
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🎯</span>
                  {dict.company.mission}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.company.missionStatement}
                </p>
              </CardContent>
            </Card>

            <Card className="glass">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">🔮</span>
                  {dict.company.vision}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.company.visionStatement}
                </p>
              </CardContent>
            </Card>
          </div>
        </Container>
      </Section>

      {/* Core Values */}
      <Section background="muted">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {dict.company.values}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              { label: dict.company.value1, desc: dict.company.value1Desc },
              { label: dict.company.value2, desc: dict.company.value2Desc },
              { label: dict.company.value3, desc: dict.company.value3Desc },
            ].map((value, idx) => (
              <Card key={idx} className="glass">
                <CardHeader>
                  <CardTitle className="text-lg">{value.label}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{value.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
