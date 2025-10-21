import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import PrelineScriptWrapper from "../components/PrelineScriptWrapper";
import { getGlobalData, getGlobalMetaData } from "@/data/loader";
import Navbar from "@/components/ui/Navbar";
import { GlobalData } from "@/types";
import Footer from "@/components/ui/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";

const ibmPlexSansArabic = IBM_Plex_Sans_Arabic({
  weight: ["400", "500", "600", "700"],
  subsets: ["arabic"],
  variable: "--font-ibm-plex-arabic",
  display: "swap",
});

import { StrapiImage } from "@/types/common";

type GlobalMeta = {
  siteName: string;
  siteDescription: string;
  favicon?: StrapiImage;
};

export async function generateMetadata(): Promise<Metadata> {
  const globalMeta = (await getGlobalMetaData()) as GlobalMeta;
  console.log("Global Meta: == ", globalMeta);
  console.log("Favicon URL: == ", globalMeta?.favicon?.url);

  const metadata: Metadata = {
    title: globalMeta?.siteName,
    description: globalMeta?.siteDescription,
  };

  // Add favicon if available
  if (globalMeta?.favicon?.url) {
    const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:1337";
    const faviconUrl = globalMeta.favicon.url.startsWith("http")
      ? globalMeta.favicon.url
      : `${baseUrl}${globalMeta.favicon.url}`;

    console.log("Full favicon URL: == ", faviconUrl);

    metadata.icons = {
      icon: faviconUrl,
      shortcut: faviconUrl,
      apple: faviconUrl,
    };
  }

  return metadata;
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = (await getGlobalData()) as GlobalData;

  // Construct full favicon URL
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? "http://localhost:1337";
  const faviconUrl = globalData?.favicon?.url
    ? globalData.favicon.url.startsWith("http")
      ? globalData.favicon.url
      : `${baseUrl}${globalData.favicon.url}`
    : null;

  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
      <head>
        {faviconUrl && (
          <>
            <link rel="icon" type="image/x-icon" href={faviconUrl} />
            <link rel="shortcut icon" href={faviconUrl} />
            <link rel="apple-touch-icon" href={faviconUrl} />
          </>
        )}
      </head>
      <body className="font-sans antialiased relative">
        <ToastProvider>
          <Navbar data={globalData.header} />
          <div className="min-h-[calc(100vh-64px)] max-w-[1200px] mx-auto">
            {children}
          </div>
          <Footer data={globalData.footer} />
          <PrelineScriptWrapper />
        </ToastProvider>
      </body>
    </html>
  );
}
