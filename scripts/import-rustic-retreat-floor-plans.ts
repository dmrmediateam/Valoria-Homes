import { readFile } from "node:fs/promises";
import path from "node:path";
import { createClient } from "@sanity/client";
import { getCliClient } from "sanity/cli";
import {
  buildRusticRetreatPlanDescription,
  getRusticRetreatPlanSlug,
  RUSTIC_RETREAT_STYLE,
  rusticRetreatPlanSeeds
} from "../lib/rustic-retreat-floor-plan-data";

type ExistingStyleDoc = {
  _id: string;
  slug: string;
};

type ExistingPlanDoc = {
  _id: string;
  slug: string;
  mainImageAssetId?: string;
  planPdfAssetId?: string;
  galleryImageAssetIds?: string[];
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

function getPreviewPath(slug: string, floor?: "first" | "second"): string {
  const filename = floor ? `${slug}-${floor}.png` : `${slug}.png`;
  return path.join(process.cwd(), "public", "floor-plans", "rustic-retreat", "previews", filename);
}

function getPdfPath(slug: string): string {
  return path.join(process.cwd(), "public", "floor-plans", "rustic-retreat", "pdfs", `${slug}.pdf`);
}

async function uploadImageAsset(slug: string, floor?: "first" | "second"): Promise<string> {
  const bytes = await readFile(getPreviewPath(slug, floor));
  const suffix = floor ? `-${floor}` : "";
  const asset = await client.assets.upload("image", bytes, {
    filename: `${slug}${suffix}.png`,
    contentType: "image/png"
  });

  return asset._id;
}

async function uploadPdfAsset(slug: string): Promise<string> {
  const bytes = await readFile(getPdfPath(slug));
  const asset = await client.assets.upload("file", bytes, {
    filename: `${slug}.pdf`,
    contentType: "application/pdf"
  });

  return asset._id;
}

async function importRusticRetreatFloorPlans() {
  console.log(`Importing Rustic Retreat floor plans into ${projectId}/${dataset}...`);

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
        "galleryImageAssetIds": galleryImages[].asset._ref,
        sortOrder
      }`
    )
  ]);

  const styleDoc = styles.find((style) => style.slug === RUSTIC_RETREAT_STYLE.slug);
  if (!styleDoc) {
    throw new Error(`Missing floorPlanStyle with slug ${RUSTIC_RETREAT_STYLE.slug}`);
  }

  const existingPlanBySlug = new Map(plans.map((plan) => [plan.slug, plan]));

  for (const [index, seed] of rusticRetreatPlanSeeds.entries()) {
    const slug = getRusticRetreatPlanSlug(seed);
    const existingPlan = existingPlanBySlug.get(slug);
    const docId = existingPlan?._id ?? `floorPlan.${slug}`;
    const planPdfAssetId = existingPlan?.planPdfAssetId ?? (await uploadPdfAsset(slug));

    if (seed.kind === "single") {
      const mainImageAssetId =
        !forceImageUpload && existingPlan?.mainImageAssetId ? existingPlan.mainImageAssetId : await uploadImageAsset(slug);

      await client.createOrReplace({
        _id: docId,
        _type: "floorPlan",
        name: seed.name,
        slug: { _type: "slug", current: slug },
        style: { _type: "reference", _ref: styleDoc._id },
        beds: seed.beds,
        baths: seed.baths,
        sqFt: 3000,
        description: buildRusticRetreatPlanDescription(seed),
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
    } else {
      const mainImageAssetId =
        !forceImageUpload && existingPlan?.mainImageAssetId ? existingPlan.mainImageAssetId : await uploadImageAsset(slug, "first");
      const secondFloorImageAssetId =
        !forceImageUpload && existingPlan?.galleryImageAssetIds?.[0]
          ? existingPlan.galleryImageAssetIds[0]
          : await uploadImageAsset(slug, "second");

      await client.createOrReplace({
        _id: docId,
        _type: "floorPlan",
        name: seed.name,
        slug: { _type: "slug", current: slug },
        style: { _type: "reference", _ref: styleDoc._id },
        beds: seed.beds,
        baths: seed.baths,
        sqFt: 3000,
        description: buildRusticRetreatPlanDescription(seed),
        mainImage: {
          _type: "image",
          asset: {
            _type: "reference",
            _ref: mainImageAssetId
          },
          alt: `${seed.name} first floor plan`
        },
        galleryImages: [
          {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: secondFloorImageAssetId
            },
            alt: `${seed.name} second floor plan`
          }
        ],
        planPdf: {
          _type: "file",
          asset: {
            _type: "reference",
            _ref: planPdfAssetId
          }
        },
        sortOrder: existingPlan?.sortOrder ?? index + 1
      });
    }

    console.log(`Upserted Rustic Retreat plan: ${seed.name}`);
  }

  console.log(`Done. Imported ${rusticRetreatPlanSeeds.length} Rustic Retreat entries.`);
}

importRusticRetreatFloorPlans().catch((error) => {
  console.error("Rustic Retreat import failed:", error);
  process.exit(1);
});
