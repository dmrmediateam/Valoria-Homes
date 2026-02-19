import { buildFloorPlanHref, floorPlans } from "@/lib/data";
import { floorPlanStyles, getFloorPlanStyleBySlug } from "@/lib/floor-plan-styles";

export type ChangeFrequency = "daily" | "weekly" | "monthly";

export interface ContentEntry {
  slug: "/" | `/${string}`;
  title: string;
  description: string;
  publishDate: string;
  modifiedDate: string;
  category: string;
  tags: string[];
  author: string;
  priority: number;
  changeFrequency: ChangeFrequency;
}

const baseContentRegistry: ContentEntry[] = [
  {
    slug: "/",
    title: "Quality Modular Homes Built to Last",
    description:
      "Valoria Homes builds durable, high-quality modular homes designed for Midwestern families. View floor plans and start building today.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Core",
    tags: ["Modular Homes", "Midwest", "Custom Homes"],
    author: "Valoria Homes",
    priority: 1,
    changeFrequency: "weekly"
  },
  {
    slug: "/floor-plans",
    title: "Floor Plans",
    description:
      "Browse Valoria Homes floor plans with practical layouts, quality construction, and family-focused designs built for Midwest living.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Floor Plans",
    tags: ["Floor Plans", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.9,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process",
    title: "Build Process",
    description:
      "Learn how Valoria Homes guides your project from consultation to move-in with a clear, proven modular home building process.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Process",
    tags: ["Build Process", "Modular Construction", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.8,
    changeFrequency: "weekly"
  },
  {
    slug: "/get-started",
    title: "Get Started",
    description:
      "Get started with Valoria Homes and understand the modular homebuying process, common FAQs, and the next steps to begin your project.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Resources",
    tags: ["Getting Started", "FAQ", "Homebuying", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.8,
    changeFrequency: "weekly"
  },
  {
    slug: "/about",
    title: "About",
    description:
      "Learn about Valoria Homes, a modular home builder focused on craftsmanship, reliability, and family-centered design.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Company",
    tags: ["About", "Company", "Values", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "monthly"
  },
  {
    slug: "/blogs",
    title: "Blog",
    description:
      "Insights and updates on modular homes, building tips, and the Valoria Homes community.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Resources",
    tags: ["Blog", "Modular Homes", "Building Tips"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/contact",
    title: "Contact",
    description:
      "Contact Valoria Homes to discuss floor plans, timelines, and next steps for building your modular home.",
    publishDate: "2026-02-11",
    modifiedDate: "2026-02-16",
    category: "Conversion",
    tags: ["Contact", "Consultation", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.8,
    changeFrequency: "weekly"
  }
];

const floorPlanContentRegistry: ContentEntry[] = floorPlans.map((plan) => ({
  slug: buildFloorPlanHref(plan),
  title: `${plan.name} Floor Plan`,
  description: `${plan.description} ${plan.beds} beds, ${plan.baths} baths, ${plan.sqFt} sq ft modular design.`,
  publishDate: "2026-02-11",
  modifiedDate: "2026-02-16",
  category: "Floor Plans",
  tags: [
    "Floor Plans",
    "Modular Homes",
    `${plan.beds} Bedroom`,
    `${plan.sqFt} Sq Ft`,
    getFloorPlanStyleBySlug(plan.styleSlug)?.title ?? "Style"
  ],
  author: "Valoria Homes",
  priority: 0.7,
  changeFrequency: "weekly"
}));

const floorPlanStyleContentRegistry: ContentEntry[] = floorPlanStyles.map((style) => ({
  slug: `/floor-plans/${style.slug}` as `/${string}`,
  title: `${style.title} Floor Plans`,
  description: style.description,
  publishDate: "2026-02-11",
  modifiedDate: "2026-02-16",
  category: "Floor Plans",
  tags: ["Floor Plans", "Modular Homes", style.title],
  author: "Valoria Homes",
  priority: 0.7,
  changeFrequency: "weekly"
}));

export const contentRegistry: ContentEntry[] = [
  ...baseContentRegistry,
  ...floorPlanContentRegistry,
  ...floorPlanStyleContentRegistry
];

export function getContentEntry(slug: string): ContentEntry | undefined {
  return contentRegistry.find((entry) => entry.slug === slug);
}
