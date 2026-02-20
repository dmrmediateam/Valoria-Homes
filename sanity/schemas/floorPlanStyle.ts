import { defineField, defineType } from "sanity";

export const floorPlanStyle = defineType({
  name: "floorPlanStyle",
  title: "Floor Plan Style",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required()
    }),
    defineField({
      name: "previewImage",
      title: "Preview Image",
      type: "image",
      options: { hotspot: true }
    }),
    defineField({
      name: "sortOrder",
      title: "Sort Order",
      type: "number"
    })
  ],
  preview: {
    select: {
      title: "title",
      media: "previewImage"
    }
  }
});
