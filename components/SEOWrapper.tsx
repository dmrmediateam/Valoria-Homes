import type { ReactNode } from "react";
import StructuredData from "@/components/StructuredData";
import { buildBreadcrumbSchema, buildWebPageSchema, type JsonLd } from "@/lib/structured-data";

type SEOWrapperProps = {
  slug: string;
  children: ReactNode;
  extraSchemas?: JsonLd[];
};

export default function SEOWrapper({ slug, children, extraSchemas = [] }: SEOWrapperProps) {
  const webPageSchema = buildWebPageSchema(slug);
  const breadcrumbSchema = buildBreadcrumbSchema(slug);

  return (
    <>
      {webPageSchema ? <StructuredData data={webPageSchema} /> : null}
      <StructuredData data={breadcrumbSchema} />
      {extraSchemas.map((schema, index) => (
        <StructuredData key={`${slug}-extra-schema-${index}`} data={schema} />
      ))}
      {children}
    </>
  );
}
