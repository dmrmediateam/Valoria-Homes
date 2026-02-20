import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import FloorPlanGrid from "@/components/FloorPlanGrid";
import RelatedContent from "@/components/RelatedContent";
import SEOWrapper from "@/components/SEOWrapper";
import {
  buildFloorPlanHref
} from "@/lib/data";
import {
  getFloorPlanByStyleAndIdSource,
  getFloorPlansByStyleSlugSource,
  getFloorPlansSource,
  getFloorPlanStylesSource
} from "@/lib/floor-plan-source";
import { metadataFor } from "@/lib/seo";
import { buildFloorPlanProductSchema } from "@/lib/structured-data";

type FloorPlanDynamicPageProps = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateStaticParams() {
  const [floorPlanStyles, floorPlans] = await Promise.all([
    getFloorPlanStylesSource(),
    getFloorPlansSource()
  ]);

  const styleParams = floorPlanStyles.map((style) => ({
    slug: [style.slug]
  }));

  const planParams = floorPlans.map((plan) => ({
    slug: [plan.styleSlug, plan.id]
  }));

  return [...styleParams, ...planParams];
}

export async function generateMetadata({ params }: FloorPlanDynamicPageProps): Promise<Metadata> {
  const { slug } = await params;
  const floorPlanStyles = await getFloorPlanStylesSource();

  if (slug.length === 1) {
    const style = floorPlanStyles.find((entry) => entry.slug === slug[0]);
    if (!style) {
      return {};
    }

    const pageSlug = `/floor-plans/${style.slug}`;
    const fromRegistry = metadataFor(pageSlug);
    if (fromRegistry.title && fromRegistry.description) {
      return fromRegistry;
    }

    return {
      title: `${style.title} Floor Plans`,
      description: style.description
    };
  }

  if (slug.length === 2) {
    const [styleSlug, planId] = slug;
    const plan = await getFloorPlanByStyleAndIdSource(styleSlug, planId);
    if (!plan) {
      return {};
    }

    const pageSlug = buildFloorPlanHref(plan);
    const fromRegistry = metadataFor(pageSlug);
    if (fromRegistry.title && fromRegistry.description) {
      return fromRegistry;
    }

    return {
      title: `${plan.name} Floor Plan`,
      description: `${plan.beds} beds, ${plan.baths} baths, ${plan.sqFt} sq ft. ${plan.description}`
    };
  }

  return {};
}

export default async function FloorPlanDynamicPage({ params }: FloorPlanDynamicPageProps) {
  const { slug } = await params;
  const floorPlanStyles = await getFloorPlanStylesSource();

  if (slug.length === 1) {
    const style = floorPlanStyles.find((entry) => entry.slug === slug[0]);

    if (!style) {
      notFound();
    }

    const pageSlug = `/floor-plans/${style.slug}`;
    const plans = await getFloorPlansByStyleSlugSource(style.slug);

    return (
      <SEOWrapper slug={pageSlug}>
        <section className="bg-brand-offwhite py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl fade-in-up">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plan Style</p>
              <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{style.title} Homes</h1>
              <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{style.description}</p>
              <Link href="/floor-plans" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
                View all floor plan styles
              </Link>
            </div>

            <div className="mt-10">
              <FloorPlanGrid plans={plans} />
            </div>

            <RelatedContent currentSlug={pageSlug} />
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

  if (slug.length === 2) {
    const [styleSlug, planId] = slug;
    const style = floorPlanStyles.find((entry) => entry.slug === styleSlug);
    const plan = await getFloorPlanByStyleAndIdSource(styleSlug, planId);

    if (!style || !plan) {
      notFound();
    }

    const pageSlug = buildFloorPlanHref(plan);
    const floorPlanSchema = buildFloorPlanProductSchema(plan);

    return (
      <SEOWrapper slug={pageSlug} extraSchemas={[floorPlanSchema]}>
        <section className="bg-brand-offwhite py-16">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
              <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-card">
                <div className="relative h-[340px] w-full sm:h-[480px]">
                  <Image
                    src={plan.image}
                    alt={`${plan.name} modular home exterior`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 65vw"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plan</p>
                  <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{plan.name}</h1>
                  <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{plan.description}</p>
                </div>
              </article>

              <aside className="rounded-xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
                <h2 className="font-heading text-3xl text-brand-blue">Plan Details</h2>
                <dl className="mt-5 space-y-4 text-brand-body">
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-body/60">Bedrooms</dt>
                    <dd className="mt-1 text-lg font-semibold">{plan.beds}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-body/60">Bathrooms</dt>
                    <dd className="mt-1 text-lg font-semibold">{plan.baths}</dd>
                  </div>
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-body/60">Square Footage</dt>
                    <dd className="mt-1 text-lg font-semibold">{plan.sqFt.toLocaleString()} sq ft</dd>
                  </div>
                </dl>
                <Link
                  href={`/floor-plans/${style.slug}`}
                  className="mt-6 inline-block text-sm font-semibold text-brand-blue transition hover:text-brand-bronze"
                >
                  Back to {style.title}
                </Link>
              </aside>
            </div>

            <RelatedContent currentSlug={pageSlug} />
          </div>
        </section>

        <CTASection
          title={`Interested in ${plan.name}?`}
          description="Talk with our team about pricing, custom options, and the best builder path for your timeline."
          primaryLabel="Request Pricing"
          primaryHref="/contact"
          secondaryLabel="Browse More Plans"
          secondaryHref={`/floor-plans/${style.slug}`}
        />
      </SEOWrapper>
    );
  }

  notFound();
}
