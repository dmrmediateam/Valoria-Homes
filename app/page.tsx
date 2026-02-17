import Image from "next/image";
import Link from "next/link";
import BuildProcessSection from "@/components/BuildProcessSection";
import CTASection from "@/components/CTASection";
import RelatedContent from "@/components/RelatedContent";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEOWrapper from "@/components/SEOWrapper";
import { buildSteps, floorPlans } from "@/lib/data";
import { floorPlanStyles } from "@/lib/floor-plan-styles";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("/");

export default function HomePage() {
  return (
    <SEOWrapper slug="/">
      <section className="relative w-full overflow-hidden">
        <div className="absolute inset-0 h-full w-full">
          <video
            className="absolute inset-0 z-0 h-full w-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            <source
              src="/images/aerial-view-of-residential-area-with-houses-under-2026-01-20-14-22-00-utc%20%281%29.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex min-h-[50vh] flex-col items-start justify-center p-6 text-white md:min-h-[70vh] md:p-12 lg:min-h-[80vh] lg:p-24">
          <header className="max-w-[1400px] space-y-4">
            <div className="inline-block">
              <h1 className="text-lg font-semibold uppercase tracking-wide md:text-xl">Custom Modular Homes by Valoria</h1>
              <div className="mt-2 h-1 w-full bg-brand-bronze" />
            </div>
            <h2 className="text-4xl font-extrabold leading-tight md:text-6xl lg:text-7xl xl:whitespace-nowrap" id="the-intelligent-way-to-build">
              The Trusted Way To Build
            </h2>
            <p className="mt-4 text-base md:text-lg lg:text-xl xl:whitespace-nowrap">
              Built for Midwestern families who value durability, efficiency, and craftsmanship.
            </p>
          </header>

          <Link
            className="mt-8 rounded-md bg-brand-bronze px-6 py-3 font-bold uppercase text-brand-body shadow-lg transition-colors hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-brand-bronze focus:ring-opacity-75"
            href="/get-started"
          >
            Find Your Builder
          </Link>
        </div>
      </section>

      <section className="bg-brand-offwhite py-14 lg:py-20">
        <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <RevealOnScroll from="left">
              <h2 className="max-w-[640px] text-4xl font-black leading-[1.15] text-brand-body sm:text-5xl lg:text-[64px] lg:leading-[1.05]">
                Build the Custom Home of Your Dreams
              </h2>
              <p className="mt-8 max-w-[760px] text-xl leading-relaxed text-brand-body">
                Building a modular home should not be stressful. That is why we make the process easy. Everything we do
                comes back to three values: <span className="font-bold">quality craftsmanship, structural strength, and lasting value.</span>
              </p>
              <p className="mt-7 max-w-[760px] text-xl leading-relaxed text-brand-body">
                Start by exploring our customizable floor plans. From there, we will connect you with one of our trusted
                builders across the Midwest we proudly serve. Together, we will build your dream home.
              </p>
              <Link
                href="/floor-plans"
                className="mt-10 inline-flex rounded-full bg-brand-bronze px-7 py-3 text-[24px] font-semibold text-brand-body transition hover:brightness-95"
              >
                Explore Floor Plans
              </Link>
            </RevealOnScroll>

            <RevealOnScroll from="right" delayMs={120} className="relative overflow-hidden rounded-2xl bg-white shadow-card">
              <div className="relative h-[420px] sm:h-[520px] lg:h-[760px]">
                <Image
                  src="/images/modernresidence.jpg"
                  alt="Modern custom modular home exterior"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              </div>
            </RevealOnScroll>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-6 text-center sm:grid-cols-3 lg:grid-cols-6">
            {floorPlanStyles.map((style) => (
              <Link
                key={style.slug}
                href={`/floor-plans/styles/${style.slug}`}
                className="text-[26px] font-medium text-[#8B5E25] transition hover:text-brand-blue"
              >
                {style.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-[1720px] px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 fade-in-up">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plans</p>
              <h2 className="mt-2 font-heading text-4xl font-black text-brand-blue sm:text-5xl">See Our Homes</h2>
            </div>
            <Link href="/floor-plans" className="text-base font-semibold text-brand-blue hover:text-brand-bronze">
              Browse all models
            </Link>
          </div>

          <div className="mt-10 grid gap-7 md:grid-cols-2 xl:grid-cols-3">
            {floorPlans.slice(0, 3).map((plan) => (
              <article key={plan.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card fade-in-up">
                <div className="relative h-56">
                  <Image src={plan.image} alt={plan.name} fill className="object-cover" sizes="(max-width: 1280px) 50vw, 33vw" />
                </div>
                <div className="p-6">
                  <h3 className="text-3xl font-black text-brand-blue">{plan.name}</h3>
                  <p className="mt-3 text-base text-brand-body">{plan.beds} Beds • {plan.baths} Baths • {plan.sqFt} Sq Ft</p>
                  <Link
                    href={`/floor-plans/${plan.id}`}
                    className="mt-5 inline-block rounded-full bg-brand-bronze px-5 py-2.5 text-sm font-semibold text-brand-body transition hover:brightness-95"
                  >
                    View Plan
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <BuildProcessSection steps={buildSteps} />
      <section className="bg-brand-offwhite pb-6">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <RelatedContent currentSlug="/" />
        </div>
      </section>

      <CTASection
        title="Ready to Build with Valoria?"
        description="Talk with our team, compare plans, and take the next step with confidence."
        primaryLabel="Find Your Builder"
        primaryHref="/get-started"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SEOWrapper>
  );
}
