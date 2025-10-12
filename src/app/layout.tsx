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

type GlobalMeta = {
  siteName: string;
  siteDescription: string;
};

export async function generateMetadata(): Promise<Metadata> {
  const globalMeta = (await getGlobalMetaData()) as GlobalMeta;
  console.log("Global Meta: == ", globalMeta);
  return {
    title: globalMeta?.siteName,
    description: globalMeta?.siteDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const globalData = (await getGlobalData()) as GlobalData;
  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
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
