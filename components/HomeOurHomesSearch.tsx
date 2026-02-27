"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { buildFloorPlanHref, type FloorPlan } from "@/lib/data";
import type { FloorPlanStyle } from "@/lib/floor-plan-styles";

type HomeOurHomesSearchProps = {
  plans: FloorPlan[];
  styles: FloorPlanStyle[];
};

function formatBathValue(value: number): string {
  return Number.isInteger(value) ? `${value}` : `${value}`;
}

export default function HomeOurHomesSearch({ plans, styles }: HomeOurHomesSearchProps) {
  const styleMap = useMemo(() => {
    return Object.fromEntries(styles.map((style) => [style.slug, style.title]));
  }, [styles]);

  const sqFtValues = useMemo(() => plans.map((plan) => plan.sqFt).sort((a, b) => a - b), [plans]);
  const minSqFtValue = sqFtValues[0] ?? 0;
  const maxSqFtValue = sqFtValues[sqFtValues.length - 1] ?? 0;

  const bedOptions = useMemo(() => Array.from(new Set(plans.map((plan) => plan.beds))).sort((a, b) => a - b), [plans]);
  const bathOptions = useMemo(
    () => Array.from(new Set(plans.map((plan) => plan.baths))).sort((a, b) => a - b),
    [plans]
  );

  const [query, setQuery] = useState("");
  const [sqFtMin, setSqFtMin] = useState(minSqFtValue);
  const [sqFtMax, setSqFtMax] = useState(maxSqFtValue);
  const [selectedBeds, setSelectedBeds] = useState<number[]>([]);
  const [selectedBaths, setSelectedBaths] = useState<number[]>([]);

  const toggleValue = (values: number[], value: number) => {
    return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
  };

  const clearAll = () => {
    setQuery("");
    setSqFtMin(minSqFtValue);
    setSqFtMax(maxSqFtValue);
    setSelectedBeds([]);
    setSelectedBaths([]);
  };

  const filteredPlans = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return plans.filter((plan) => {
      const text = [plan.name, plan.description, styleMap[plan.styleSlug] ?? ""]
        .join(" ")
        .toLowerCase();

      const matchesQuery = normalizedQuery.length === 0 || text.includes(normalizedQuery);
      const matchesSqFt = plan.sqFt >= sqFtMin && plan.sqFt <= sqFtMax;
      const matchesBeds = selectedBeds.length === 0 || selectedBeds.includes(plan.beds);
      const matchesBaths = selectedBaths.length === 0 || selectedBaths.includes(plan.baths);

      return matchesQuery && matchesSqFt && matchesBeds && matchesBaths;
    });
  }, [plans, query, selectedBaths, selectedBeds, sqFtMax, sqFtMin, styleMap]);

  const rangeSpan = Math.max(maxSqFtValue - minSqFtValue, 1);
  const leftPercent = ((sqFtMin - minSqFtValue) / rangeSpan) * 100;
  const rightPercent = ((sqFtMax - minSqFtValue) / rangeSpan) * 100;

  return (
    <div className="mt-10 space-y-4">
      <div className="sticky top-20 z-30 rounded-xl border border-slate-200 bg-white/95 p-4 shadow-card backdrop-blur supports-[backdrop-filter]:bg-white/85 xl:hidden">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-heading text-2xl text-brand-blue">Filter Results</h3>
          <button
            type="button"
            onClick={clearAll}
            className="border-b border-brand-bronze text-sm font-semibold text-brand-body hover:text-brand-blue"
          >
            Reset All
          </button>
        </div>
        <p className="mt-2 text-sm text-brand-body">
          Showing {filteredPlans.length} result{filteredPlans.length === 1 ? "" : "s"} of {plans.length}
        </p>
        <div className="mt-3">
          <label htmlFor="home-our-homes-search-mobile" className="sr-only">
            Search floor plans
          </label>
          <input
            id="home-our-homes-search-mobile"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search floor plans"
            className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-brand-body outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
          />
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[320px_1fr]">
      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
        <div className="hidden xl:block">
          <div className="flex items-center justify-between gap-3">
            <h3 className="font-heading text-3xl text-brand-blue">Filter Results</h3>
            <button
              type="button"
              onClick={clearAll}
              className="border-b border-brand-bronze text-sm font-semibold text-brand-body hover:text-brand-blue"
            >
              Reset All
            </button>
          </div>
          <p className="mt-3 text-sm text-brand-body">
            Showing {filteredPlans.length} result{filteredPlans.length === 1 ? "" : "s"} of {plans.length}
          </p>
          <div className="mt-4">
            <label htmlFor="home-our-homes-search-desktop" className="sr-only">
              Search floor plans
            </label>
            <input
              id="home-our-homes-search-desktop"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search floor plans"
              className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm text-brand-body outline-none transition focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20"
            />
          </div>
        </div>

        <div className="mt-5 space-y-6">

          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-heading text-2xl text-brand-blue">Square Footage</h4>
              <button
                type="button"
                onClick={() => {
                  setSqFtMin(minSqFtValue);
                  setSqFtMax(maxSqFtValue);
                }}
                className="text-sm font-semibold text-brand-body hover:text-brand-blue"
              >
                Clear
              </button>
            </div>

            <div className="mt-5">
              <div className="relative h-7">
                <div className="absolute top-3 h-1 w-full rounded-full bg-slate-200" />
                <div
                  className="absolute top-3 h-1 rounded-full bg-brand-bronze"
                  style={{ left: `${leftPercent}%`, width: `${Math.max(rightPercent - leftPercent, 0)}%` }}
                />
                <input
                  type="range"
                  min={minSqFtValue}
                  max={maxSqFtValue}
                  value={sqFtMin}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setSqFtMin(Math.min(value, sqFtMax));
                  }}
                  className="absolute h-7 w-full cursor-pointer bg-transparent accent-brand-bronze"
                />
                <input
                  type="range"
                  min={minSqFtValue}
                  max={maxSqFtValue}
                  value={sqFtMax}
                  onChange={(event) => {
                    const value = Number(event.target.value);
                    setSqFtMax(Math.max(value, sqFtMin));
                  }}
                  className="absolute h-7 w-full cursor-pointer bg-transparent accent-brand-bronze"
                />
              </div>

              <div className="mt-2 flex items-center justify-between text-sm font-semibold text-brand-body">
                <span>{sqFtMin.toLocaleString()} SQ. FT.</span>
                <span>{sqFtMax.toLocaleString()} SQ. FT.</span>
              </div>
            </div>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-heading text-2xl text-brand-blue">Bedrooms</h4>
              <button
                type="button"
                onClick={() => setSelectedBeds([])}
                className="text-sm font-semibold text-brand-body hover:text-brand-blue"
              >
                Clear
              </button>
            </div>

            <ul className="mt-4 space-y-3">
              {bedOptions.map((beds) => {
                const id = `bed-filter-${beds}`;
                return (
                  <li key={beds}>
                    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-base text-brand-body">
                      <input
                        id={id}
                        type="checkbox"
                        checked={selectedBeds.includes(beds)}
                        onChange={() => setSelectedBeds((prev) => toggleValue(prev, beds))}
                        className="h-4 w-4 rounded border-slate-300 text-brand-bronze focus:ring-brand-blue"
                      />
                      {beds} Bedroom{beds === 1 ? "" : "s"}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="border-t border-slate-200 pt-5">
            <div className="flex items-center justify-between gap-2">
              <h4 className="font-heading text-2xl text-brand-blue">Baths</h4>
              <button
                type="button"
                onClick={() => setSelectedBaths([])}
                className="text-sm font-semibold text-brand-body hover:text-brand-blue"
              >
                Clear
              </button>
            </div>

            <ul className="mt-4 space-y-3">
              {bathOptions.map((baths) => {
                const id = `bath-filter-${baths}`;
                return (
                  <li key={baths}>
                    <label htmlFor={id} className="flex cursor-pointer items-center gap-3 text-base text-brand-body">
                      <input
                        id={id}
                        type="checkbox"
                        checked={selectedBaths.includes(baths)}
                        onChange={() => setSelectedBaths((prev) => toggleValue(prev, baths))}
                        className="h-4 w-4 rounded border-slate-300 text-brand-bronze focus:ring-brand-blue"
                      />
                      {formatBathValue(baths)} Bath{baths === 1 ? "" : "s"}
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </aside>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredPlans.map((plan) => (
          <article
            key={plan.id}
            className="flex h-[430px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-[0_10px_24px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_30px_rgba(15,23,42,0.16)] fade-in-up sm:h-[450px]"
          >
            <div className="relative h-44 sm:h-48">
              <Image
                src={plan.image}
                alt={plan.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1440px) 50vw, 33vw"
              />
            </div>
            <div className="flex h-full flex-col bg-[#f4f5f7] p-5 sm:p-6">
              <h3 className="min-h-[3.1rem] overflow-hidden font-heading text-3xl font-black leading-tight text-brand-blue sm:min-h-[3.5rem]">
                {plan.name}
              </h3>
              <p className="mt-3 min-h-[2.2rem] text-xs font-semibold uppercase tracking-[0.18em] text-brand-body sm:text-sm">
                {plan.beds} Bed{plan.beds === 1 ? "" : "s"} • {formatBathValue(plan.baths)} Bath
                {plan.baths === 1 ? "" : "s"} • {plan.sqFt.toLocaleString()} Sq. Ft.
              </p>
              <Link
                href={buildFloorPlanHref(plan)}
                className="mt-auto inline-flex w-full items-center justify-center rounded-full bg-brand-bronze px-5 py-2.5 text-base font-semibold text-brand-body transition hover:brightness-95"
              >
                View Floor Plan
              </Link>
            </div>
          </article>
        ))}

        {filteredPlans.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center text-brand-body">
            No homes match your filters yet. Try broadening your criteria.
          </div>
        )}
      </div>
      </div>
    </div>
  );
}
