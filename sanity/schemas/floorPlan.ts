import { defineField, defineType } from "sanity";

export const floorPlan = defineType({
  name: "floorPlan",
  title: "Floor Plan",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Plan Name",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Plan Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "style",
      title: "Style",
      type: "reference",
      to: [{ type: "floorPlanStyle" }],
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "beds",
      title: "Bedrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: "baths",
      title: "Bathrooms",
      type: "number",
      validation: (Rule) => Rule.required().min(0)
    }),
    defineField({
      name: "sqFt",
      title: "Square Footage",
      type: "number",
      validation: (Rule) => Rule.required().min(1)
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "mainImage",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [{ name: "alt", type: "string", title: "Alt Text" }]
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number"
    })
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "style.title",
      media: "mainImage"
    }
  }
});
