"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { FloorPlanGalleryImage } from "@/lib/data";

type FloorPlanImageCarouselProps = {
  images: FloorPlanGalleryImage[];
  title: string;
};

export default function FloorPlanImageCarousel({ images, title }: FloorPlanImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [images]);

  if (!images.length) {
    return null;
  }

  const activeImage = images[activeIndex] ?? images[0];

  const goToPrevious = () => {
    setActiveIndex((current) => (current === 0 ? images.length - 1 : current - 1));
  };

  const goToNext = () => {
    setActiveIndex((current) => (current === images.length - 1 ? 0 : current + 1));
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[28px] border border-white/60 bg-white shadow-[0_24px_70px_rgba(7,38,93,0.12)]">
        <div className="relative aspect-[4/3] min-h-[360px] w-full sm:min-h-[520px]">
          <Image
            src={activeImage.url}
            alt={activeImage.alt ?? `${title} photo ${activeIndex + 1}`}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 60vw"
            priority
          />
        </div>

        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/82 text-white transition hover:bg-brand-blue"
              aria-label="Show previous floor plan image"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
            <button
              type="button"
              onClick={goToNext}
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-brand-blue/82 text-white transition hover:bg-brand-blue"
              aria-label="Show next floor plan image"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-[2]">
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
        {images.map((image, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={`${image.url}-${index}`}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative overflow-hidden rounded-2xl border transition ${
                isActive
                  ? "border-brand-bronze shadow-[0_14px_28px_rgba(198,156,109,0.22)]"
                  : "border-brand-blue/10 bg-white hover:border-brand-blue/30"
              }`}
              aria-label={`Show floor plan image ${index + 1}`}
              aria-pressed={isActive}
            >
              <div className="relative aspect-[4/3]">
                <Image
                  src={image.url}
                  alt={image.alt ?? `${title} thumbnail ${index + 1}`}
                  fill
                  className={`object-cover transition ${isActive ? "scale-[1.02]" : "opacity-85 hover:opacity-100"}`}
                  sizes="(max-width: 768px) 33vw, 18vw"
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
