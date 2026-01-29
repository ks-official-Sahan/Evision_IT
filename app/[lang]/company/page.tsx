import { getValidLocale, type Locale } from '@/lib/config';
import { getDictionary } from '@/lib/i18n/get-dict';
import CompanyClient from './client';

interface PageProps {
  params: Promise<{ lang: string }>;
}

export const dynamic = 'force-static';

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: `${dict.company.title} | Evision IT`,
    description: dict.company.subtitle,
    openGraph: {
      title: dict.company.title,
      description: dict.company.subtitle,
      type: 'website',
    },
  };
}

export default async function CompanyPage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return <CompanyClient locale={locale} dict={dict} />;
}
