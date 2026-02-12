import type { Metadata } from "next";
import CTASection from "@/components/CTASection";
import FAQSection from "@/components/FAQSection";
import { faqs } from "@/lib/data";

export const metadata: Metadata = {
  title: "Get Started",
  description:
    "Get started with Valoria Homes and understand the modular homebuying process, common FAQs, and the next steps to begin your project."
};

const processOverview = [
  {
    title: "Initial Discovery",
    description: "Share your goals, budget, location, and timeline so we can recommend the best path forward."
  },
  {
    title: "Plan and Personalize",
    description: "Choose your floor plan and customize key elements that matter most to your family and daily routine."
  },
  {
    title: "Prepare and Build",
    description: "We coordinate site preparation and construction milestones while keeping communication clear and practical."
  },
  {
    title: "Final Walkthrough",
    description: "Review every detail together before move-in so you feel confident and fully informed on day one."
  }
];

export default function GetStartedPage() {
  return (
    <>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Get Started</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">A Practical Start to Homeownership</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              From first questions to final walkthrough, we keep the process straightforward so you can make confident,
              informed decisions.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <div className="md:col-span-2 fade-in-up">
              <h2 className="font-heading text-3xl text-brand-blue">Homebuying Process</h2>
            </div>
            {processOverview.map((item) => (
              <article key={item.title} className="rounded-lg border border-slate-200 bg-white p-6 fade-in-up">
                <h3 className="font-heading text-2xl text-brand-blue">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-body">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FAQSection items={faqs} />

      <CTASection
        title="Questions About Your First Step?"
        description="Talk with our team and we will help you map out the right starting point based on your property, priorities, and timeline."
        primaryLabel="Contact Valoria"
        primaryHref="/contact"
        secondaryLabel="View Floor Plans"
        secondaryHref="/floor-plans"
      />
    </>
  );
}
