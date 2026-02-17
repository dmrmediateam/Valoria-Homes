import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import RelatedContent from "@/components/RelatedContent";
import SEOWrapper from "@/components/SEOWrapper";
import { floorPlans } from "@/lib/data";
import { metadataFor } from "@/lib/seo";
import { buildFloorPlanProductSchema } from "@/lib/structured-data";

type FloorPlanPageProps = {
  params: {
    id: string;
  };
};

function getFloorPlan(id: string) {
  return floorPlans.find((plan) => plan.id === id);
}

export function generateStaticParams() {
  return floorPlans.map((plan) => ({
    id: plan.id
  }));
}

export function generateMetadata({ params }: FloorPlanPageProps): Metadata {
  const slug = `/floor-plans/${params.id}`;
  const fromRegistry = metadataFor(slug);

  if (fromRegistry.title && fromRegistry.description) {
    return fromRegistry;
  }

  const plan = getFloorPlan(params.id);
  if (!plan) {
    return {};
  }

  return {
    title: `${plan.name} Floor Plan`,
    description: `${plan.beds} beds, ${plan.baths} baths, ${plan.sqFt} sq ft. ${plan.description}`
  };
}

export default function FloorPlanDetailPage({ params }: FloorPlanPageProps) {
  const plan = getFloorPlan(params.id);

  if (!plan) {
    notFound();
  }

  const slug = `/floor-plans/${plan.id}`;
  const floorPlanSchema = buildFloorPlanProductSchema(plan);

  return (
    <SEOWrapper slug={slug} extraSchemas={[floorPlanSchema]}>
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
            </aside>
          </div>

          <RelatedContent currentSlug={slug} />
        </div>
      </section>

      <CTASection
        title={`Interested in ${plan.name}?`}
        description="Talk with our team about pricing, custom options, and the best builder path for your timeline."
        primaryLabel="Request Pricing"
        primaryHref="/contact"
        secondaryLabel="Browse More Plans"
        secondaryHref="/floor-plans"
      />
    </SEOWrapper>
  );
}
