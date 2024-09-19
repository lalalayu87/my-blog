import { Metadata } from "next";
import { Header } from "@/layouts/Header";
import { Footer } from "@/layouts/Footer";
import "@/config/globals.css";
import {
  baseDomain,
  blogName,
  blogDesc,
  blogThumbnailURL,
} from "@/config/const";

export const metadata: Metadata = {
  metadataBase: new URL(baseDomain),
  title: blogName,
  description: blogDesc,
  openGraph: {
    title: blogName,
    description: blogDesc,
    siteName: blogName,
    images: [blogThumbnailURL],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: blogName,
    description: blogDesc,
    images: [blogThumbnailURL],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full scroll-my-20 scroll-smooth">
      <body className="font-pretendard flex min-h-screen flex-col">
        <Header />
        <main className="mt-[64px] flex flex-1 flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
