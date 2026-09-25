import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE } from "@/lib/site";
import { OG_IMAGE } from "@/lib/seo";
import {
  founderSchema,
  graph,
  organizationSchema,
  websiteSchema,
} from "@/lib/schema";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
  preload: false, // mono is used for small labels only — not needed for first paint
});

/**
 * Site-wide defaults ONLY.
 *
 * Deliberately no `alternates.canonical` here: Next.js inherits it into every
 * page that does not override it, which previously made all seven pages
 * canonicalise to the homepage. Each page now sets its own via pageMeta().
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default:
      "FlowFoundry AI Solutions | AI Agents, Automation & Custom Software",
    // Short brand suffix. The full legal name stays on the homepage (absolute
    // title) and in Organization schema; 27 chars of suffix on every page
    // pushed most titles past where Google truncates.
    template: `%s | ${SITE.short}`,
  },

  description: SITE.description,
  applicationName: SITE.name,

  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,

  /* Favicons are file-based: app/favicon.ico, app/icon.png, app/apple-icon.png */

  openGraph: {
    type: "website",
    siteName: SITE.name,
    locale: "en_IN",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 630,
        alt: "FlowFoundry AI Solutions — AI agents, automation and custom software",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: [OG_IMAGE],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximumScale cap below 5 and no user-scalable=no — pinch zoom must work.
  maximumScale: 5,
  themeColor: "#0a0d14",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
      style={{ backgroundColor: "#0a0d14" }}
    >
      <body
        suppressHydrationWarning
        className="min-h-dvh bg-ink font-sans text-body antialiased"
      >
        <a
          href="#main"
          className="
            sr-only
            focus:not-sr-only
            focus:absolute focus:left-4 focus:top-4 focus:z-[100]
            focus:inline-flex focus:items-center focus:gap-2
            focus:rounded-md focus:border focus:border-white/10
            focus:bg-ink focus:px-4 focus:py-2.5
            focus:text-xs focus:font-medium focus:text-white
            focus:shadow-[0_20px_50px_-16px_rgba(0,0,0,0.6)]
            focus:outline-none focus:ring-2 focus:ring-accent/40
          "
        >
          Skip to content
        </a>

        <Header />

        <main id="main" className="relative bg-white">
          {children}
        </main>

        <Footer />

        {/* Film grain — fixed, pointer-events none, never on a scroller */}
        <div className="grain" aria-hidden="true" />

        {/*
          One graph for the whole site: Organization, the founder Person it
          references, and WebSite. Page-level nodes (WebPage, BreadcrumbList,
          Service, FAQPage, BlogPosting) are emitted per page and point back
          at these @ids.
        */}
        <JsonLd
          data={graph(organizationSchema(), founderSchema(), websiteSchema())}
        />
      </body>
    </html>
  );
}
