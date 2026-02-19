import FloorPlanCard from "@/components/FloorPlanCard";
import type { FloorPlan } from "@/lib/data";

type FloorPlanGridProps = {
  plans: FloorPlan[];
};

export default function FloorPlanGrid({ plans }: FloorPlanGridProps) {
  if (plans.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-brand-body/80">
        Plans for this style are coming soon. Contact us and we can help you choose the right direction now.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <FloorPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
