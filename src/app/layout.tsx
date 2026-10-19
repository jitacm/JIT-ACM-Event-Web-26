import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : undefined) ||
  "https://jit-acm.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "JIT ACM Student Chapter",
    template: "%s · JIT ACM Student Chapter",
  },
  description:
    "Official student chapter of the Association for Computing Machinery at JIT. Fostering technical excellence, open-source engineering, and collaborative computing.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "ACM",
    "JIT ACM",
    "JIT ACM Student Chapter",
    "Computing Community",
    "Computer Science",
    "Student Chapter",
    "Workshops",
    "Hackathons",
    "Open Source",
  ],
  authors: [{ name: "JIT ACM Student Chapter" }],
  openGraph: {
    title: "JIT ACM Student Chapter",
    description:
      "Official student chapter of the Association for Computing Machinery at JIT. Fostering technical excellence, open-source engineering, and collaborative computing.",
    siteName: "JIT ACM Student Chapter",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "JIT ACM Student Chapter",
    description:
      "Official student chapter of the Association for Computing Machinery at JIT. Fostering technical excellence, open-source engineering, and collaborative computing.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "JIT ACM Student Chapter",
    alternateName: "JIT ACM",
    url: siteUrl || "https://jit-acm.vercel.app",
    description:
      "Official student chapter of the Association for Computing Machinery at JIT. Fostering technical excellence, open-source engineering, and collaborative computing.",
  };

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} dark min-h-screen bg-black antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var m=localStorage.getItem("acm_motion_paused");if(m==="true"){document.documentElement.setAttribute("data-motion","paused");}var p=window.location.pathname;var h=window.location.hash;var s=window.location.search;var isHome=(p==="/"||p==="")&&(!h||h==="");var isReplay=s.indexOf("opening=1")!==-1;var v=localStorage.getItem("acm_visited_opening");if(isHome&&(!v||isReplay)){document.documentElement.setAttribute("data-opening","1");}}catch(e){}})();`,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `html, body { background-color: #000000 !important; background: #000000 !important; color: #ffffff !important; min-height: 100% !important; } #opening-shell{display:none;}html[data-opening="1"]:not([data-opening-painted="1"]) #opening-shell{display:block;position:fixed;inset:0;background-color:#000;z-index:90;animation:shellFailsafe 12s forwards;}@keyframes shellFailsafe{0%,99%{visibility:visible;pointer-events:auto;}100%{visibility:hidden;pointer-events:none;display:none;}}`,
          }}
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: `#opening-shell{display:none!important;}`,
            }}
          />
        </noscript>
      </head>
      <body className="min-h-screen flex flex-col bg-black text-white font-sans selection:bg-neutral-800 selection:text-white overflow-x-hidden">
        {/* Black failsafe shell for opening first-paint without hiding site markup */}
        <div id="opening-shell" aria-hidden="true" />

        {/* Accessible Skip Link for Keyboard Navigation */}
        <a
          href="#about"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:px-4 focus:py-2 focus:bg-neutral-800 focus:text-white focus:font-mono focus:text-xs focus:ring-2 focus:ring-white"
        >
          Skip to main content ↵
        </a>
        {children}
      </body>
    </html>
  );
}
