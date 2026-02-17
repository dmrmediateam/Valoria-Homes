import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StructuredData from "@/components/StructuredData";
import { getContentEntry } from "@/lib/content-registry";
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
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <StructuredData data={organizationSchema} />
        <StructuredData data={websiteSchema} />
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
