import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function CTASection({
  title,
  description,
  primaryLabel = "Get Started",
  primaryHref = "/get-started",
  secondaryLabel = "Contact Us",
  secondaryHref = "/contact"
}: CTASectionProps) {
  return (
    <section className="bg-brand-offwhite py-16 text-brand-body">
      <div className="mx-auto w-full max-w-6xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="font-heading text-3xl text-brand-blue sm:text-4xl fade-in-up">{title}</h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-brand-body sm:text-base fade-in-up">
          {description}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4 fade-in-up">
          <Link
            href={primaryHref}
            className="rounded-md bg-brand-bronze px-6 py-3 text-sm font-semibold text-brand-body transition hover:brightness-95"
          >
            {primaryLabel}
          </Link>
          <Link
            href={secondaryHref}
            className="rounded-md border border-brand-blue/40 px-6 py-3 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue/5"
          >
            {secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  );
}
