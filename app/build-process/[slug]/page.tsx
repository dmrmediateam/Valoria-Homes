import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import SEOWrapper from "@/components/SEOWrapper";
import { metadataFor } from "@/lib/seo";

type BuildProcessSubPage = {
  title: string;
  description: string;
  points: string[];
};

const buildProcessSubPages: Record<string, BuildProcessSubPage> = {
  "building-green": {
    title: "Building Green",
    description: "Learn how our modular approach supports energy efficiency and material-conscious construction.",
    points: [
      "Factory-controlled processes that reduce material waste",
      "Efficient home systems and insulation strategies",
      "Long-term durability that supports lower lifecycle costs"
    ]
  },
  "design-and-ordering-process": {
    title: "Design and Ordering Process",
    description: "A clear planning path from your first consultation through approvals and production scheduling.",
    points: [
      "Choose a plan and align it to your lot and priorities",
      "Confirm finish selections, upgrades, and specifications",
      "Finalize timelines and order details with confidence"
    ]
  },
  "modular-construction": {
    title: "Modular Construction",
    description: "Understand how precision factory construction improves consistency and timeline reliability.",
    points: [
      "Built in controlled environments for tighter quality control",
      "Concurrent site prep and home construction timelines",
      "Engineered sections designed for accurate on-site assembly"
    ]
  },
  "modular-vs-manufactured": {
    title: "Modular vs. Manufactured",
    description: "A practical comparison to help you understand standards, financing, and long-term value differences.",
    points: [
      "Different building codes and inspection frameworks",
      "Structural and foundation distinctions",
      "Resale and lending considerations by home type"
    ]
  },
  "precision-building": {
    title: "Precision Building",
    description: "See how repeatable factory methods deliver tighter tolerances and dependable build quality.",
    points: [
      "Standardized processes with detailed quality checks",
      "Tools and jigs that improve consistency across components",
      "Reduced weather-related variability during construction"
    ]
  },
  "site-built-vs-factory-built": {
    title: "Site Built vs. Factory Built",
    description: "Compare build environments, timeline variables, and quality controls between approaches.",
    points: [
      "Factory-built homes avoid many weather delays",
      "Centralized teams and workflows improve coordination",
      "On-site work remains critical for foundation and finish integration"
    ]
  },
  warranty: {
    title: "Warranty",
    description: "Understand the protections available and what to expect after your home is complete.",
    points: [
      "Coverage overview and key terms",
      "How service requests are handled",
      "Best practices for maintaining long-term home performance"
    ]
  }
};

type BuildProcessSubPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(buildProcessSubPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: BuildProcessSubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = buildProcessSubPages[slug];

  if (!page) {
    return {};
  }

  const fromRegistry = metadataFor(`/build-process/${slug}`);
  if (fromRegistry.title && fromRegistry.description) {
    return fromRegistry;
  }

  return {
    title: page.title,
    description: page.description
  };
}

export default async function BuildProcessSubPage({ params }: BuildProcessSubPageProps) {
  const { slug } = await params;
  const page = buildProcessSubPages[slug];

  if (!page) {
    notFound();
  }

  const pageSlug = `/build-process/${slug}`;

  return (
    <SEOWrapper slug={pageSlug}>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Build Process</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{page.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{page.description}</p>
          </div>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
            <h2 className="font-heading text-2xl text-brand-blue">Key Details</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-body">
              {page.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link href="/build-process" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
              Back to Build Process
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help Understanding the Next Step?"
        description="Talk with our team and we will walk you through timeline, pricing, and what comes next."
        primaryLabel="Get Started"
        primaryHref="/get-started"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SEOWrapper>
  );
}
