import type { Metadata } from "next";
import { getContentEntry } from "@/lib/content-registry";

export function metadataFor(slug: string): Metadata {
  const entry = getContentEntry(slug);

  if (!entry) {
    return {};
  }

  return {
    title: entry.title,
    description: entry.description,
    authors: [{ name: entry.author }],
    keywords: entry.tags,
    alternates: {
      canonical: entry.slug
    },
    openGraph: {
      title: entry.title,
      description: entry.description,
      url: entry.slug,
      type: "website"
    }
  };
}
