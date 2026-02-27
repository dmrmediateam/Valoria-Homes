/**
 * Seed script to create example floor plan styles and floor plans in Sanity.
 *
 * Prerequisites:
 * 1. Ensure Sanity schema is deployed.
 * 2. Add SANITY_API_WRITE_TOKEN to .env.local.
 *
 * Run: npx tsx scripts/seed-floor-plans.ts
 */

import { createClient } from "@sanity/client";

type SeedStyle = {
  slug: string;
  title: string;
  description: string;
};

type SeedPlan = {
  slug: string;
  name: string;
  styleSlug: string;
  beds: number;
  baths: number;
  sqFt: number;
  description: string;
  imageUrl: string;
  sortOrder: number;
};

type ExistingStyleDoc = {
  _id: string;
  slug: string;
};

type ExistingPlanDoc = {
  _id: string;
  slug: string;
  mainImageAssetId?: string;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bfrgtwqi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Add a write token to .env.local to run this script.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false
});

const styles: SeedStyle[] = [
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

const plans: SeedPlan[] = [
  {
    slug: "meadowbrook-2140",
    name: "Meadowbrook 2140",
    styleSlug: "ranch",
    beds: 3,
    baths: 2,
    sqFt: 2140,
    description: "Open-concept living with a generous kitchen island and private owner suite designed for growing families.",
    imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 1
  },
  {
    slug: "timber-ridge-1980",
    name: "Timber Ridge 1980",
    styleSlug: "ranch",
    beds: 3,
    baths: 2,
    sqFt: 1980,
    description: "Single-level ranch with split-bedroom layout and an oversized mudroom for active households.",
    imageUrl: "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 2
  },
  {
    slug: "pine-ridge-1885",
    name: "Pine Ridge 1885",
    styleSlug: "single-section",
    beds: 3,
    baths: 2,
    sqFt: 1885,
    description: "Efficient single-story layout with practical storage, mudroom access, and durable finishes throughout.",
    imageUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 3
  },
  {
    slug: "harbor-view-1670",
    name: "Harbor View 1670",
    styleSlug: "single-section",
    beds: 2,
    baths: 2,
    sqFt: 1670,
    description: "Compact footprint with open kitchen-living core and flexible office nook for remote work.",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-c7171b42498f?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 4
  },
  {
    slug: "heritage-2420",
    name: "Heritage 2420",
    styleSlug: "colonial",
    beds: 4,
    baths: 2.5,
    sqFt: 2420,
    description: "A spacious two-level design with defined living spaces, ideal for entertaining and multi-generational needs.",
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 5
  },
  {
    slug: "ashford-2580",
    name: "Ashford 2580",
    styleSlug: "colonial",
    beds: 4,
    baths: 3,
    sqFt: 2580,
    description: "Classic colonial curb appeal paired with a modern open kitchen and upstairs loft retreat.",
    imageUrl: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 6
  },
  {
    slug: "oakview-2010",
    name: "Oakview 2010",
    styleSlug: "starter-series",
    beds: 3,
    baths: 2,
    sqFt: 2010,
    description: "Balanced layout with dedicated office flex room and natural-light dining area for everyday comfort.",
    imageUrl: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 7
  },
  {
    slug: "river-bend-1540",
    name: "River Bend 1540",
    styleSlug: "starter-series",
    beds: 2,
    baths: 2,
    sqFt: 1540,
    description: "Smart starter plan with integrated storage, island seating, and an efficient split-bedroom layout.",
    imageUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 8
  },
  {
    slug: "prairie-classic-1760",
    name: "Prairie Classic 1760",
    styleSlug: "cottage",
    beds: 3,
    baths: 2,
    sqFt: 1760,
    description: "Cost-conscious plan with dependable materials, ideal for first-time buyers wanting long-term value.",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 9
  },
  {
    slug: "maple-lane-1695",
    name: "Maple Lane 1695",
    styleSlug: "cottage",
    beds: 3,
    baths: 2,
    sqFt: 1695,
    description: "Cozy cottage style with front porch charm and an open main living area.",
    imageUrl: "https://images.unsplash.com/photo-1605146768851-eda79da39897?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 10
  },
  {
    slug: "timberline-2285",
    name: "Timberline 2285",
    styleSlug: "chalet",
    beds: 4,
    baths: 3,
    sqFt: 2285,
    description: "Large family-forward design with guest suite option, oversized pantry, and spacious main living zone.",
    imageUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 11
  },
  {
    slug: "summit-view-2360",
    name: "Summit View 2360",
    styleSlug: "chalet",
    beds: 4,
    baths: 2.5,
    sqFt: 2360,
    description: "Vaulted chalet design with dramatic windows and seamless indoor-outdoor gathering zones.",
    imageUrl: "https://images.unsplash.com/photo-1600585152220-90363fe7e115?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 12
  },
  {
    slug: "harvest-cape-2310",
    name: "Harvest Cape 2310",
    styleSlug: "cape-cod",
    beds: 4,
    baths: 2.5,
    sqFt: 2310,
    description: "Cape Cod profile with first-floor owner suite and roomy second-level bedrooms.",
    imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 13
  },
  {
    slug: "shoreline-cape-2195",
    name: "Shoreline Cape 2195",
    styleSlug: "cape-cod",
    beds: 3,
    baths: 2.5,
    sqFt: 2195,
    description: "Traditional Cape Cod proportions with modern kitchen workflow and flexible bonus room.",
    imageUrl: "https://images.unsplash.com/photo-1600607687644-aac4c3eac7f4?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 14
  },
  {
    slug: "oak-duplex-2480",
    name: "Oak Duplex 2480",
    styleSlug: "duplex",
    beds: 4,
    baths: 4,
    sqFt: 2480,
    description: "Two mirrored living units designed for rental flexibility and long-term multi-family value.",
    imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 15
  },
  {
    slug: "cedar-duplex-2620",
    name: "Cedar Duplex 2620",
    styleSlug: "duplex",
    beds: 6,
    baths: 4,
    sqFt: 2620,
    description: "Expanded duplex footprint with private entries and balanced unit layouts for shared ownership.",
    imageUrl: "https://images.unsplash.com/photo-1576941089067-2de3c901e126?auto=format&fit=crop&w=1400&q=80",
    sortOrder: 16
  }
];

async function uploadImageFromUrl(url: string, filenameBase: string): Promise<string> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Failed to fetch image ${url}: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get("content-type") ?? "image/jpeg";
  const extension = contentType.includes("png") ? "png" : "jpg";
  const bytes = Buffer.from(await response.arrayBuffer());

  const asset = await client.assets.upload("image", bytes, {
    filename: `${filenameBase}.${extension}`,
    contentType
  });

  return asset._id;
}

async function seed() {
  console.log(`Seeding floor plan styles and plans into ${projectId}/${dataset}...`);

  const existingStyles = await client.fetch<ExistingStyleDoc[]>(
    `*[_type == "floorPlanStyle" && defined(slug.current)]{_id, "slug": slug.current}`
  );
  const existingPlans = await client.fetch<ExistingPlanDoc[]>(
    `*[_type == "floorPlan" && defined(slug.current)]{_id, "slug": slug.current, "mainImageAssetId": mainImage.asset._ref}`
  );

  const existingStyleBySlug = new Map(existingStyles.map((doc) => [doc.slug, doc]));
  const existingPlanBySlug = new Map(existingPlans.map((doc) => [doc.slug, doc]));
  const styleIdBySlug = new Map<string, string>();

  for (const [index, style] of styles.entries()) {
    const existing = existingStyleBySlug.get(style.slug);
    const docId = existing?._id ?? `floorPlanStyle.${style.slug}`;

    await client.createOrReplace({
      _id: docId,
      _type: "floorPlanStyle",
      title: style.title,
      slug: { _type: "slug", current: style.slug },
      description: style.description,
      sortOrder: index + 1
    });

    styleIdBySlug.set(style.slug, docId);
    console.log(`Upserted style: ${style.title}`);
  }

  for (const plan of plans) {
    const styleId = styleIdBySlug.get(plan.styleSlug);
    if (!styleId) {
      throw new Error(`Missing style for slug: ${plan.styleSlug}`);
    }

    const existing = existingPlanBySlug.get(plan.slug);
    const docId = existing?._id ?? `floorPlan.${plan.slug}`;
    const mainImageAssetId = existing?.mainImageAssetId ?? (await uploadImageFromUrl(plan.imageUrl, plan.slug));

    await client.createOrReplace({
      _id: docId,
      _type: "floorPlan",
      name: plan.name,
      slug: { _type: "slug", current: plan.slug },
      style: { _type: "reference", _ref: styleId },
      beds: plan.beds,
      baths: plan.baths,
      sqFt: plan.sqFt,
      description: plan.description,
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: mainImageAssetId
        },
        alt: `${plan.name} exterior`
      },
      sortOrder: plan.sortOrder
    });

    console.log(`Upserted plan: ${plan.name}`);
  }

  console.log(`Done. Seeded ${styles.length} styles and ${plans.length} floor plans.`);
}

seed().catch((error) => {
  console.error("Floor plan seed failed:", error);
  process.exit(1);
});
