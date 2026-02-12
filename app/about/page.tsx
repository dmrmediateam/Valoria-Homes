import type { Metadata } from "next";
import CTASection from "@/components/CTASection";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Valoria Homes, a modular home builder focused on craftsmanship, reliability, and family-centered design."
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div className="fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">About Valoria Homes</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">Built on Midwest Values</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              Valoria Homes was founded with one objective: deliver dependable modular homes with honest communication,
              proven materials, and practical design.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              Our team believes a home should feel durable, comfortable, and lasting from day one. That is why every
              project is handled with careful planning and craftsmanship-first execution.
            </p>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-8 fade-in-up">
            <h2 className="font-heading text-2xl text-brand-blue">What We Stand For</h2>
            <ul className="mt-5 space-y-4 text-sm text-brand-body">
              <li>Quality workmanship that holds up over time.</li>
              <li>Clear, respectful communication throughout your build.</li>
              <li>Family-oriented layouts designed for real daily living.</li>
              <li>Professional service from consultation through move-in.</li>
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        title="Build with a Team You Can Trust"
        description="If you are ready to plan your next home, we are ready to help you take the next step with clarity and confidence."
      />
    </>
  );
}
