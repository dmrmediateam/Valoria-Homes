import Link from "next/link";
import CTASection from "@/components/CTASection";
import SEOWrapper from "@/components/SEOWrapper";
import { metadataFor } from "@/lib/seo";

export const metadata = metadataFor("/our-homes");

const ourHomesLinks = [
  {
    href: "/our-homes/photo-gallery",
    title: "Photo Gallery",
    description: "Browse finished interiors, exterior elevations, and craftsmanship details from recent Valoria homes."
  },
  {
    href: "/our-homes/videos",
    title: "Videos",
    description: "Watch quick walkthroughs and construction highlights to see how our homes come together."
  },
  {
    href: "/our-homes/virtual-tours",
    title: "Virtual Tours",
    description: "Explore layouts remotely and compare room flow, storage, and everyday functionality."
  },
  {
    href: "/our-homes/visit-our-model-homes",
    title: "Visit Our Model Homes",
    description: "Plan an in-person model home visit and experience the quality, finishes, and space firsthand."
  }
];

export default function OurHomesPage() {
  return (
    <SEOWrapper slug="/our-homes">
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Our Homes</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">See What Everyday Living Looks Like</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">
              Explore real examples of Valoria homes through photos, videos, virtual tours, and model home visits.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {ourHomesLinks.map((item) => (
              <article key={item.href} className="rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
                <h2 className="font-heading text-2xl text-brand-blue">{item.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-brand-body">{item.description}</p>
                <Link href={item.href} className="mt-5 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
                  Open {item.title}
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        title="Want to Tour a Home Style in Person?"
        description="Talk with our team and we will help you plan the best next step based on your timeline and location."
        primaryLabel="Contact Valoria"
        primaryHref="/contact"
        secondaryLabel="Browse Floor Plans"
        secondaryHref="/floor-plans"
      />
    </SEOWrapper>
  );
}
