import { defineField, defineType } from "sanity";

export const seo = defineType({
  name: "seo",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Title for search engines (recommended 50-60 characters)"
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 2,
      description: "Description for search engines (recommended 150-160 characters)"
    }),
    defineField({
      name: "keywords",
      title: "Keywords",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags"
      }
    }),
    defineField({
      name: "ogTitle",
      title: "Open Graph Title",
      type: "string",
      description: "Title for social sharing (defaults to meta title)"
    }),
    defineField({
      name: "ogDescription",
      title: "Open Graph Description",
      type: "text",
      rows: 2,
      description: "Description for social sharing (defaults to meta description)"
    }),
    defineField({
      name: "ogImage",
      title: "Open Graph Image",
      type: "image",
      options: { hotspot: true },
      description: "Image for social sharing (recommended 1200x630px)"
    }),
    defineField({
      name: "canonicalUrl",
      title: "Canonical URL",
      type: "url",
      description: "Canonical URL for this page (e.g. https://www.valoriahomes.com/blog/my-post)"
    }),
    defineField({
      name: "noIndex",
      title: "No Index",
      type: "boolean",
      initialValue: false,
      description: "Prevent search engines from indexing this page"
    }),
    defineField({
      name: "noFollow",
      title: "No Follow",
      type: "boolean",
      initialValue: false,
      description: "Tell search engines not to follow links on this page"
    })
  ]
});
