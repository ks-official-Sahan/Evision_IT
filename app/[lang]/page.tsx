import {
  getDictionary,
  getValidLocale,
  type Dictionary,
} from "@/lib/i18n/get-dict";
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
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { BackgroundBeams } from "@/components/ui/background-beams";

interface PageProps {
  params: Promise<{ lang: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return {
    title: dict.nav?.home || "Home",
    description:
      dict.hero?.headline || "Empowering Businesses with Digital Excellence",
  };
}

export default async function HomePage({ params }: PageProps) {
  const { lang } = await params;
  const locale = getValidLocale(lang) as Locale;
  const dict = await getDictionary(locale);

  return (
    <>
      <BackgroundBeamsWithCollision>
        <HeroSection dict={dict} locale={locale} />
      <TrustBar dict={dict} locale={locale} />
      </BackgroundBeamsWithCollision>
      <div className="relative antialiased">
        <SolutionFinderQuiz dict={dict} locale={locale} />
        <SolutionsOverview dict={dict} locale={locale} />
        <BackgroundBeams />
      </div>
      {/* <div className="relative antialiased"> */}
      <OutcomesMetrics dict={dict} locale={locale} />
      {/* <BackgroundBeams />
      </div>
      <div className="relative antialiased"> */}
      <CaseStudiesPreview dict={dict} locale={locale} />
      <ProcessSection dict={dict} locale={locale} />
      {/* <BackgroundBeams />
      </div> */}
      <div className="relative antialiased">
        <FAQSection dict={dict} locale={locale} />
        <FinalCTASection dict={dict} locale={locale} />
        <BackgroundBeams />
      </div>
    </>
  );
}
