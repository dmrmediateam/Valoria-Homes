export type FloorPlanStyle = {
  slug: string;
  title: string;
  description: string;
};

export const floorPlanStyles: FloorPlanStyle[] = [
  {
    slug: "starter-series",
    title: "Starter Series",
    description:
      "Explore Starter Series modular home plans designed for first-time buyers and growing households focused on long-term value."
  },
  {
    slug: "single-section",
    title: "Single Section",
    description:
      "Explore Single Section modular home plans with efficient footprints, smart layouts, and dependable everyday functionality."
  },
  {
    slug: "cape-cod",
    title: "Cape Cod",
    description:
      "Explore Cape Cod style modular home options with practical layouts designed for long-term comfort and efficient family living."
  },
  {
    slug: "chalet",
    title: "Chalet",
    description:
      "Explore Chalet style modular home options with warm, spacious designs tailored to modern family needs and Midwest lifestyles."
  },
  {
    slug: "colonial",
    title: "Colonial",
    description:
      "Explore Colonial style modular home options featuring timeless curb appeal, balanced layouts, and durable construction."
  },
  {
    slug: "cottage",
    title: "Cottage",
    description:
      "Explore Cottage style modular home options with inviting interiors, functional floor plans, and quality craftsmanship."
  },
  {
    slug: "duplex",
    title: "Duplex",
    description:
      "Explore Duplex style modular home options designed for multi-family flexibility, efficient space use, and long-term value."
  },
  {
    slug: "ranch",
    title: "Ranch",
    description:
      "Explore Ranch style modular home options with single-level convenience, open living spaces, and dependable build quality."
  }
];

export function getFloorPlanStyleBySlug(slug: string): FloorPlanStyle | undefined {
  return floorPlanStyles.find((style) => style.slug === slug);
}
