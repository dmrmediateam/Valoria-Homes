"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { buildFloorPlanHref, type FloorPlan } from "@/lib/data";
import type { FloorPlanStyle } from "@/lib/floor-plan-styles";

type FloorPlanSearchProps = {
  plans: FloorPlan[];
  styles: FloorPlanStyle[];
};

export default function FloorPlanSearch({ plans, styles }: FloorPlanSearchProps) {
  const [query, setQuery] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("all");
  const hasLoadedPlans = plans.length > 0;

  const styleTitleBySlug = useMemo(() => {
    return Object.fromEntries(styles.map((style) => [style.slug, style.title]));
  }, [styles]);

  const filteredPlans = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return plans.filter((plan) => {
      if (selectedStyle !== "all" && plan.styleSlug !== selectedStyle) {
        return false;
      }

      if (!normalizedQuery) {
        return true;
      }

      const searchableText = [
        plan.name,
        plan.description,
        styleTitleBySlug[plan.styleSlug] ?? plan.styleSlug,
        `${plan.beds}`,
        `${plan.baths}`,
        `${plan.sqFt}`
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [plans, query, selectedStyle, styleTitleBySlug]);

  return (
    <section className="mt-14 rounded-xl border border-slate-200 bg-white p-6 shadow-card sm:p-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-bronze">Search</p>
        <h2 className="mt-2 font-heading text-3xl text-brand-blue sm:text-4xl">Find Your Floor Plan</h2>
        <p className="mt-3 text-sm leading-relaxed text-brand-body sm:text-base">
          Search by plan name, style, beds, baths, or square footage.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-[1fr_240px]">
        <label className="block">
          <span className="sr-only">Search floor plans</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search floor plans..."
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-brand-body shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </label>

        <label className="block">
          <span className="sr-only">Filter by floor plan style</span>
          <select
            value={selectedStyle}
            onChange={(event) => setSelectedStyle(event.target.value)}
            className="w-full rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm text-brand-body shadow-sm outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          >
            <option value="all">All styles</option>
            {styles.map((style) => (
              <option key={style.slug} value={style.slug}>
                {style.title}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-brand-body/80">
        {filteredPlans.length} result{filteredPlans.length === 1 ? "" : "s"}
      </p>

      {filteredPlans.length === 0 ? (
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 bg-brand-offwhite p-8 text-center text-sm text-brand-body/80">
          {hasLoadedPlans ? "No floor plans match your search yet. Try a broader term or clear the style filter." : "No floor plans loaded."}
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredPlans.map((plan) => (
            <article key={plan.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card fade-in-up">
              <div className="h-52 w-full overflow-hidden">
                <Image
                  src={plan.image}
                  alt={`${plan.name} modular home exterior`}
                  width={720}
                  height={480}
                  className="h-full w-full object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                />
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-bronze">
                  {styleTitleBySlug[plan.styleSlug] ?? "Floor Plan"}
                </p>
                <h3 className="mt-2 font-heading text-2xl text-brand-blue">{plan.name}</h3>
                <p className="mt-3 text-sm leading-relaxed text-brand-body">{plan.description}</p>

                <div className="mt-5 grid grid-cols-3 gap-3 text-sm text-brand-body">
                  <p>
                    <span className="block text-xs uppercase tracking-widest text-brand-body/60">Beds</span>
                    {plan.beds}
                  </p>
                  <p>
                    <span className="block text-xs uppercase tracking-widest text-brand-body/60">Baths</span>
                    {plan.baths}
                  </p>
                  <p>
                    <span className="block text-xs uppercase tracking-widest text-brand-body/60">Sq Ft</span>
                    {plan.sqFt}
                  </p>
                </div>

                <Link
                  href={buildFloorPlanHref(plan)}
                  className="mt-6 inline-block rounded-md bg-brand-bronze px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
                >
                  View Plan Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
