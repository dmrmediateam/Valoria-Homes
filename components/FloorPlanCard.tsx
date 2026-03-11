import Link from "next/link";
import Image from "next/image";
import { buildFloorPlanHref, buildFloorPlanPdfDownloadHref, type FloorPlan } from "@/lib/data";

type FloorPlanCardProps = {
  plan: FloorPlan;
  variant?: "default" | "wide";
  fullCardLink?: boolean;
};

export default function FloorPlanCard({ plan, variant = "default", fullCardLink = false }: FloorPlanCardProps) {
  const pdfDownloadUrl = buildFloorPlanPdfDownloadHref(plan);
  const isWide = variant === "wide";
  const planHref = buildFloorPlanHref(plan);

  return (
    <article
      className={`relative overflow-hidden border border-slate-200 bg-white shadow-card fade-in-up ${
        isWide ? "rounded-2xl" : "rounded-lg"
      }`}
    >
      {fullCardLink && <Link href={planHref} className="absolute inset-0 z-10" aria-label={`Open ${plan.name} floor plan`} />}

      <div className={`w-full overflow-hidden ${isWide ? "h-64 lg:h-72" : "h-52"} ${fullCardLink ? "pointer-events-none" : ""}`}>
        <Image
          src={plan.image}
          alt={plan.name}
          width={720}
          height={480}
          className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className={`${isWide ? "p-7 lg:p-8" : "p-6"} ${fullCardLink ? "pointer-events-none relative z-20" : ""}`}>
        <h3 className={`font-heading text-brand-blue ${isWide ? "text-3xl lg:text-[2rem]" : "text-2xl"}`}>
          {plan.name}
        </h3>
        <p className={`leading-relaxed text-brand-body ${isWide ? "mt-4 text-base" : "mt-3 text-sm"}`}>
          {plan.description}
        </p>
        <div className={`grid grid-cols-3 text-brand-body ${isWide ? "mt-6 gap-4 text-base" : "mt-5 gap-3 text-sm"}`}>
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
        <div className={`flex flex-wrap gap-3 ${isWide ? "mt-7" : "mt-6"} ${fullCardLink ? "pointer-events-auto" : ""}`}>
          <Link
            href={planHref}
            className={`inline-block rounded-md bg-brand-bronze font-semibold text-white transition hover:brightness-95 ${
              isWide ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm"
            }`}
          >
            View Plan Details
          </Link>
          {plan.pdfUrl && (
            <>
              <a
                href={plan.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-md border border-brand-blue/25 font-semibold text-brand-blue transition hover:bg-brand-blue/5 ${
                  isWide ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm"
                }`}
              >
                View PDF
              </a>
              <a
                href={pdfDownloadUrl ?? plan.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-block rounded-md border border-brand-blue/25 font-semibold text-brand-blue transition hover:bg-brand-blue/5 ${
                  isWide ? "px-5 py-2.5 text-base" : "px-4 py-2 text-sm"
                }`}
              >
                Download PDF
              </a>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
