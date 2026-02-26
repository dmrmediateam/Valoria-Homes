import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import SEOWrapper from "@/components/SEOWrapper";
import { metadataFor } from "@/lib/seo";

type AboutSubPage = {
  title: string;
  description: string;
  points: string[];
};

const aboutSubPages: Record<string, AboutSubPage> = {
  "our-philosophy": {
    title: "Our Philosophy",
    description: "We build homes with practical design, durable materials, and transparent communication from start to finish.",
    points: [
      "Build quality is non-negotiable",
      "Every decision should support long-term livability",
      "Clear communication is part of the product"
    ]
  },
  "our-team": {
    title: "Our Team",
    description: "Meet the people behind Valoria Homes who guide design, planning, and build execution.",
    points: [
      "Experienced project and design coordination",
      "Builder-first collaboration throughout the process",
      "Support from consultation through move-in"
    ]
  },
  "valoria-homes-reviews": {
    title: "Valoria Homes Reviews",
    description: "Read what homeowners appreciate most about our process, communication, and final home quality.",
    points: [
      "Feedback on reliability and timeline clarity",
      "Experiences with customization and planning",
      "Homeowner perspectives after move-in"
    ]
  }
};

type AboutSubPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(aboutSubPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: AboutSubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = aboutSubPages[slug];

  if (!page) {
    return {};
  }

  const fromRegistry = metadataFor(`/about/${slug}`);
  if (fromRegistry.title && fromRegistry.description) {
    return fromRegistry;
  }

  return {
    title: page.title,
    description: page.description
  };
}

export default async function AboutSubPage({ params }: AboutSubPageProps) {
  const { slug } = await params;
  const page = aboutSubPages[slug];

  if (!page) {
    notFound();
  }

  const pageSlug = `/about/${slug}`;

  return (
    <SEOWrapper slug={pageSlug}>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">About</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{page.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{page.description}</p>
          </div>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
            <h2 className="font-heading text-2xl text-brand-blue">What Defines This Page</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-body">
              {page.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <Link href="/about" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
              Back to About
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Talk with the Valoria Team"
        description="If you are planning your next home, we can help you define the right path from the start."
        primaryLabel="Contact Valoria"
        primaryHref="/contact"
        secondaryLabel="View Floor Plans"
        secondaryHref="/floor-plans"
      />
    </SEOWrapper>
  );
}
