import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import FloorPlanImageCarousel from "@/components/FloorPlanImageCarousel";
import RelatedContent from "@/components/RelatedContent";
import SEOWrapper from "@/components/SEOWrapper";
import StyleFloorPlanSearch from "@/components/StyleFloorPlanSearch";
import {
  buildFloorPlanPdfDownloadHref,
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

function ArrowIcon({ direction = "left" }: { direction?: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[2]">
      {direction === "left" ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
    </svg>
  );
}

function PdfIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[1.8]">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 15h2a1.5 1.5 0 0 0 0-3H8v6" />
      <path d="M13 18h1.2a1.8 1.8 0 0 0 0-3.6H13z" />
      <path d="M18 12h-2v6" />
    </svg>
  );
}

export const dynamicParams = true;

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
              <StyleFloorPlanSearch plans={plans} styleName={style.title} />
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
    const pdfDownloadUrl = buildFloorPlanPdfDownloadHref(plan);
    const carouselImages = [
      {
        url: plan.image,
        alt: plan.imageAlt ?? `${plan.name} exterior`
      },
      ...(plan.galleryImages ?? [])
    ].filter((image, index, images) => images.findIndex((entry) => entry.url === image.url) === index);
    const stylePlans = await getFloorPlansByStyleSlugSource(style.slug);
    const currentPlanIndex = stylePlans.findIndex((entry) => entry.id === plan.id);
    const previousPlan = currentPlanIndex > 0 ? stylePlans[currentPlanIndex - 1] : null;
    const nextPlan = currentPlanIndex >= 0 && currentPlanIndex < stylePlans.length - 1 ? stylePlans[currentPlanIndex + 1] : null;

    return (
      <SEOWrapper slug={pageSlug} extraSchemas={[floorPlanSchema]}>
        <section className="relative overflow-hidden bg-[#f4f2ee] py-8 lg:py-10">
          <div className="absolute inset-0 opacity-[0.08]">
            <Image
              src={plan.image}
              alt=""
              fill
              className="object-cover object-left blur-[2px]"
              sizes="100vw"
              aria-hidden
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(246,247,248,0.97)_0%,rgba(246,247,248,0.94)_42%,rgba(246,247,248,0.78)_65%,rgba(246,247,248,0.92)_100%)]" />

          <div className="relative mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex flex-col gap-3 border-b border-brand-blue/10 pb-5 text-brand-blue lg:flex-row lg:items-center lg:justify-between">
              <Link
                href={`/floor-plans/${style.slug}`}
                className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.16em] text-brand-body/75 transition hover:text-brand-bronze"
              >
                <ArrowIcon direction="left" />
                Back to {style.title}
              </Link>

              <div className="flex flex-wrap gap-3 lg:justify-end">
                {previousPlan ? (
                  <Link
                    href={buildFloorPlanHref(previousPlan)}
                    className="inline-flex items-center gap-2 rounded-md border border-brand-blue/10 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-blue transition hover:border-brand-bronze hover:text-brand-bronze"
                  >
                    <ArrowIcon direction="left" />
                    Previous Plan
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-md border border-brand-blue/10 bg-white/60 px-4 py-2 text-sm font-semibold text-brand-body/35">
                    <ArrowIcon direction="left" />
                    Previous Plan
                  </span>
                )}
                {nextPlan ? (
                  <Link
                    href={buildFloorPlanHref(nextPlan)}
                    className="inline-flex items-center gap-2 rounded-md border border-brand-blue/10 bg-white/80 px-4 py-2 text-sm font-semibold text-brand-blue transition hover:border-brand-bronze hover:text-brand-bronze"
                  >
                    Next Plan
                    <ArrowIcon direction="right" />
                  </Link>
                ) : (
                  <span className="inline-flex items-center gap-2 rounded-md border border-brand-blue/10 bg-white/60 px-4 py-2 text-sm font-semibold text-brand-body/35">
                    Next Plan
                    <ArrowIcon direction="right" />
                  </span>
                )}
              </div>
            </div>

            <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] xl:gap-14">
              <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/70 p-7 shadow-[0_24px_70px_rgba(7,38,93,0.08)] backdrop-blur sm:p-8 lg:min-h-[720px] lg:p-10">
                <div className="absolute inset-y-0 right-[-15%] hidden w-[65%] rounded-full bg-brand-bronze/8 blur-3xl lg:block" />
                <div className="relative">
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-body/55 sm:text-sm">
                    {style.title} <span className="mx-2 text-brand-bronze">•</span> {plan.name}
                  </p>
                  <h1 className="mt-4 font-heading text-5xl leading-[0.95] text-brand-blue sm:text-6xl xl:text-7xl">
                    {plan.name}
                  </h1>

                  <div className="mt-8 grid gap-4 rounded-[24px] border border-brand-blue/10 bg-white/72 p-5 sm:grid-cols-3 sm:p-6">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-body/45">Bedrooms</p>
                      <p className="mt-2 text-3xl text-brand-blue">{plan.beds} Bed</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-body/45">Bathrooms</p>
                      <p className="mt-2 text-3xl text-brand-blue">{plan.baths} Bath</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-body/45">Square Feet</p>
                      <p className="mt-2 text-3xl text-brand-blue">{plan.sqFt.toLocaleString()} Sq. Ft.</p>
                    </div>
                  </div>

                  <div className="mt-10 flex flex-wrap gap-4">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-brand-bronze px-7 py-3.5 text-base font-semibold text-white transition hover:brightness-95"
                    >
                      Get Your Free Quote
                    </Link>
                    {plan.pdfUrl ? (
                      <a
                        href={pdfDownloadUrl ?? plan.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 rounded-full border border-brand-bronze/55 bg-white px-7 py-3.5 text-base font-semibold text-brand-blue transition hover:border-brand-bronze hover:bg-brand-offwhite"
                      >
                        Download PDF
                        <PdfIcon />
                      </a>
                    ) : null}
                  </div>

                  {plan.pdfUrl ? (
                    <div className="mt-4">
                      <a
                        href={plan.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-blue/80 underline-offset-4 transition hover:text-brand-bronze hover:underline"
                      >
                        View PDF in new tab
                      </a>
                    </div>
                  ) : null}

                  <p className="mt-8 max-w-xl text-base leading-relaxed text-brand-body/78 sm:text-lg">
                    {plan.description}
                  </p>

                  <div className="mt-10 grid gap-4 border-t border-brand-blue/10 pt-8 sm:grid-cols-3">
                    <div className="rounded-2xl bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-body/45">Home Style</p>
                      <p className="mt-2 text-2xl text-brand-blue">{style.title}</p>
                    </div>
                    <div className="rounded-2xl bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-body/45">Plan Code</p>
                      <p className="mt-2 text-2xl text-brand-blue">{plan.id}</p>
                    </div>
                    <div className="rounded-2xl bg-white/70 p-4">
                      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-body/45">Availability</p>
                      <p className="mt-2 text-2xl text-brand-blue">Published</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <FloorPlanImageCarousel images={carouselImages} title={plan.name} />
              </div>
            </div>

            <div className="mt-12">
              <RelatedContent currentSlug={pageSlug} />
            </div>
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
