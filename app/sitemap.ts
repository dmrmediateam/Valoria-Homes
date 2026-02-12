import type { MetadataRoute } from "next";

const baseUrl = "https://www.valoriahomes.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/floor-plans", "/build-process", "/get-started", "/about", "/contact"];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8
  }));
}
