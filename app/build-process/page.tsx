import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import BuildProcessSection from "@/components/BuildProcessSection";
import { buildSteps } from "@/lib/data";

export const metadata: Metadata = {
  title: "Build Process",
  description:
    "Learn how Valoria Homes guides your project from consultation to move-in with a clear, proven modular home building process."
};

export default function BuildProcessPage() {
  return (
    <>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Build Process</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">A Clear Path from Planning to Move-In</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              Our five-step system keeps your home build organized, transparent, and focused on quality outcomes for your
              family.
            </p>
          </div>
        </div>
      </section>

      <BuildProcessSection steps={buildSteps} />

      <CTASection
        title="Start Your Build with a Trusted Team"
        description="Schedule your consultation and we will walk through your goals, timeline, and the best next steps for your project."
      />
    </>
  );
}
