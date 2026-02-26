import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import MortgageCalculator from "@/components/MortgageCalculator";
import SEOWrapper from "@/components/SEOWrapper";
import { metadataFor } from "@/lib/seo";

type GetStartedSubPage = {
  title: string;
  description: string;
  points: string[];
};

const getStartedSubPages: Record<string, GetStartedSubPage> = {
  faq: {
    title: "FAQ",
    description: "Answers to common questions about timelines, customization, financing, and what to expect next.",
    points: [
      "How long planning and delivery typically take",
      "What can be customized in your floor plan",
      "How we support you from consultation to move-in"
    ]
  },
  "mortgage-calculator": {
    title: "Mortgage Calculator",
    description: "Estimate monthly ownership costs and compare payment scenarios as you evaluate your options.",
    points: [
      "Model different rates and down payments",
      "Estimate budget ranges before final selections",
      "Use payment targets to guide plan decisions"
    ]
  }
};

type GetStartedSubPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(getStartedSubPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GetStartedSubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getStartedSubPages[slug];

  if (!page) {
    return {};
  }

  const fromRegistry = metadataFor(`/get-started/${slug}`);
  if (fromRegistry.title && fromRegistry.description) {
    return fromRegistry;
  }

  return {
    title: page.title,
    description: page.description
  };
}

export default async function GetStartedSubPage({ params }: GetStartedSubPageProps) {
  const { slug } = await params;
  const page = getStartedSubPages[slug];

  if (!page) {
    notFound();
  }

  const pageSlug = `/get-started/${slug}`;
  const isMortgageCalculatorPage = slug === "mortgage-calculator";

  return (
    <SEOWrapper slug={pageSlug}>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Resources</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{page.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{page.description}</p>
          </div>

          {isMortgageCalculatorPage && (
            <MortgageCalculator />
          )}

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
            <h2 className="font-heading text-2xl text-brand-blue">How This Helps You Plan</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-body">
              {page.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link href="/get-started" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
              Back to Get Started
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Ready for a Personalized Plan?"
        description="Connect with us and we will help you map your next steps based on budget, timeline, and location."
        primaryLabel="Find Your Builder"
        primaryHref="/get-started"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SEOWrapper>
  );
}
