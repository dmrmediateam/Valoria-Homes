import { defineCliConfig } from "sanity/cli";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "bfrgtwqi";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

export default defineCliConfig({
  api: {
    projectId,
    dataset
  },
  studioHost: "valoria-homes",
  deployment: {
    appId: "dwmli0vijojanm83fm51nvsz"
  }
});
