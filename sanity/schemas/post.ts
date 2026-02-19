import { defineField, defineType } from "sanity";

export const post = defineType({
  name: "post",
  title: "Blog Post",
  type: "document",
  groups: [
    { name: "content", title: "Content", default: true },
    { name: "seo", title: "SEO" },
    { name: "metadata", title: "Metadata" }
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "content",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "content",
      options: {
        source: "title",
        maxLength: 96
      },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      rows: 3,
      group: "content",
      description: "Short summary for listing pages and meta description"
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt Text", description: "Image description for accessibility" }
      ]
    }),
    defineField({
      name: "body",
      title: "Body",
      type: "array",
      group: "content",
      of: [
        { type: "block" },
        {
          type: "image",
          options: { hotspot: true },
          fields: [
            { name: "alt", type: "string", title: "Alt Text" },
            { name: "caption", type: "string", title: "Caption" }
          ]
        }
      ]
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "object",
      group: "metadata",
      fields: [
        { name: "name", type: "string", title: "Name" },
        { name: "image", type: "image", title: "Image", options: { hotspot: true } }
      ]
    }),
    defineField({
      name: "publishedAt",
      title: "Published At",
      type: "datetime",
      group: "metadata",
      initialValue: () => new Date().toISOString()
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      group: "metadata",
      of: [{ type: "reference", to: { type: "category" } }]
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "metadata",
      of: [{ type: "string" }],
      options: { layout: "tags" }
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seo",
      group: "seo"
    })
  ],
  preview: {
    select: { title: "title", media: "mainImage" },
    prepare({ title, media }) {
      return {
        title: title ?? "Untitled",
        media
      };
    }
  }
});
