import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getContentEntry } from "@/lib/content-registry";
import { getFloorPlansSource, getFloorPlanStylesSource } from "@/lib/floor-plan-source";
import { buildOrganizationSchema, buildWebSiteSchema } from "@/lib/structured-data";

const homeEntry = getContentEntry("/");
const defaultTitle = homeEntry?.title ?? "Valoria Homes";
const defaultDescription =
  homeEntry?.description ??
  "Valoria Homes builds durable, high-quality modular homes designed for Midwestern families.";
const organizationSchema = buildOrganizationSchema();
const websiteSchema = buildWebSiteSchema();

export const metadata: Metadata = {
  metadataBase: new URL("https://www.valoriahomes.com"),
  title: {
    default: defaultTitle,
    template: "%s | Valoria Homes"
  },
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/favicon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon-512x512.png", sizes: "512x512", type: "image/png" }
    ],
    shortcut: ["/icon.png"],
    apple: [{ url: "/icon.png", type: "image/png" }]
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website"
  }
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const [floorPlanStyles, floorPlans] = await Promise.all([getFloorPlanStylesSource(), getFloorPlansSource()]);
  const navbarSubmenuImageOverrides: Record<string, string> = {};
  const allFloorPlansImage = floorPlans[1]?.image ?? floorPlans[0]?.image;
  const cornerstonePlan = floorPlans.find((plan) => plan.styleSlug.toLowerCase() === "cornerstone");

  if (allFloorPlansImage) {
    navbarSubmenuImageOverrides["/floor-plans"] = allFloorPlansImage;
  }

  if (cornerstonePlan?.image) {
    navbarSubmenuImageOverrides[`/floor-plans/${cornerstonePlan.styleSlug}`] = cornerstonePlan.image;
  }

  return (
    <html lang="en-US" suppressHydrationWarning>
      <body className="font-body antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <div className="flex min-h-screen flex-col">
          <Navbar floorPlanStyles={floorPlanStyles} submenuImageOverrides={navbarSubmenuImageOverrides} />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
