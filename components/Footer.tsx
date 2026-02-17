import Image from "next/image";
import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/floor-plans", label: "Floor Plans" },
  { href: "/build-process", label: "Build Process" },
  { href: "/get-started", label: "Get Started" },
  { href: "/contact", label: "Contact" }
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-brand-offwhite text-[12px] leading-4 text-brand-body">
      <div className="mx-auto grid w-full max-w-[1720px] gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label="Valoria Homes Home">
            <Image
              src="/images/Valoria_Concept2_Logo.png"
              alt="Valoria Homes logo"
              width={48}
              height={72}
              className="h-40 w-auto object-contain"
            />
            <span className="sr-only">Valoria Homes</span>
          </Link>
          <p className="mt-4 text-brand-body/75">
            Durable modular homes for Midwestern families built with quality craftsmanship and trusted service.
          </p>
        </div>

        <div>
          <p className="font-body font-semibold uppercase tracking-[0.2em] text-brand-bronze">Navigation</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-brand-body/80 transition hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-body font-semibold uppercase tracking-[0.2em] text-brand-bronze">Contact</p>
          <ul className="mt-4 space-y-2 text-brand-body/80">
            <li>
              Phone: <a href="tel:+12622045534" className="transition hover:text-brand-blue">+1 (262) 204-5534</a>
            </li>
            <li>
              Email: <a href="mailto:Jade@valoriahomes.com" className="transition hover:text-brand-blue">Jade@valoriahomes.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mx-auto w-full max-w-[1720px] px-4 pb-10 sm:px-6 lg:px-8">
        <section className="border-t border-slate-200 pt-10">
          <h3 className="mb-5 font-body font-semibold uppercase tracking-[0.2em] text-brand-bronze">Legal & Compliance</h3>
          <div className="space-y-4">
            <details className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-heading text-brand-blue">Fair Housing & Equal Opportunity</span>
                <span className="text-brand-bronze transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M7 10.5 12 15.5 17 10.5l-1.4-1.4-3.6 3.6-3.6-3.6z" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-6 pb-6 pt-5 text-brand-body/75">
                <p>
                  We are pledged to the letter and spirit of U.S. policy for the achievement of equal housing opportunity throughout the Nation.
                </p>
                <p className="mt-4">
                  We encourage and support an affirmative advertising and marketing program in which there are no barriers to obtaining housing because of race, color, religion, sex, handicap, familial status, or national origin.
                </p>
                <p className="mt-4">
                  This real estate is offered without regard to race, color, religion, sex, handicap, familial status, or national origin. We are committed to providing an accessible website and mobile application.
                </p>
              </div>
            </details>

            <details className="group overflow-hidden rounded-lg border border-slate-200 bg-white">
              <summary className="flex cursor-pointer list-none items-center justify-between px-6 py-5 [&::-webkit-details-marker]:hidden">
                <span className="font-heading text-brand-blue">
                  Professional Licensing & Realtor Information
                </span>
                <span className="text-brand-bronze transition-transform duration-200 group-open:rotate-180" aria-hidden="true">
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d="M7 10.5 12 15.5 17 10.5l-1.4-1.4-3.6 3.6-3.6-3.6z" />
                  </svg>
                </span>
              </summary>
              <div className="border-t border-slate-200 px-6 pb-6 pt-5 text-brand-body/75">
                <p className="text-brand-blue">Legendary Real Estate Services</p>
                <p className="mt-3">487 W South St</p>
                <p>Lake Geneva, WI 53147</p>
                <p className="mt-5">
                  REALTOR&reg; is a registered trademark of the National Association of REALTORS&reg; and identifies real estate professionals who are members of the National Association of REALTORS&reg; and subscribe to its strict Code of Ethics.
                </p>
                <p className="mt-4">
                  All information provided is deemed reliable but is not guaranteed and should be independently verified.
                </p>
              </div>
            </details>
          </div>
        </section>

        <div className="mt-10 border-t border-slate-200 pt-6 text-brand-body/70">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
            <p>© 2026 Valoria Homes. All rights reserved.</p>
            <Link href="/privacy-policy" className="transition hover:text-brand-blue">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="transition hover:text-brand-blue">
              Terms & Conditions
            </Link>
            <Link href="/accessibility" className="transition hover:text-brand-blue">
              Accessibility
            </Link>
            <a
              href="https://dmrmedia.org"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-brand-blue"
            >
              Development & SEO Managed by DMR Media
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
