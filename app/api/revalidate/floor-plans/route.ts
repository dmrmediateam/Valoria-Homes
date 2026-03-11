import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";
import { isValidSignature, SIGNATURE_HEADER_NAME } from "@sanity/webhook";
import { FLOOR_PLAN_REVALIDATE_TAGS } from "@/lib/floor-plan-source";

const FLOOR_PLAN_DOCUMENT_TYPES = new Set(["floorPlan", "floorPlanStyle"]);

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

  if (payload?._type && !FLOOR_PLAN_DOCUMENT_TYPES.has(payload._type)) {
    return NextResponse.json({
      ok: true,
      revalidated: false,
      reason: `Ignored document type: ${payload._type}`
    });
  }

  for (const tag of FLOOR_PLAN_REVALIDATE_TAGS) {
    revalidateTag(tag, "max");
  }

  return NextResponse.json({
    ok: true,
    revalidated: true,
    tags: FLOOR_PLAN_REVALIDATE_TAGS,
    type: payload?._type ?? null,
    id: payload?._id ?? null,
    operation: payload?.operation ?? payload?.transition ?? null
  });
}
