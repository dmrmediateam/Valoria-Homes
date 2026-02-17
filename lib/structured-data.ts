import { getContentEntry } from "@/lib/content-registry";
import type { FAQItem, FloorPlan } from "@/lib/data";

export type JsonLd = Record<string, unknown>;

const baseUrl = "https://www.valoriahomes.com";
const siteName = "Valoria Homes";
const contactPhone = "+1-262-204-5534";
const contactEmail = "Jade@valoriahomes.com";

function toAbsoluteUrl(slug: string): string {
  return slug === "/" ? baseUrl : `${baseUrl}${slug}`;
}

function humanizeSegment(segment: string): string {
  return segment
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function breadcrumbName(path: string): string {
  if (path === "/") {
    return "Home";
  }

  const entry = getContentEntry(path);
  if (entry) {
    return entry.title;
  }

  const lastSegment = path.split("/").filter(Boolean).at(-1) ?? "";
  return humanizeSegment(lastSegment);
}

export function buildWebPageSchema(slug: string): JsonLd | null {
  const entry = getContentEntry(slug);
  if (!entry) {
    return null;
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: entry.title,
    description: entry.description,
    url: toAbsoluteUrl(slug),
    datePublished: entry.publishDate,
    dateModified: entry.modifiedDate,
    inLanguage: "en-US",
    about: entry.tags,
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: baseUrl
    }
  };
}

export function buildBreadcrumbSchema(slug: string): JsonLd {
  const segments = slug.split("/").filter(Boolean);
  const paths = ["/"];

  for (let i = 0; i < segments.length; i += 1) {
    paths.push(`/${segments.slice(0, i + 1).join("/")}`);
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: paths.map((path, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: breadcrumbName(path),
      item: toAbsoluteUrl(path)
    }))
  };
}

export function buildOrganizationSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: baseUrl,
    email: contactEmail,
    telephone: contactPhone,
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: contactEmail,
        telephone: contactPhone,
        areaServed: "US",
        availableLanguage: ["en"]
      }
    ]
  };
}

export function buildWebSiteSchema(): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: baseUrl
  };
}

export function buildFaqPageSchema(slug: string, items: FAQItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: toAbsoluteUrl(slug),
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function buildContactPageSchema(slug: string): JsonLd {
  const entry = getContentEntry(slug);

  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: entry?.title ?? "Contact",
    description: entry?.description ?? "Contact Valoria Homes",
    url: toAbsoluteUrl(slug),
    mainEntity: {
      "@type": "Organization",
      name: siteName,
      email: contactEmail,
      telephone: contactPhone
    }
  };
}

export function buildFloorPlanProductSchema(plan: FloorPlan): JsonLd {
  const slug = `/floor-plans/${plan.id}`;

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${plan.name} Floor Plan`,
    description: plan.description,
    sku: plan.id,
    category: "Modular Home Floor Plan",
    brand: {
      "@type": "Brand",
      name: siteName
    },
    url: toAbsoluteUrl(slug),
    image: [plan.image],
    additionalProperty: [
      {
        "@type": "PropertyValue",
        name: "Bedrooms",
        value: String(plan.beds)
      },
      {
        "@type": "PropertyValue",
        name: "Bathrooms",
        value: String(plan.baths)
      },
      {
        "@type": "PropertyValue",
        name: "Square Footage",
        value: String(plan.sqFt),
        unitText: "SQFT"
      }
    ]
  };
}
