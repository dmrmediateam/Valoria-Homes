import Link from "next/link";
import Image from "next/image";
import type { FloorPlan } from "@/lib/data";

type FloorPlanCardProps = {
  plan: FloorPlan;
};

export default function FloorPlanCard({ plan }: FloorPlanCardProps) {
  return (
    <article className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-card fade-in-up">
      <div className="h-52 w-full overflow-hidden">
        <Image
          src={plan.image}
          alt={plan.name}
          width={720}
          height={480}
          className="h-full w-full object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>
      <div className="p-6">
        <h3 className="font-heading text-2xl text-brand-blue">{plan.name}</h3>
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
          href="/contact"
          className="mt-6 inline-block rounded-md bg-brand-bronze px-4 py-2 text-sm font-semibold text-white transition hover:brightness-95"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
