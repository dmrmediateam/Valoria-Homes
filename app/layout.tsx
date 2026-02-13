import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.valoriahomes.com"),
  title: {
    default: "Valoria Homes | Quality Modular Homes Built to Last",
    template: "%s | Valoria Homes"
  },
  description:
    "Valoria Homes builds durable, high-quality modular homes designed for Midwestern families. View floor plans and start building today.",
  openGraph: {
    title: "Valoria Homes | Quality Modular Homes Built to Last",
    description:
      "Valoria Homes builds durable, high-quality modular homes designed for Midwestern families.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-body antialiased">
        <div className="flex min-h-screen flex-col">
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
