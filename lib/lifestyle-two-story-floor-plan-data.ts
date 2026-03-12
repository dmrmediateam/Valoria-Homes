export const LIFESTYLE_TWO_STORY_STYLE = {
  slug: "Lifestyle-Two-Story",
  title: "Lifestyle Two Story"
} as const;

export type LifestyleTwoStoryPlanSeed = {
  name: string;
  beds: number;
  baths: number;
  firstFloorPdfFilename: string;
  secondFloorPdfFilename: string;
};

export const lifestyleTwoStoryPlanSeeds: LifestyleTwoStoryPlanSeed[] = [
  {
    name: "Brooklyn II",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Brooklyn II 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Brooklyn II 2nd Floor Plan.pdf"
  },
  {
    name: "Carlisle",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Carlisle 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Carlisle 2nd Floor Plan.pdf"
  },
  {
    name: "Chandler",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Chandler 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Chandler 2nd Floor Plan.pdf"
  },
  {
    name: "Elmhurst",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Elmhurst 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Elmhurst 2nd Floor Plan.pdf"
  },
  {
    name: "Fullerton",
    beds: 4,
    baths: 3,
    firstFloorPdfFilename: "Fullerton 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Fullerton 2nd Floor Plan.pdf"
  },
  {
    name: "Grandfield",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Grandfield 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Grandfield 2nd Floor Plan.pdf"
  },
  {
    name: "Meadow Valley",
    beds: 4,
    baths: 3,
    firstFloorPdfFilename: "Meadow Valley 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Meadow Valley 2nd Floor Plan.pdf"
  },
  {
    name: "Montreal",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Montreal 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Montreal 2nd Floor Plan.pdf"
  },
  {
    name: "Orchard Hills",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Orchard Hills 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Orchard Hills 2nd Floor Plan.pdf"
  },
  {
    name: "Providence",
    beds: 4,
    baths: 4,
    firstFloorPdfFilename: "Providence 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Providence 2nd Floor Plan.pdf"
  },
  {
    name: "Scarlett",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Scarlett 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Scarlett 2nd Floor Plan.pdf"
  },
  {
    name: "Tipton",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Tipton 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Tipton 2nd Floor Plan.pdf"
  },
  {
    name: "Westport",
    beds: 4,
    baths: 3,
    firstFloorPdfFilename: "Westport 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Westport 2nd Floor Plan.pdf"
  },
  {
    name: "Whitney",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Whitney 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Whitney 2nd Floor Plan.pdf"
  }
];

export function slugifyLifestyleTwoStoryValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLifestyleTwoStoryPlanSlug(seed: Pick<LifestyleTwoStoryPlanSeed, "name">): string {
  return slugifyLifestyleTwoStoryValue(seed.name);
}

export function buildLifestyleTwoStoryPlanDescription(
  seed: Pick<LifestyleTwoStoryPlanSeed, "name" | "beds" | "baths">
): string {
  return `${seed.name} is a Lifestyle Two Story floor plan with ${seed.beds} bedrooms, ${seed.baths} bathrooms, and 2000 square feet.`;
}
