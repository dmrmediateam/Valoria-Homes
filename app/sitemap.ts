import type { MetadataRoute } from "next";
import { getBlogSitemapEntriesSource } from "@/lib/blog-source";
import { contentRegistry } from "@/lib/content-registry";
import { getFloorPlanRouteEntriesSource } from "@/lib/floor-plan-source";

const baseUrl = "https://www.valoriahomes.com";

export const revalidate = 300;

const FLOOR_PLAN_DYNAMIC_PREFIX = "/floor-plans/";

function toAbsoluteUrl(slug: string) {
  return slug === "/" ? baseUrl : `${baseUrl}${slug}`;
}

function toValidDate(value?: string | null) {
  const date = value ? new Date(value) : new Date();
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function latestDate(values: Array<string | null | undefined>) {
  const timestamps = values
    .filter((value): value is string => Boolean(value))
    .map((value) => toValidDate(value).getTime())
    .filter((value) => Number.isFinite(value));

  return timestamps.length > 0 ? new Date(Math.max(...timestamps)) : undefined;
}

function dedupeEntries(entries: MetadataRoute.Sitemap): MetadataRoute.Sitemap {
  const seen = new Set<string>();

  return entries.filter((entry) => {
    if (seen.has(entry.url)) {
      return false;
    }

    seen.add(entry.url);
    return true;
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [floorPlanRoutes, blogPosts] = await Promise.all([
    getFloorPlanRouteEntriesSource(),
    getBlogSitemapEntriesSource()
  ]);

  const latestFloorPlanUpdate = latestDate(floorPlanRoutes.map((entry) => entry.updatedAt));
  const latestBlogUpdate = latestDate(blogPosts.map((post) => post.updatedAt ?? post.publishedAt));

  const staticEntries: MetadataRoute.Sitemap = contentRegistry
    .filter((entry) => !entry.slug.startsWith(FLOOR_PLAN_DYNAMIC_PREFIX))
    .map((entry) => {
      const lastModified =
        entry.slug === "/floor-plans" && latestFloorPlanUpdate
          ? latestDate([entry.modifiedDate, latestFloorPlanUpdate.toISOString()])
          : entry.slug === "/blogs" && latestBlogUpdate
            ? latestDate([entry.modifiedDate, latestBlogUpdate.toISOString()])
            : toValidDate(entry.modifiedDate);

      return {
        url: toAbsoluteUrl(entry.slug),
        lastModified,
        changeFrequency: entry.changeFrequency,
        priority: entry.priority
      };
    });

  const dynamicFloorPlanEntries: MetadataRoute.Sitemap = floorPlanRoutes.map((entry) => ({
    url: toAbsoluteUrl(entry.slug),
    lastModified: toValidDate(entry.updatedAt),
    changeFrequency: "weekly",
    priority: 0.7
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((post) => ({
    url: toAbsoluteUrl(`/blog/${post.slug}`),
    lastModified: latestDate([post.updatedAt, post.publishedAt]),
    changeFrequency: "weekly",
    priority: 0.6
  }));

  return dedupeEntries([...staticEntries, ...dynamicFloorPlanEntries, ...blogEntries]);
}
