export const WEEKENDER_STYLE = {
  slug: "Weekender",
  title: "Weekender"
} as const;

export type WeekenderPlanSeed = {
  name: string;
  beds: number;
  baths: number;
  pdfFilename: string;
};

export const weekenderPlanSeeds: WeekenderPlanSeed[] = [
  { name: "Cove", beds: 1, baths: 1, pdfFilename: "COVE - blackline.pdf" },
  { name: "Haven", beds: 1, baths: 1, pdfFilename: "HAVEN - blackline.pdf" },
  { name: "Nest", beds: 2, baths: 1, pdfFilename: "NEST - blackline.pdf" },
  { name: "Nook", beds: 1, baths: 1, pdfFilename: "NOOK - blackline.pdf" },
  { name: "Oasis", beds: 2, baths: 2, pdfFilename: "OASIS - blackline.pdf" }
];

export function slugifyWeekenderValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getWeekenderPlanSlug(seed: Pick<WeekenderPlanSeed, "name">): string {
  return slugifyWeekenderValue(seed.name);
}

export function getWeekenderAssetSlug(seed: Pick<WeekenderPlanSeed, "pdfFilename">): string {
  return slugifyWeekenderValue(seed.pdfFilename.replace(/\.pdf$/i, ""));
}

export function buildWeekenderPlanDescription(seed: Pick<WeekenderPlanSeed, "name" | "beds" | "baths">): string {
  return `${seed.name} is a Weekender floor plan with ${seed.beds} bedrooms, ${seed.baths} bathrooms, and 1200 square feet.`;
}
