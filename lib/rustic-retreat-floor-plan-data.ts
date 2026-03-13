export const RUSTIC_RETREAT_STYLE = {
  slug: "Rustic-Retreat",
  title: "Rustic Retreat"
} as const;

type RusticRetreatSinglePlanSeed = {
  kind: "single";
  name: string;
  beds: number;
  baths: number;
  pdfFilename: string;
};

type RusticRetreatPairedPlanSeed = {
  kind: "paired";
  name: string;
  beds: number;
  baths: number;
  firstFloorPdfFilename: string;
  secondFloorPdfFilename: string;
};

export type RusticRetreatPlanSeed = RusticRetreatSinglePlanSeed | RusticRetreatPairedPlanSeed;

export const rusticRetreatPlanSeeds: RusticRetreatPlanSeed[] = [
  {
    kind: "paired",
    name: "Alpine Villa",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Alpine Villa 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Alpine Villa 2nd Floor Plan.pdf"
  },
  { kind: "single", name: "Birchwood", beds: 3, baths: 2, pdfFilename: "Birchwood Floor Plan.pdf" },
  { kind: "single", name: "Cedar Ridge", beds: 2, baths: 1, pdfFilename: "Cedar Ridge Floor Plan.pdf" },
  { kind: "single", name: "Cedarburg", beds: 2, baths: 1, pdfFilename: "Cedarburg Floor Plan.pdf" },
  {
    kind: "paired",
    name: "Clearwater",
    beds: 3,
    baths: 2,
    firstFloorPdfFilename: "Clearwater 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Clearwater Opt Loft 2nd Floor Plan.pdf"
  },
  { kind: "single", name: "Lake Forest", beds: 2, baths: 2, pdfFilename: "Lake Forest Floor Plan.pdf" },
  {
    kind: "paired",
    name: "Lakeshire",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Lakeshire 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Lakeshire 2nd Floor Plan.pdf"
  },
  { kind: "single", name: "Lakeview", beds: 3, baths: 2, pdfFilename: "Lakeview Floor Plan.pdf" },
  { kind: "single", name: "Paxton II", beds: 2, baths: 2, pdfFilename: "Paxton II Floor Plan.pdf" },
  { kind: "single", name: "River Valley", beds: 2, baths: 2, pdfFilename: "River Valley Floor Plan.pdf" },
  { kind: "single", name: "Sun Valley", beds: 4, baths: 2, pdfFilename: "Sun Valley Floor Plan.pdf" },
  {
    kind: "paired",
    name: "Tahoe",
    beds: 3,
    baths: 2,
    firstFloorPdfFilename: "Tahoe 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Tahoe 2nd Floor Plan.pdf"
  },
  {
    kind: "paired",
    name: "Tamarack",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Tamarack 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Tamarack 2nd Floor Plan.pdf"
  },
  {
    kind: "paired",
    name: "Timber Bluff",
    beds: 3,
    baths: 2,
    firstFloorPdfFilename: "Timber Bluff 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Timber Bluff 2nd Floor Plan.pdf"
  },
  {
    kind: "paired",
    name: "Timber Creek",
    beds: 3,
    baths: 2,
    firstFloorPdfFilename: "Timber Creek 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Timber Creek 2nd Floor Plan.pdf"
  },
  {
    kind: "paired",
    name: "Timber Grove",
    beds: 3,
    baths: 2,
    firstFloorPdfFilename: "Timber Grove 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Timber Grove 2nd Floor Plan.pdf"
  },
  {
    kind: "paired",
    name: "Timber Lodge",
    beds: 3,
    baths: 3,
    firstFloorPdfFilename: "Timber Lodge 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Timber Lodge 2nd Floor Plan.pdf"
  },
  {
    kind: "paired",
    name: "Timber Trail",
    beds: 3,
    baths: 2,
    firstFloorPdfFilename: "Timber Trail 1st Floor Plan.pdf",
    secondFloorPdfFilename: "Timber Trail 2nd Floor Plan.pdf"
  }
];

export function slugifyRusticRetreatValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getRusticRetreatPlanSlug(seed: Pick<RusticRetreatPlanSeed, "name">): string {
  return slugifyRusticRetreatValue(seed.name);
}

export function buildRusticRetreatPlanDescription(seed: Pick<RusticRetreatPlanSeed, "name" | "beds" | "baths">): string {
  return `${seed.name} is a Rustic Retreat floor plan with ${seed.beds} bedrooms, ${seed.baths} bathrooms, and 3000 square feet.`;
}
