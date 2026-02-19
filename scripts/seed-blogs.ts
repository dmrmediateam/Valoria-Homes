/**
 * Seed script to create basic blog posts in Sanity.
 *
 * Prerequisites:
 * 1. Deploy the Sanity schema first: visit /studio and run `npx sanity deploy` from project root,
 *    or add content manually at https://www.sanity.io/manage
 * 2. Add SANITY_API_WRITE_TOKEN to .env (create a token in Sanity Manage > API > Tokens)
 *
 * Run: npx tsx scripts/seed-blogs.ts
 */

import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bfrgtwqi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!token) {
  console.error("Missing SANITY_API_WRITE_TOKEN. Add a write token to .env to run this script.");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2025-01-01",
  token,
  useCdn: false
});

const posts = [
  {
    _type: "post",
    title: "Why Modular Homes Are the Smart Choice for Midwest Families",
    slug: { _type: "slug", current: "why-modular-homes-midwest" },
    excerpt:
      "Discover why more Midwest families are choosing modular homes for their durability, efficiency, and custom design options.",
    body: [
      {
        _type: "block",
        _key: "intro",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "1", text: "The Benefits of Modular Construction", marks: [] }]
      },
      {
        _type: "block",
        _key: "p1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "Modular homes offer a unique combination of factory precision and custom design. Built in controlled environments, they withstand the rigors of transportation and deliver consistent quality that site-built homes struggle to match. For Midwest families, this means a home built to last through harsh winters and humid summers."
          }
        ]
      },
      {
        _type: "block",
        _key: "p2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "At Valoria Homes, we focus on three core values: quality craftsmanship, structural strength, and lasting value. Every modular home we build reflects these principles, ensuring your investment pays off for decades to come."
          }
        ]
      },
      {
        _type: "block",
        _key: "p3",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "Ready to explore floor plans? Browse our collection and find the perfect layout for your family."
          }
        ]
      }
    ],
    author: { name: "Valoria Homes" },
    publishedAt: new Date().toISOString(),
    tags: ["Modular Homes", "Midwest", "Building Tips"],
    seo: {
      _type: "seo",
      metaTitle: "Why Modular Homes Are the Smart Choice for Midwest Families | Valoria Homes",
      metaDescription:
        "Discover why more Midwest families are choosing modular homes for durability, efficiency, and custom design. Learn from Valoria Homes experts."
    }
  },
  {
    _type: "post",
    title: "Understanding the Modular Home Build Process",
    slug: { _type: "slug", current: "modular-build-process" },
    excerpt:
      "From design to move-in, here's what to expect when building your Valoria modular home.",
    body: [
      {
        _type: "block",
        _key: "h1",
        style: "h2",
        markDefs: [],
        children: [{ _type: "span", _key: "1", text: "Step-by-Step: How It Works", marks: [] }]
      },
      {
        _type: "block",
        _key: "p1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "Building a modular home doesn't have to be complicated. Valoria guides you through each phase: design and floor plan selection, customization, factory construction, delivery, and final site assembly. Our trusted builder network across the Midwest makes the process smooth from start to finish."
          }
        ]
      },
      {
        _type: "block",
        _key: "p2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "Because modules are built indoors, weather delays are minimized and quality control is maximized. You'll receive regular updates and have clear visibility into your project timeline."
          }
        ]
      }
    ],
    author: { name: "Valoria Homes" },
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    tags: ["Build Process", "Modular Homes", "Getting Started"],
    seo: {
      _type: "seo",
      metaTitle: "Understanding the Modular Home Build Process | Valoria Homes",
      metaDescription:
        "Learn what to expect when building a Valoria modular home. From design to move-in, we walk you through each step of the process."
    }
  },
  {
    _type: "post",
    title: "5 Questions to Ask Before Choosing a Floor Plan",
    slug: { _type: "slug", current: "questions-before-choosing-floor-plan" },
    excerpt:
      "Before you commit to a floor plan, consider these essential questions to ensure it fits your family's needs.",
    body: [
      {
        _type: "block",
        _key: "p1",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "Choosing a floor plan is one of the most exciting—and important—decisions you'll make. To help narrow down your options, consider: How many bedrooms and bathrooms do you need now and in 5–10 years? Do you prefer an open layout or defined rooms? How do you use outdoor space? What's your budget for square footage and finishes? And finally, how does the layout support your daily routines?"
          }
        ]
      },
      {
        _type: "block",
        _key: "p2",
        style: "normal",
        markDefs: [],
        children: [
          {
            _type: "span",
            _key: "1",
            text: "Valoria's floor plans are designed with flexibility in mind. Many of our models can be customized to better match your lifestyle. Connect with one of our builders to explore options and find the perfect fit."
          }
        ]
      }
    ],
    author: { name: "Valoria Homes" },
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    tags: ["Floor Plans", "Homebuying", "Tips"],
    seo: {
      _type: "seo",
      metaTitle: "5 Questions to Ask Before Choosing a Floor Plan | Valoria Homes",
      metaDescription:
        "Essential questions to consider before selecting a modular home floor plan. Get expert guidance from Valoria Homes."
    }
  }
];

async function seed() {
  console.log("Creating blog posts...");
  for (const post of posts) {
    const result = await client.create(post);
    console.log(`Created: ${post.title} (${result._id})`);
  }
  console.log("Done! Visit /blogs to see your posts.");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
