import { getDictionary, getValidLocale } from "@/lib/i18n/get-dict";
import { type Locale } from "@/lib/config";
import { HeroSection } from "@/components/home/hero-section";
import { TrustBar } from "@/components/home/trust-bar";
import { SolutionFinderQuiz } from "@/components/home/solution-finder-quiz";
import { SolutionsOverview } from "@/components/home/solutions-overview";
import { OutcomesMetrics } from "@/components/home/outcomes-metrics";
import { CaseStudiesPreview } from "@/components/home/case-studies-preview";
import { ProcessSection } from "@/components/home/process-section";
import { FAQSection } from "@/components/home/faq-section";
import { FinalCTASection } from "@/components/home/final-cta-section";
import { GoalSelector } from "@/components/home/goal-selector"; // Added import for GoalSelector

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: "Home",
    description: dict.hero?.headline || "Empowering Businesses with Digital Excellence",
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <HeroSection />
      <TrustBar locale={locale} />
      <SolutionFinderQuiz />
      <SolutionsOverview />
      <OutcomesMetrics />
      <CaseStudiesPreview />
      <ProcessSection />
      <FAQSection />
      <FinalCTASection />
    </>
  );
}
