import "server-only";

import { type FloorPlan } from "@/lib/data";
import { type FloorPlanStyle } from "@/lib/floor-plan-styles";
import { client } from "@/lib/sanity";
import { floorPlansQuery, floorPlanStylesQuery } from "@/lib/sanity.queries";

type SanityFloorPlanStyle = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  previewImage: string | null;
};

type SanityFloorPlan = {
  _id: string;
  name: string;
  id: string;
  styleSlug: string;
  beds: number;
  baths: number;
  sqFt: number;
  description: string;
  image: string;
  pdfUrl: string | null;
  pdfFilename: string | null;
};

export const FLOOR_PLAN_TAGS = {
  plans: "sanity:floor-plans",
  styles: "sanity:floor-plan-styles"
} as const;

export const FLOOR_PLAN_REVALIDATE_TAGS = Object.values(FLOOR_PLAN_TAGS);

async function getSanityFloorPlanStyles(): Promise<FloorPlanStyle[]> {
  try {
    const styles = await client.fetch<SanityFloorPlanStyle[]>(floorPlanStylesQuery, {}, {
      useCdn: false,
      next: {
        tags: [FLOOR_PLAN_TAGS.styles]
      }
    });
    if (!styles || styles.length === 0) {
      return [];
    }

    return styles.map((style) => ({
      slug: style.slug,
      title: style.title,
      description: style.description
    }));
  } catch {
    return [];
  }
}

async function getSanityFloorPlans(): Promise<FloorPlan[]> {
  try {
    const plans = await client.fetch<SanityFloorPlan[]>(floorPlansQuery, {}, {
      useCdn: false,
      next: {
        tags: [FLOOR_PLAN_TAGS.plans, FLOOR_PLAN_TAGS.styles]
      }
    });
    if (!plans || plans.length === 0) {
      return [];
    }

    return plans
      .filter((plan) => Boolean(plan.id && plan.styleSlug && plan.image))
      .map((plan) => ({
        id: plan.id,
        name: plan.name,
        styleSlug: plan.styleSlug,
        beds: Number(plan.beds),
        baths: Number(plan.baths),
        sqFt: Number(plan.sqFt),
        image: plan.image,
        description: plan.description,
        pdfUrl: plan.pdfUrl ?? undefined,
        pdfFilename: plan.pdfFilename ?? undefined
      }));
  } catch {
    return [];
  }
}

export async function getFloorPlanStylesSource(): Promise<FloorPlanStyle[]> {
  return getSanityFloorPlanStyles();
}

export async function getFloorPlansSource(): Promise<FloorPlan[]> {
  return getSanityFloorPlans();
}

export async function getFloorPlansByStyleSlugSource(styleSlug: string): Promise<FloorPlan[]> {
  const plans = await getFloorPlansSource();
  return plans.filter((plan) => plan.styleSlug === styleSlug);
}

export async function getFloorPlanByStyleAndIdSource(styleSlug: string, planId: string): Promise<FloorPlan | undefined> {
  const plans = await getFloorPlansSource();
  return plans.find((plan) => plan.styleSlug === styleSlug && plan.id === planId);
}
