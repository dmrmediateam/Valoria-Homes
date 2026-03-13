import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import {
  buildWeekenderPlanDescription,
  getWeekenderAssetSlug,
  getWeekenderPlanSlug,
  WEEKENDER_STYLE,
  weekenderPlanSeeds
} from "../lib/weekender-floor-plan-data";

type ExistingStyleDoc = {
  _id: string;
  slug: string;
};

type ExistingPlanDoc = {
  _id: string;
  slug: string;
  mainImageAssetId?: string;
  planPdfAssetId?: string;
  sortOrder?: number;
};

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bfrgtwqi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
const apiVersion = "2025-01-01";
const forceImageUpload = process.argv.includes("--force-images");

const client = token
  ? createClient({
      projectId,
      dataset,
      apiVersion,
      token,
      useCdn: false
    })
  : getCliClient({
      projectId,
      dataset,
      apiVersion,
      useCdn: false
    });

function getPreviewPath(assetSlug: string): string {
  return path.join(process.cwd(), "public", "floor-plans", "weekender", "previews", `${assetSlug}.png`);
}

function getPdfPath(assetSlug: string): string {
  return path.join(process.cwd(), "public", "floor-plans", "weekender", "pdfs", `${assetSlug}.pdf`);
}

async function uploadImageAsset(assetSlug: string): Promise<string> {
  const bytes = await readFile(getPreviewPath(assetSlug));
  const asset = await client.assets.upload("image", bytes, {
    filename: `${assetSlug}.png`,
    contentType: "image/png"
  });
  return asset._id;
}

async function uploadPdfAsset(assetSlug: string): Promise<string> {
  const bytes = await readFile(getPdfPath(assetSlug));
  const asset = await client.assets.upload("file", bytes, {
    filename: `${assetSlug}.pdf`,
    contentType: "application/pdf"
  });
  return asset._id;
}

async function importWeekenderFloorPlans() {
  console.log(`Importing Weekender floor plans into ${projectId}/${dataset}...`);

  const [styles, plans] = await Promise.all([
    client.fetch<ExistingStyleDoc[]>(
      `*[_type == "floorPlanStyle" && defined(slug.current)]{_id, "slug": slug.current}`
    ),
    client.fetch<ExistingPlanDoc[]>(
      `*[_type == "floorPlan" && defined(slug.current)]{
        _id,
        "slug": slug.current,
        "mainImageAssetId": mainImage.asset._ref,
        "planPdfAssetId": planPdf.asset._ref,
        sortOrder
      }`
    )
  ]);

  const styleDoc = styles.find((style) => style.slug === WEEKENDER_STYLE.slug);
  if (!styleDoc) {
    throw new Error(`Missing floorPlanStyle with slug ${WEEKENDER_STYLE.slug}`);
  }

  const existingPlanBySlug = new Map(plans.map((plan) => [plan.slug, plan]));

  for (const [index, seed] of weekenderPlanSeeds.entries()) {
    const slug = getWeekenderPlanSlug(seed);
    const assetSlug = getWeekenderAssetSlug(seed);
    const existingPlan = existingPlanBySlug.get(slug);
    const docId = existingPlan?._id ?? `floorPlan.${slug}`;
    const mainImageAssetId =
      !forceImageUpload && existingPlan?.mainImageAssetId ? existingPlan.mainImageAssetId : await uploadImageAsset(assetSlug);
    const planPdfAssetId = existingPlan?.planPdfAssetId ?? (await uploadPdfAsset(assetSlug));

    await client.createOrReplace({
      _id: docId,
      _type: "floorPlan",
      name: seed.name,
      slug: { _type: "slug", current: slug },
      style: { _type: "reference", _ref: styleDoc._id },
      beds: seed.beds,
      baths: seed.baths,
      sqFt: 1200,
      description: buildWeekenderPlanDescription(seed),
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: mainImageAssetId
        },
        alt: `${seed.name} floor plan`
      },
      galleryImages: [],
      planPdf: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: planPdfAssetId
        }
      },
      sortOrder: existingPlan?.sortOrder ?? index + 1
    });

    console.log(`Upserted Weekender plan: ${seed.name}`);
  }

  console.log(`Done. Imported ${weekenderPlanSeeds.length} Weekender entries.`);
}

importWeekenderFloorPlans().catch((error) => {
  console.error("Weekender import failed:", error);
  process.exit(1);
});
