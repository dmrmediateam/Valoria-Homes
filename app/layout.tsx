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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
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
