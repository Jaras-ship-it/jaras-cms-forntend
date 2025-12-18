import type { Metadata } from "next";
import { IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";
import PrelineScriptWrapper from "../components/PrelineScriptWrapper";
import { getGlobalData, getGlobalMetaData } from "@/data/loader";
import Navbar from "@/components/ui/Navbar";
import { GlobalData } from "@/types";
import Footer from "@/components/ui/Footer";
import { ToastProvider } from "@/components/ui/ToastProvider";
import Script from "next/script";

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

  return (
    <html lang="ar" dir="rtl" className={ibmPlexSansArabic.variable}>
      <head>
        {/* PostHog Analytics Script */}
        <Script
          id="posthog-init"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(t,e){var o,n,p,r;e.__SV||(window.posthog && window.posthog.__loaded)||(window.posthog=e,e._i=[],e.init=function(i,s,a){function g(t,e){var o=e.split(".");2==o.length&&(t=t[o[0]],e=o[1]),t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}}(p=t.createElement("script")).type="text/javascript",p.crossOrigin="anonymous",p.async=!0,p.src=s.api_host.replace(".i.posthog.com","-assets.i.posthog.com")+"/static/array.js",(r=t.getElementsByTagName("script")[0]).parentNode.insertBefore(p,r);var u=e;for(void 0!==a?u=e[a]=[]:a="posthog",u.people=u.people||[],u.toString=function(t){var e="posthog";return"posthog"!==a&&(e+="."+a),t||(e+=" (stub)"),e},u.people.toString=function(){return u.toString(1)+".people (stub)"},o="init Br Vr ci Wr Jr zr qr capture Ni calculateEventProperties Xr register register_once register_for_session unregister unregister_for_session es getFeatureFlag getFeatureFlagPayload isFeatureEnabled reloadFeatureFlags updateEarlyAccessFeatureEnrollment getEarlyAccessFeatures on onFeatureFlags onSurveysLoaded onSessionId getSurveys getActiveMatchingSurveys renderSurvey displaySurvey cancelPendingSurvey canRenderSurvey canRenderSurveyAsync identify setPersonProperties group resetGroups setPersonPropertiesForFlags resetPersonPropertiesForFlags setGroupPropertiesForFlags resetGroupPropertiesForFlags reset get_distinct_id getGroups get_session_id get_session_replay_url alias set_config startSessionRecording stopSessionRecording sessionRecordingStarted captureException loadToolbar get_property getSessionProperty Zr Yr createPersonProfile ts Nr rs opt_in_capturing opt_out_capturing has_opted_in_capturing has_opted_out_capturing get_explicit_consent_status is_capturing clear_opt_in_out_capturing Kr debug O Qr getPageViewId captureTraceFeedback captureTraceMetric Dr".split(" "),n=0;n<o.length;n++)g(u,o[n]);e._i.push([i,s,a])},e.__SV=1)}(document,window.posthog||[]);
              posthog.init('phc_x0vJlXEK7DdRYbtnORoTtTu2LoUNXcXgVES4gwedHXT', {
                  api_host: 'https://us.i.posthog.com',
                  person_profiles: 'identified_only'
              });
            `,
          }}
        />
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
