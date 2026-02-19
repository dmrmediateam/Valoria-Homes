import { createClient } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";
const token = process.env.SANITY_API_READ_TOKEN;

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  token: token || undefined,
  perspective: "published"
});

const builder = imageUrlBuilder(client);

export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
