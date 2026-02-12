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
    <footer className="border-t border-slate-200 bg-brand-offwhite">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center" aria-label="Valoria Homes Home">
            <Image
              src="/images/Valoria_Concept2_Logo.png"
              alt="Valoria Homes logo"
              width={48}
              height={72}
              className="h-16 w-auto object-contain"
            />
            <span className="sr-only">Valoria Homes</span>
          </Link>
          <p className="mt-4 text-sm text-brand-body">
            Durable modular homes for Midwestern families built with quality craftsmanship and trusted service.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Navigation</p>
          <ul className="mt-4 space-y-2">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="text-sm text-brand-body hover:text-brand-blue">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-brand-blue">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-brand-body">
            <li>
              Phone: <a href="tel:+12622045534" className="hover:text-brand-blue">+1 (262) 204-5534</a>
            </li>
            <li>
              Email: <a href="mailto:Jade@valoriahomes.com" className="hover:text-brand-blue">Jade@valoriahomes.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-xs text-brand-body/70">
        <p>© {new Date().getFullYear()} Valoria Homes. All rights reserved.</p>
      </div>
    </footer>
  );
}
