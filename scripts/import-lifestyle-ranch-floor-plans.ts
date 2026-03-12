/**
 * Import the Lifestyle Ranch brochure floor plans into Sanity.
 *
 * Prerequisites:
 * 1. Add SANITY_API_WRITE_TOKEN to .env.local.
 * 2. Ensure the brochure PDFs and preview PNGs exist in public/floor-plans/lifestyle-ranch.
 *
 * Run:
 * npx tsx scripts/import-lifestyle-ranch-floor-plans.ts
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import {
  buildLifestyleRanchPlanDescription,
  getLifestyleRanchAssetSlug,
  getLifestyleRanchPlanSlug,
  LIFESTYLE_RANCH_STYLE,
  lifestyleRanchPlanSeeds
} from "../lib/lifestyle-ranch-floor-plan-data";

type ExistingStyleDoc = {
  _id: string;
  slug: string;
  previewImageAssetId?: string;
  sortOrder?: number;
};

type ExistingPlanDoc = {
  _id: string;
  slug: string;
  mainImageAssetId?: string;
  planPdfAssetId?: string;
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

function getPreviewImagePath(assetSlug: string): string {
  return path.join(process.cwd(), "public", "floor-plans", "lifestyle-ranch", "previews", `${assetSlug}.png`);
}

function getPdfPath(assetSlug: string): string {
  return path.join(process.cwd(), "public", "floor-plans", "lifestyle-ranch", "pdfs", `${assetSlug}.pdf`);
}

async function uploadImageAsset(assetSlug: string): Promise<string> {
  const bytes = await readFile(getPreviewImagePath(assetSlug));
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

async function importLifestyleRanchFloorPlans() {
  console.log(`Importing Lifestyle Ranch floor plans into ${projectId}/${dataset}...`);

  const [existingStyles, existingPlans] = await Promise.all([
    client.fetch<ExistingStyleDoc[]>(
      `*[_type == "floorPlanStyle" && defined(slug.current)]{
        _id,
        "slug": slug.current,
        "previewImageAssetId": previewImage.asset._ref,
        sortOrder
      }`
    ),
    client.fetch<ExistingPlanDoc[]>(
      `*[_type == "floorPlan" && defined(slug.current)]{
        _id,
        "slug": slug.current,
        "mainImageAssetId": mainImage.asset._ref,
        "planPdfAssetId": planPdf.asset._ref
      }`
    )
  ]);

  const existingStyleBySlug = new Map(existingStyles.map((style) => [style.slug, style]));
  const existingPlanBySlug = new Map(existingPlans.map((plan) => [plan.slug, plan]));
  const maxStyleSortOrder = existingStyles.reduce((max, style) => Math.max(max, style.sortOrder ?? 0), 0);
  const existingStyle = existingStyleBySlug.get(LIFESTYLE_RANCH_STYLE.slug);
  const styleDocId = existingStyle?._id ?? `floorPlanStyle.${LIFESTYLE_RANCH_STYLE.slug}`;
  let stylePreviewAssetId = existingStyle?.previewImageAssetId;

  await client.createOrReplace({
    _id: styleDocId,
    _type: "floorPlanStyle",
    title: LIFESTYLE_RANCH_STYLE.title,
    slug: { _type: "slug", current: LIFESTYLE_RANCH_STYLE.slug },
    description: LIFESTYLE_RANCH_STYLE.description,
    ...(stylePreviewAssetId
      ? {
          previewImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: stylePreviewAssetId
            }
          }
        }
      : {}),
    sortOrder: existingStyle?.sortOrder ?? maxStyleSortOrder + 1
  });

  for (const [index, seed] of lifestyleRanchPlanSeeds.entries()) {
    const slug = getLifestyleRanchPlanSlug(seed);
    const assetSlug = getLifestyleRanchAssetSlug(seed);
    const existingPlan = existingPlanBySlug.get(slug);
    const docId = existingPlan?._id ?? `floorPlan.${slug}`;
    const mainImageAssetId =
      !forceImageUpload && existingPlan?.mainImageAssetId ? existingPlan.mainImageAssetId : await uploadImageAsset(assetSlug);
    const planPdfAssetId = existingPlan?.planPdfAssetId ?? (await uploadPdfAsset(assetSlug));

    if (!stylePreviewAssetId || forceImageUpload) {
      stylePreviewAssetId = mainImageAssetId;
    }

    await client.createOrReplace({
      _id: docId,
      _type: "floorPlan",
      name: seed.name,
      slug: { _type: "slug", current: slug },
      style: { _type: "reference", _ref: styleDocId },
      beds: seed.beds,
      baths: seed.baths,
      sqFt: 1500,
      description: buildLifestyleRanchPlanDescription(seed),
      mainImage: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: mainImageAssetId
        },
        alt: `${seed.name} floor plan preview`
      },
      planPdf: {
        _type: "file",
        asset: {
          _type: "reference",
          _ref: planPdfAssetId
        }
      },
      sortOrder: index + 1
    });

    console.log(`Upserted Lifestyle Ranch plan: ${seed.name}`);
  }

  await client.createOrReplace({
    _id: styleDocId,
    _type: "floorPlanStyle",
    title: LIFESTYLE_RANCH_STYLE.title,
    slug: { _type: "slug", current: LIFESTYLE_RANCH_STYLE.slug },
    description: LIFESTYLE_RANCH_STYLE.description,
    ...(stylePreviewAssetId
      ? {
          previewImage: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: stylePreviewAssetId
            }
          }
        }
      : {}),
    sortOrder: existingStyle?.sortOrder ?? maxStyleSortOrder + 1
  });

  console.log(`Upserted style: ${LIFESTYLE_RANCH_STYLE.title}`);
  console.log(`Done. Imported ${lifestyleRanchPlanSeeds.length} Lifestyle Ranch entries.`);
}

importLifestyleRanchFloorPlans().catch((error) => {
  console.error("Lifestyle Ranch import failed:", error);
  process.exit(1);
});
