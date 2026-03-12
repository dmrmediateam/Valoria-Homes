"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { FloorPlanCarouselItem } from "@/lib/data";

type FloorPlanImageCarouselProps = {
  items: FloorPlanCarouselItem[];
  title: string;
};

function PdfThumbnailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-8 w-8 fill-none stroke-current stroke-[1.8]">
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M8 15h2a1.5 1.5 0 0 0 0-3H8v6" />
      <path d="M13 18h1.2a1.8 1.8 0 0 0 0-3.6H13z" />
      <path d="M18 12h-2v6" />
    </svg>
  );
}

export default function FloorPlanImageCarousel({ items, title }: FloorPlanImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [items]);

  if (!items.length) {
    return null;
  }

  const activeItem = items[activeIndex] ?? items[0];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? items.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === items.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_24px_70px_rgba(7,38,93,0.12)]">
        <div className="relative aspect-[4/3] min-h-[360px] w-full sm:min-h-[520px]">
          {activeItem.type === "image" ? (
            <Image
              src={activeItem.url}
              alt={activeItem.alt ?? `${title} photo ${activeIndex + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 60vw"
              priority
            />
          ) : (
            <div className="relative h-full w-full bg-white">
              <iframe
                src={`${activeItem.url}#view=FitH`}
                title={activeItem.alt ?? `${title} PDF preview`}
                className="h-full w-full"
              />
              <div className="pointer-events-none absolute left-4 top-4 rounded-full bg-brand-blue/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-white">
                PDF Preview
              </div>
              <a
                href={activeItem.url}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-4 right-4 inline-flex items-center rounded-full bg-brand-bronze px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
              >
                Open PDF
              </a>
            </div>
          )}
        </div>

        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/82 text-white transition hover:bg-brand-blue"
              aria-label="Show previous floor plan media"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/82 text-white transition hover:bg-brand-blue"
              aria-label="Show next floor plan media"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${item.type}-${item.url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-2xl border transition ${
                isActive
                  ? "border-brand-bronze shadow-[0_14px_28px_rgba(198,156,109,0.22)]"
                  : "border-brand-blue/10 bg-white hover:border-brand-blue/30"
              }`}
              aria-label={item.type === "pdf" ? "Show floor plan PDF preview" : `Show floor plan image ${index + 1}`}
              aria-pressed={isActive}
            >
              <div className="relative aspect-[4/3]">
                {item.type === "image" ? (
                  <Image
                    src={item.url}
                    alt={item.alt ?? `${title} thumbnail ${index + 1}`}
                    fill
                    className={`object-cover transition ${isActive ? "scale-[1.02]" : "opacity-85 hover:opacity-100"}`}
                    sizes="(max-width: 768px) 33vw, 18vw"
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-brand-offwhite px-3 text-brand-blue">
                    <PdfThumbnailIcon />
                    <span className="text-xs font-semibold uppercase tracking-[0.18em]">PDF</span>
                  </div>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
