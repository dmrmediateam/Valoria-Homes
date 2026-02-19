import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bfrgtwqi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineConfig({
  name: "valoria-homes",
  title: "Valoria Homes",
  projectId,
  dataset,
  plugins: [structureTool()],
  schema: {
    types: schemaTypes
  }
});
