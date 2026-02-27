import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import MortgageCalculator from "@/components/MortgageCalculator";
import SEOWrapper from "@/components/SEOWrapper";
import { faqs } from "@/lib/data";
import { metadataFor } from "@/lib/seo";

type GetStartedSubPage = {
  title: string;
  description: string;
  points: string[];
};

const getStartedSubPages: Record<string, GetStartedSubPage> = {
  faq: {
    title: "FAQs",
    description: "Clear answers to the most common questions about timeline, customization, financing, and next steps.",
    points: [
      "Understand the full journey from consultation to move-in",
      "Know what decisions happen at each stage",
      "Plan ahead with practical expectations"
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
  },
  "homebuying-process": {
    title: "Home Buying Process",
    description:
      "A simple step-by-step path to help you buy a manufactured or mobile home with confidence and less stress.",
    points: [
      "Research models and floor plans that fit your lifestyle",
      "Set a realistic budget and financing plan",
      "Coordinate site selection, customization, and installation"
    ]
  },
  "terms-and-definitions": {
    title: "Terms & Definitions",
    description: "A quick glossary of common homebuying terms so you can make informed decisions at every step.",
    points: [
      "Learn key financing and construction terms",
      "Understand responsibilities across the process",
      "Review common terms before signing documents"
    ]
  }
};

const homeBuyingIntro = [
  "At Valoria Homes, we focus on more than just building homes. We guide you through each phase of the buying journey so the experience feels clear, organized, and manageable.",
  "Purchasing a manufactured or mobile home can be straightforward when you know what to expect. This guide walks through each step and explains how our team and your local retail partner support you from planning through move-in."
];

const homeBuyingSteps = [
  {
    title: "Step 1: Research Your Options",
    description:
      "Explore available models, floor plans, and layout styles. Visit nearby sales centers when possible so you can compare features, finishes, and design options in person."
  },
  {
    title: "Step 2: Set Your Budget",
    description:
      "Review your target price range, down payment, and monthly payment comfort level. From pre-approval to closing, your local retailer can help explain loan programs and lender options."
  },
  {
    title: "Step 3: Choose Your Site",
    description:
      "Select the location that fits your goals, whether that is private land, a home community, or a leased lot. Consider commute, schools, utilities, and neighborhood amenities."
  },
  {
    title: "Step 4: Personalize Your Home",
    description:
      "Work with your retailer to tailor your floor plan, finishes, and upgrades. This is where your day-to-day needs and design preferences come together in one final plan."
  },
  {
    title: "Step 5: Finalize, Build, and Install",
    description:
      "After selections and financing are complete, your home is scheduled for production. Your retailer then coordinates delivery and installation so your home is set correctly and ready for move-in."
  }
];

const termsAndDefinitions = [
  {
    term: "Manufactured Home",
    definition:
      "A home built in a factory to federal HUD code standards, then transported to its final location."
  },
  {
    term: "Modular Home",
    definition:
      "A home built in sections in a factory and assembled on-site to local and state building codes."
  },
  {
    term: "Pre-Approval",
    definition:
      "A lender review that estimates how much you may be able to borrow before selecting a home."
  },
  {
    term: "Down Payment",
    definition: "The upfront amount paid at purchase, typically expressed as a percentage of the total cost."
  },
  {
    term: "Loan Term",
    definition: "The length of time you have to repay your loan, such as 15, 20, or 30 years."
  },
  {
    term: "Site Preparation",
    definition:
      "Work completed on your lot before home delivery, including grading, utility setup, and foundation readiness."
  },
  {
    term: "Delivery and Set",
    definition:
      "The process of transporting the home to your site and placing it on its foundation or support system."
  },
  {
    term: "Closing",
    definition: "The final step where documents are signed, funds are finalized, and ownership is completed."
  }
];

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
  const isHomeBuyingProcessPage = slug === "homebuying-process";
  const isFaqPage = slug === "faq";
  const isTermsPage = slug === "terms-and-definitions";

  return (
    <SEOWrapper slug={pageSlug}>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Get Started</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{page.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{page.description}</p>
          </div>

          {isHomeBuyingProcessPage && (
            <>
              <div className="mt-10 grid gap-8 lg:grid-cols-2">
                <div className="space-y-4 rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
                  {homeBuyingIntro.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-brand-body sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>

                <div className="relative min-h-[320px] overflow-hidden rounded-lg border border-slate-200 shadow-card fade-in-up">
                  <Image
                    src="/images/modernresidence.jpg"
                    alt="Modern manufactured home exterior"
                    fill
                    sizes="(min-width: 1024px) 48vw, 100vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-5 text-white">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em]">Photo Area</p>
                    <p className="mt-1 text-sm">Swap this image anytime with project-specific visuals.</p>
                  </div>
                </div>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2">
                {homeBuyingSteps.map((step) => (
                  <article key={step.title} className="rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
                    <h2 className="font-heading text-2xl text-brand-blue">{step.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-brand-body">{step.description}</p>
                  </article>
                ))}
              </div>
            </>
          )}

          {isTermsPage && (
            <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
              <h2 className="font-heading text-2xl text-brand-blue">Key Terms</h2>
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {termsAndDefinitions.map((item) => (
                  <article key={item.term} className="rounded-lg border border-slate-200 bg-brand-offwhite p-4">
                    <h3 className="font-heading text-xl text-brand-blue">{item.term}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-body">{item.definition}</p>
                  </article>
                ))}
              </div>
              <Link href="/get-started" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
                Back to Get Started
              </Link>
            </div>
          )}

          {!isHomeBuyingProcessPage && !isTermsPage && (
            <>
              {isMortgageCalculatorPage && <MortgageCalculator />}

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
            </>
          )}
        </div>
      </section>

      {isFaqPage && <FAQSection items={faqs} />}

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
