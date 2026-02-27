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
    slug: "/our-homes",
    title: "Our Homes",
    description:
      "Explore Valoria homes through photos, videos, virtual tours, and model-home visits to compare styles and layouts.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Homes",
    tags: ["Our Homes", "Photo Gallery", "Virtual Tours", "Modular Homes"],
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

const ourHomesContentRegistry: ContentEntry[] = [
  {
    slug: "/our-homes/photo-gallery",
    title: "Photo Gallery",
    description: "Browse curated photos of completed Valoria homes, design finishes, and exterior styles.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Homes",
    tags: ["Our Homes", "Photo Gallery", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/our-homes/videos",
    title: "Videos",
    description: "Watch Valoria home walkthroughs, process clips, and design-focused highlights.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Homes",
    tags: ["Our Homes", "Videos", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/our-homes/virtual-tours",
    title: "Virtual Tours",
    description: "Take virtual tours to compare Valoria layouts and room flow from anywhere.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Homes",
    tags: ["Our Homes", "Virtual Tours", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/our-homes/visit-our-model-homes",
    title: "Visit Our Model Homes",
    description: "Plan an in-person visit to tour Valoria model homes and experience build quality firsthand.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Homes",
    tags: ["Our Homes", "Model Homes", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  }
];

const buildProcessSubpageRegistry: ContentEntry[] = [
  {
    slug: "/build-process/building-green",
    title: "Building Green",
    description: "See how Valoria applies efficient, lower-waste modular building practices.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Building Green", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process/design-and-ordering-process",
    title: "Design and Ordering Process",
    description: "Understand how selections, approvals, and ordering are structured at Valoria Homes.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Design", "Ordering", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process/modular-construction",
    title: "Modular Construction",
    description: "Learn the fundamentals of modular construction and why consistency matters.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Modular Construction", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process/modular-vs-manufactured",
    title: "Modular vs. Manufactured",
    description: "Compare modular and manufactured housing with practical differences that affect buyers.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Modular vs Manufactured", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process/precision-building",
    title: "Precision Building",
    description: "How factory precision and repeatable processes support better construction outcomes.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Precision Building", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process/site-built-vs-factory-built",
    title: "Site Built vs. Factory Built",
    description: "A side-by-side comparison of site-built and factory-built timelines and process control.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Factory Built", "Site Built", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/build-process/warranty",
    title: "Warranty",
    description: "Review warranty coverage expectations and support after your home is complete.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Process",
    tags: ["Build Process", "Warranty", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  }
];

const aboutSubpageRegistry: ContentEntry[] = [
  {
    slug: "/about/our-philosophy",
    title: "Our Philosophy",
    description: "The principles that guide how Valoria plans and builds durable modular homes.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Company",
    tags: ["About", "Philosophy", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "monthly"
  },
  {
    slug: "/about/our-team",
    title: "Our Team",
    description: "Meet the Valoria team supporting your home journey from planning to completion.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Company",
    tags: ["About", "Team", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "monthly"
  },
  {
    slug: "/about/valoria-homes-reviews",
    title: "Valoria Homes Reviews",
    description: "Read feedback from homeowners who have built with Valoria Homes.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-24",
    category: "Company",
    tags: ["About", "Reviews", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "monthly"
  }
];

const resourcesSubpageRegistry: ContentEntry[] = [
  {
    slug: "/get-started/faq",
    title: "FAQs",
    description: "Frequently asked questions about timelines, financing, customization, and next steps with Valoria.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-27",
    category: "Resources",
    tags: ["Get Started", "FAQs", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/get-started/homebuying-process",
    title: "Home Buying Process",
    description: "Follow a clear five-step home buying process from research and budgeting to installation.",
    publishDate: "2026-02-27",
    modifiedDate: "2026-02-27",
    category: "Resources",
    tags: ["Get Started", "Homebuying Process", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/get-started/terms-and-definitions",
    title: "Terms & Definitions",
    description: "Learn common homebuying, financing, and construction terms used throughout the process.",
    publishDate: "2026-02-27",
    modifiedDate: "2026-02-27",
    category: "Resources",
    tags: ["Get Started", "Terms", "Definitions", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
    changeFrequency: "weekly"
  },
  {
    slug: "/get-started/mortgage-calculator",
    title: "Mortgage Calculator",
    description: "Estimate payment scenarios as you plan your modular home budget.",
    publishDate: "2026-02-24",
    modifiedDate: "2026-02-27",
    category: "Resources",
    tags: ["Get Started", "Mortgage", "Calculator", "Modular Homes"],
    author: "Valoria Homes",
    priority: 0.7,
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
  ...ourHomesContentRegistry,
  ...buildProcessSubpageRegistry,
  ...aboutSubpageRegistry,
  ...resourcesSubpageRegistry,
  ...floorPlanContentRegistry,
  ...floorPlanStyleContentRegistry
];

export function getContentEntry(slug: string): ContentEntry | undefined {
  return contentRegistry.find((entry) => entry.slug === slug);
}
