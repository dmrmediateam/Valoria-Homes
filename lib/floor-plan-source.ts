import "server-only";

import { floorPlans as fallbackFloorPlans, type FloorPlan } from "@/lib/data";
import { floorPlanStyles as fallbackFloorPlanStyles, type FloorPlanStyle } from "@/lib/floor-plan-styles";
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
};

async function getSanityFloorPlanStyles(): Promise<FloorPlanStyle[]> {
  try {
    const styles = await client.fetch<SanityFloorPlanStyle[]>(floorPlanStylesQuery);
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
    const plans = await client.fetch<SanityFloorPlan[]>(floorPlansQuery);
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
        description: plan.description
      }));
  } catch {
    return [];
  }
}

export async function getFloorPlanStylesSource(): Promise<FloorPlanStyle[]> {
  const styles = await getSanityFloorPlanStyles();
  return styles.length > 0 ? styles : fallbackFloorPlanStyles;
}

export async function getFloorPlansSource(): Promise<FloorPlan[]> {
  const plans = await getSanityFloorPlans();
  return plans.length > 0 ? plans : fallbackFloorPlans;
}

export async function getFloorPlansByStyleSlugSource(styleSlug: string): Promise<FloorPlan[]> {
  const plans = await getFloorPlansSource();
  return plans.filter((plan) => plan.styleSlug === styleSlug);
}

export async function getFloorPlanByStyleAndIdSource(styleSlug: string, planId: string): Promise<FloorPlan | undefined> {
  const plans = await getFloorPlansSource();
  return plans.find((plan) => plan.styleSlug === styleSlug && plan.id === planId);
}
