import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FloorPlanGrid from "@/components/FloorPlanGrid";
import { floorPlans } from "@/lib/data";

export const metadata: Metadata = {
  title: "Floor Plans",
  description:
    "Browse Valoria Homes floor plans with practical layouts, quality construction, and family-focused designs built for Midwest living."
};

export default function FloorPlansPage() {
  return (
    <>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plans</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">Durable Designs for Real Family Life</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              Explore our collection of thoughtfully designed modular home plans. Each model balances craftsmanship,
              comfort, and long-term value.
            </p>
          </div>

          <div className="mt-10">
            <FloorPlanGrid plans={floorPlans} />
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help Choosing a Plan?"
        description="Our team can help you compare layouts, budget priorities, and site requirements to pick the right plan with confidence."
      />
    </>
  );
}
