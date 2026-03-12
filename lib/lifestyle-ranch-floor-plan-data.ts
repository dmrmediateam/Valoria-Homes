export const LIFESTYLE_RANCH_STYLE = {
  slug: "Lifestyle-Ranch",
  title: "Lifestyle Ranch",
  description:
    "Explore Lifestyle Ranch floor plans with practical single-level layouts, flexible bedroom counts, and brochure-backed plan options."
} as const;

export type LifestyleRanchPlanSeed = {
  name: string;
  beds: number;
  baths: number;
  pdfFilename: string;
};

export const lifestyleRanchPlanSeeds: LifestyleRanchPlanSeed[] = [
  { name: "Avalon", beds: 3, baths: 2, pdfFilename: "Avalon Floor Plan.pdf" },
  { name: "Belmont", beds: 3, baths: 2, pdfFilename: "Belmont Floor Plan.pdf" },
  { name: "Birmingham", beds: 3, baths: 2, pdfFilename: "Birmingham Floor Plan.pdf" },
  { name: "Boulder", beds: 2, baths: 2, pdfFilename: "Boulder Floor Plan.pdf" },
  { name: "Charleston II", beds: 3, baths: 2, pdfFilename: "Charleston II Floor Plan.pdf" },
  { name: "Colorado", beds: 2, baths: 2, pdfFilename: "Colorado Floor Plan.pdf" },
  { name: "Concord", beds: 3, baths: 2, pdfFilename: "Concord Floor Plan.pdf" },
  { name: "Danwood", beds: 3, baths: 2, pdfFilename: "Danwood Floor Plan.pdf" },
  { name: "Eastport", beds: 3, baths: 2, pdfFilename: "Eastport Floor Plan.pdf" },
  { name: "Edgewood", beds: 3, baths: 3, pdfFilename: "Edgewood Floor Plan.pdf" },
  { name: "Ferndale", beds: 3, baths: 2, pdfFilename: "Ferndale Floor Plan.pdf" },
  { name: "Gardendale", beds: 3, baths: 2, pdfFilename: "Gardendale Floor Plan.pdf" },
  { name: "Grafton", beds: 3, baths: 3, pdfFilename: "Grafton Floor Plan.pdf" },
  { name: "Granite Bay", beds: 3, baths: 2, pdfFilename: "Granite Bay Floor Plan.pdf" },
  { name: "Hamilton", beds: 3, baths: 2, pdfFilename: "Hamilton Floor Plan.pdf" },
  { name: "Hawthorne", beds: 3, baths: 2, pdfFilename: "Hawthorne Floor Plan.pdf" },
  { name: "Kendall Park", beds: 3, baths: 2, pdfFilename: "Kendall Park Floor Plan.pdf" },
  { name: "Laurel Bay", beds: 3, baths: 2, pdfFilename: "Laurel Bay Floor Plan.pdf" },
  { name: "Marshall", beds: 3, baths: 2, pdfFilename: "Marshall Floor Plan.pdf" },
  { name: "Mayfield", beds: 3, baths: 2, pdfFilename: "Mayfield Floor Plan.pdf" },
  { name: "McKinley", beds: 3, baths: 2, pdfFilename: "McKinley Floor Plan.pdf" },
  { name: "Milbridge", beds: 3, baths: 2, pdfFilename: "Milbridge Floor Plan.pdf" },
  { name: "Rosedale", beds: 4, baths: 2, pdfFilename: "Rosedale Floor Plan.pdf" },
  { name: "Roxboro", beds: 3, baths: 2, pdfFilename: "Roxboro Floor Plan.pdf" },
  { name: "Shannon", beds: 3, baths: 2, pdfFilename: "Shannon Floor Plan.pdf" },
  { name: "Sheldon", beds: 4, baths: 2, pdfFilename: "Sheldon Floor Plan.pdf" },
  { name: "St Clair", beds: 3, baths: 2, pdfFilename: "St Clair Floor Plan.pdf" },
  { name: "Sterling", beds: 3, baths: 2, pdfFilename: "Sterling Floor Plan.pdf" },
  { name: "Sullivan", beds: 3, baths: 2, pdfFilename: "Sullivan Floor Plan.pdf" },
  { name: "Summer Grove", beds: 3, baths: 3, pdfFilename: "Summer Grove Floor Plan.pdf" },
  { name: "Sun Room Design A", beds: 0, baths: 0, pdfFilename: "Sun Room Design A Floor Plan.pdf" },
  { name: "Sun Room Design B", beds: 0, baths: 0, pdfFilename: "Sun Room Design B Floor Plan.pdf" },
  { name: "Sunnybrook", beds: 2, baths: 2, pdfFilename: "Sunnybrook Floor Plan.pdf" },
  { name: "Trenton", beds: 3, baths: 2, pdfFilename: "Trenton Floor Plan.pdf" },
  { name: "Vincent", beds: 3, baths: 2, pdfFilename: "Vincent Floor Plan.pdf" },
  { name: "Washington", beds: 3, baths: 2, pdfFilename: "Washington Floor Plan.pdf" },
  { name: "Windsor", beds: 3, baths: 2, pdfFilename: "Windsor Floor Plan.pdf" },
  { name: "Wyoming II", beds: 3, baths: 2, pdfFilename: "Wyoming II Floor Plan.pdf" }
];

export function slugifyLifestyleRanchValue(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getLifestyleRanchPlanSlug(seed: Pick<LifestyleRanchPlanSeed, "name">): string {
  return slugifyLifestyleRanchValue(seed.name);
}

export function getLifestyleRanchAssetSlug(seed: Pick<LifestyleRanchPlanSeed, "pdfFilename">): string {
  return slugifyLifestyleRanchValue(seed.pdfFilename.replace(/\.pdf$/i, ""));
}

export function buildLifestyleRanchPlanDescription(seed: Pick<LifestyleRanchPlanSeed, "name" | "beds" | "baths">): string {
  if (seed.beds === 0 && seed.baths === 0) {
    return `${seed.name} is a Lifestyle Ranch brochure add-on that shows the available sun room layout option.`;
  }

  return `${seed.name} is a Lifestyle Ranch floor plan with ${seed.beds} bedrooms, ${seed.baths} bathrooms, and a brochure-based 1500 square foot placeholder.`;
}
