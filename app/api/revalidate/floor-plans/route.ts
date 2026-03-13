import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { BLOG_REVALIDATE_TAGS } from "@/lib/blog-source";
import { FLOOR_PLAN_REVALIDATE_TAGS } from "@/lib/floor-plan-source";

const REVALIDATE_TAGS_BY_DOCUMENT_TYPE = {
  floorPlan: FLOOR_PLAN_REVALIDATE_TAGS,
  floorPlanStyle: FLOOR_PLAN_REVALIDATE_TAGS,
  post: BLOG_REVALIDATE_TAGS
} as const;

const REVALIDATABLE_DOCUMENT_TYPES = new Set(Object.keys(REVALIDATE_TAGS_BY_DOCUMENT_TYPE));

type FloorPlanWebhookPayload = {
  _type?: string;
  _id?: string;
  operation?: string;
  transition?: string;
};

export const runtime = "nodejs";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_WEBHOOK_SECRET;

  if (!secret) {
    return NextResponse.json({ error: "Missing SANITY_REVALIDATE_WEBHOOK_SECRET." }, { status: 500 });
  }

  const signature = request.headers.get(SIGNATURE_HEADER_NAME);
  const body = await request.text();

  if (!(await isValidSignature(body, signature ?? "", secret))) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 401 });
  }

  let payload: FloorPlanWebhookPayload | null = null;

  try {
    payload = body ? (JSON.parse(body) as FloorPlanWebhookPayload) : null;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (payload?._type && !REVALIDATABLE_DOCUMENT_TYPES.has(payload._type)) {
    return NextResponse.json({
      ok: true,
      revalidated: false,
      reason: `Ignored document type: ${payload._type}`
    });
  }

  const tags =
    payload?._type && payload._type in REVALIDATE_TAGS_BY_DOCUMENT_TYPE
      ? REVALIDATE_TAGS_BY_DOCUMENT_TYPE[payload._type as keyof typeof REVALIDATE_TAGS_BY_DOCUMENT_TYPE]
      : [...FLOOR_PLAN_REVALIDATE_TAGS, ...BLOG_REVALIDATE_TAGS];

  for (const tag of tags) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tags,
    type: payload?._type ?? null,
    id: payload?._id ?? null,
    operation: payload?.operation ?? payload?.transition ?? null
  });
}
