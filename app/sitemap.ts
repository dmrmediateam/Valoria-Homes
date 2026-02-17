import type { MetadataRoute } from "next";
import { contentRegistry } from "@/lib/content-registry";

const baseUrl = "https://www.valoriahomes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return contentRegistry.map((entry) => ({
    url: `${baseUrl}${entry.slug}`,
    lastModified: new Date(entry.modifiedDate),
    changeFrequency: entry.changeFrequency,
    priority: entry.priority
  }));
}
