import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import SEOWrapper from "@/components/SEOWrapper";
import { metadataFor } from "@/lib/seo";

type OurHomesSubPage = {
  title: string;
  description: string;
  highlights: string[];
};

const ourHomesSubPages: Record<string, OurHomesSubPage> = {
  "photo-gallery": {
    title: "Photo Gallery",
    description: "A curated gallery of finished Valoria homes to help you evaluate style, layout, and curb appeal.",
    highlights: [
      "Exterior elevations across multiple home styles",
      "Kitchen, living, and bedroom finish examples",
      "Real project inspiration for your own build"
    ]
  },
  videos: {
    title: "Videos",
    description: "Short videos focused on walkthroughs, build progress, and design details across our home collection.",
    highlights: [
      "Room-by-room walkthrough clips",
      "Construction and delivery highlights",
      "Feature callouts for materials and finishes"
    ]
  },
  "virtual-tours": {
    title: "Virtual Tours",
    description: "Interactive home tours that help you compare flow, spacing, and function before making decisions.",
    highlights: [
      "Review how rooms connect in each layout",
      "Check storage and daily-use areas",
      "Compare options from any location"
    ]
  },
  "visit-our-model-homes": {
    title: "Visit Our Model Homes",
    description: "Schedule a model-home visit and experience Valoria craftsmanship, fit, and finish in person.",
    highlights: [
      "Walk through completed model layouts",
      "Discuss customization options with our team",
      "Confirm what matters most before you build"
    ]
  }
};

type OurHomesSubPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return Object.keys(ourHomesSubPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: OurHomesSubPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = ourHomesSubPages[slug];

  if (!page) {
    return {};
  }

  const fromRegistry = metadataFor(`/our-homes/${slug}`);
  if (fromRegistry.title && fromRegistry.description) {
    return fromRegistry;
  }

  return {
    title: page.title,
    description: page.description
  };
}

export default async function OurHomesSubPage({ params }: OurHomesSubPageProps) {
  const { slug } = await params;
  const page = ourHomesSubPages[slug];

  if (!page) {
    notFound();
  }

  const pageSlug = `/our-homes/${slug}`;

  return (
    <SEOWrapper slug={pageSlug}>
      <section className="bg-brand-offwhite py-16">
        <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl fade-in-up">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Our Homes</p>
            <h1 className="mt-2 font-heading text-4xl text-brand-blue sm:text-5xl">{page.title}</h1>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{page.description}</p>
          </div>

          <div className="mt-10 rounded-lg border border-slate-200 bg-white p-6 shadow-card fade-in-up">
            <h2 className="font-heading text-2xl text-brand-blue">What You Can Explore</h2>
            <ul className="mt-4 space-y-3 text-sm text-brand-body">
              {page.highlights.map((highlight) => (
                <li key={highlight}>{highlight}</li>
              ))}
            </ul>
            <Link href="/our-homes" className="mt-6 inline-block text-sm font-semibold text-brand-blue hover:text-brand-bronze">
              Back to Our Homes
            </Link>
          </div>
        </div>
      </section>

      <CTASection
        title="Need Help Picking the Right Home?"
        description="We can help you compare floor plans, finishes, and builder availability based on your priorities."
        primaryLabel="Find Your Builder"
        primaryHref="/get-started"
        secondaryLabel="Contact Us"
        secondaryHref="/contact"
      />
    </SEOWrapper>
  );
}
