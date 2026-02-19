"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type FloorPlanTypeItem = {
  slug: string;
  title: string;
  description: string;
  planCount: number;
  previewImage: string;
};

type FloorPlanTypeShowcaseProps = {
  styles: FloorPlanTypeItem[];
};

export default function FloorPlanTypeShowcase({ styles }: FloorPlanTypeShowcaseProps) {
  const [activeSlug, setActiveSlug] = useState(styles[0]?.slug ?? "");

  useEffect(() => {
    if (!styles.length) {
      return;
    }

    const hasActiveStyle = styles.some((style) => style.slug === activeSlug);
    if (!hasActiveStyle) {
      setActiveSlug(styles[0].slug);
    }
  }, [activeSlug, styles]);

  const activeStyle = useMemo(
    () => styles.find((style) => style.slug === activeSlug) ?? styles[0],
    [activeSlug, styles]
  );

  if (!activeStyle) {
    return null;
  }

  const planCountLabel =
    activeStyle.planCount > 0
      ? `${activeStyle.planCount} plan${activeStyle.planCount === 1 ? "" : "s"} available`
      : "Plans coming soon";

  return (
    <div className="mt-14">
      <div
        role="tablist"
        aria-label="Floor plan types"
        className="flex snap-x justify-start gap-3 overflow-x-auto pb-2 sm:justify-center [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {styles.map((style) => {
          const isActive = style.slug === activeStyle.slug;

          return (
            <button
              key={style.slug}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`floor-plan-preview-${style.slug}`}
              id={`floor-plan-tab-${style.slug}`}
              onClick={() => setActiveSlug(style.slug)}
              className={`snap-start whitespace-nowrap rounded-md border px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${
                isActive
                  ? "border-brand-bronze bg-brand-bronze text-brand-body shadow-card"
                  : "border-slate-300 bg-white text-brand-blue hover:border-brand-blue/50 hover:bg-brand-blue/5"
              }`}
            >
              {style.title}
            </button>
          );
        })}
      </div>

      <section
        id={`floor-plan-preview-${activeStyle.slug}`}
        role="tabpanel"
        aria-labelledby={`floor-plan-tab-${activeStyle.slug}`}
        className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-card"
      >
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div key={`image-${activeStyle.slug}`} className="relative h-64 sm:h-80 lg:h-[360px] [animation:fadeInUp_240ms_ease-out]">
            <Image
              src={activeStyle.previewImage}
              alt={`${activeStyle.title} floor plan preview`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 52vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/20 to-transparent" />
            <p className="absolute bottom-4 left-4 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
              {activeStyle.title}
            </p>
          </div>

          <div key={`content-${activeStyle.slug}`} className="p-6 sm:p-8 lg:p-10 [animation:fadeInUp_240ms_ease-out]">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bronze">Floor Plan Type</p>
            <h3 className="mt-3 font-heading text-3xl text-brand-blue sm:text-4xl">{activeStyle.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-brand-body sm:text-base">{activeStyle.description}</p>
            <p className="mt-5 text-sm font-semibold text-brand-body/70">{planCountLabel}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/floor-plans/${activeStyle.slug}`}
                className="rounded-md bg-brand-bronze px-5 py-2.5 text-sm font-semibold text-brand-body transition hover:brightness-95"
              >
                Explore {activeStyle.title}
              </Link>
              <Link
                href="/floor-plans"
                className="rounded-md border border-brand-blue/35 px-5 py-2.5 text-sm font-semibold text-brand-blue transition hover:bg-brand-blue/5"
              >
                View all types
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
