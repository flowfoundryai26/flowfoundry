import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE, SOCIALS } from "@/lib/site";

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
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),

  title: {
    default:
      "FlowFoundry AI Solutions | AI Agents, Automation & Custom Software",
    template: `%s | ${SITE.name}`,
  },

  description: SITE.description,
  applicationName: SITE.name,

  keywords: [
    "AI agents",
    "workflow automation",
    "custom software",
    "business automation",
    "AI voice agents",
    "CRM integration",
    "LeadPulz",
    "FlowFoundry",
  ],

  authors: [{ name: SITE.name, url: SITE.url }],
  creator: SITE.name,
  publisher: SITE.name,

  alternates: { canonical: "/" },

  /* =========================================================
     FAVICON — uses app/icon.png (Next.js auto-detects)
     No explicit `icons` config needed. Just drop logo.png
     into app/ and rename it to icon.png.
  ========================================================= */

  openGraph: {
    type: "website",
    siteName: SITE.name,
    title:
      "FlowFoundry AI Solutions | AI Agents, Automation & Custom Software",
    description: SITE.description,
    url: SITE.url,
    locale: "en_US",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "FlowFoundry AI Solutions — intelligent business systems",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "FlowFoundry AI Solutions",
    description: SITE.description,
    images: ["/images/og-image.png"],
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
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0a0d14" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0d14" },
  ],
  colorScheme: "light",
};

/* =========================================================
   STRUCTURED DATA
========================================================= */

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.short,
  url: SITE.url,
  email: SITE.email,
  description: SITE.description,
  logo: {
    "@type": "ImageObject",
    url: `${SITE.url}/logo.png`,
    width: 512,
    height: 512,
  },
  image: `${SITE.url}/images/logo.png`,
  sameAs: SOCIALS.map((s) => s.href),
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "Sales",
      email: SITE.email,
      availableLanguage: ["English", "Hindi", "Telugu"],
      areaServed: "IN",
    },
  ],
  address: {
    "@type": "PostalAddress",
    streetAddress: "Currency Nagar",
    addressLocality: "Vijayawada",
    addressRegion: "Andhra Pradesh",
    addressCountry: "IN",
  },
};

const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE.url}/#website`,
  url: SITE.url,
  name: SITE.name,
  description: SITE.description,
  publisher: { "@id": `${SITE.url}/#organization` },
  inLanguage: "en-US",
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
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

        {/* Film grain — fixed, pointer-events none */}
        <div className="grain" aria-hidden="true" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ORG_SCHEMA) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(WEBSITE_SCHEMA) }}
        />
      </body>
    </html>
  );
}