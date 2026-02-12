import FloorPlanCard from "@/components/FloorPlanCard";
import type { FloorPlan } from "@/lib/data";

type FloorPlanGridProps = {
  plans: FloorPlan[];
};

export default function FloorPlanGrid({ plans }: FloorPlanGridProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {plans.map((plan) => (
        <FloorPlanCard key={plan.id} plan={plan} />
      ))}
    </div>
  );
}
