import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import FloorPlanGrid from "@/components/FloorPlanGrid";
import RelatedContent from "@/components/RelatedContent";
import SEOWrapper from "@/components/SEOWrapper";
import { floorPlans } from "@/lib/data";
import { floorPlanStyles, getFloorPlanStyleBySlug } from "@/lib/floor-plan-styles";
import { metadataFor } from "@/lib/seo";

type FloorPlanStylePageProps = {
  params: {
    style: string;
  };
};

export function generateStaticParams() {
  return floorPlanStyles.map((style) => ({
    style: style.slug
  }));
}

export function generateMetadata({ params }: FloorPlanStylePageProps): Metadata {
  const slug = `/floor-plans/styles/${params.style}`;
  const fromRegistry = metadataFor(slug);

  if (fromRegistry.title && fromRegistry.description) {
    return fromRegistry;
  }

  const style = getFloorPlanStyleBySlug(params.style);
  if (!style) {
    return {};
  }

  return {
    title: `${style.title} Floor Plans`,
    description: style.description
  };
}

export default function FloorPlanStylePage({ params }: FloorPlanStylePageProps) {
  const style = getFloorPlanStyleBySlug(params.style);

  if (!style) {
    notFound();
  }

  const slug = `/floor-plans/styles/${style.slug}`;

  return (
    <SEOWrapper slug={slug}>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plan Style</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{style.title} Homes</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{style.description}</p>
            <Link href="/floor-plans" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
              View all floor plans
            </Link>
          </div>

          <div className="mt-10">
            <FloorPlanGrid plans={floorPlans} />
          </div>

          <RelatedContent currentSlug={slug} />
        </div>
      </section>

      <CTASection
        title={`Need Help Choosing a ${style.title} Plan?`}
        description="Talk with our team and we will help you compare layouts, features, and pricing options for your goals."
        primaryLabel="Get Started"
        primaryHref="/get-started"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SEOWrapper>
  );
}
