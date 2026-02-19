import Link from "next/link";
import CTASection from "@/components/CTASection";
import RelatedContent from "@/components/RelatedContent";
import SEOWrapper from "@/components/SEOWrapper";
import { getFloorPlansByStyleSlug } from "@/lib/data";
import { floorPlanStyles } from "@/lib/floor-plan-styles";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("/floor-plans");

export default function FloorPlansPage() {
  return (
    <SEOWrapper slug="/floor-plans">
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plans</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">Durable Designs for Real Family Life</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              Explore floor plan styles and choose the direction that fits your family, budget, and long-term goals.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {floorPlanStyles.map((style) => {
              const planCount = getFloorPlansByStyleSlug(style.slug).length;

              return (
                <article key={style.slug} className="rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plan Style</p>
                  <h2 className="mt-3 font-heading text-3xl text-brand-blue">{style.title}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-brand-body">{style.description}</p>
                  <p className="mt-4 text-sm text-brand-body/70">
                    {planCount > 0 ? `${planCount} plan${planCount === 1 ? "" : "s"} available` : "Plans coming soon"}
                  </p>
                  <Link
                    href={`/floor-plans/${style.slug}`}
                    className="mt-6 inline-block rounded-md bg-brand-bronze px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
                  >
                    Explore {style.title}
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-brand-offwhite pb-6">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <RelatedContent currentSlug="/floor-plans" />
        </div>
      </section>

      <CTASection
        title="Need Help Choosing a Plan?"
        description="Our team can help you compare layouts, budget priorities, and site requirements to pick the right plan with confidence."
      />
    </SEOWrapper>
  );
}
