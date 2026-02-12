import Link from "next/link";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1800&q=80"
        alt="Exterior of a traditional family home"
        fill
        priority
        className="-z-20 object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 -z-10 bg-brand-blue/65" />

      <div className="mx-auto flex min-h-[70vh] w-full max-w-6xl items-center px-4 py-20 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white fade-in-up">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Valoria Homes</p>
          <h1 className="mt-4 font-heading text-4xl leading-tight sm:text-5xl lg:text-6xl">
            Built on Craftsmanship. Designed for Generations.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-100 sm:text-lg">
            Valoria Homes builds durable, thoughtfully designed homes for Midwestern families who value quality,
            reliability, and honest workmanship.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/floor-plans"
              className="rounded-md bg-brand-bronze px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
            >
              View Floor Plans
            </Link>
            <Link
              href="/get-started"
              className="rounded-md border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
