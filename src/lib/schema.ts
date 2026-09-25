import { FOUNDER, PROFILES, SITE, SOCIALS } from "./site";
import { abs } from "./seo";

/**
 * JSON-LD builders.
 *
 * Two rules, enforced by the helpers below:
 *  1. Nothing unverifiable goes in. No aggregateRating, no review, no
 *     employeeCount, no address, no award, no foundingDate we cannot source.
 *  2. Every node has a stable @id so nodes reference each other instead of
 *     repeating themselves. Google reads the graph, not isolated blobs.
 */

const ORG_ID = `${SITE.url}/#organization`;
const WEBSITE_ID = `${SITE.url}/#website`;
export const FOUNDER_ID = `${SITE.url}/authors/${FOUNDER.slug}#person`;

/** Strip keys whose value is empty/undefined so we never emit `"sameAs": []`. */
function clean<T extends Record<string, unknown>>(obj: T): T {
  const out = {} as Record<string, unknown>;
  for (const [k, v] of Object.entries(obj)) {
    if (v === undefined || v === null || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    out[k] = v;
  }
  return out as T;
}

const founderSameAs = [PROFILES.founderLinkedIn, PROFILES.founderGitHub].filter(
  (u) => u.length > 0
);

export const organizationSchema = () =>
  clean({
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE.name,
    alternateName: SITE.short,
    url: SITE.url,
    email: SITE.email,
    telephone: SITE.whatsapp,
    description: SITE.description,
    slogan: "Systems built around the way your business works.",
    logo: {
      "@type": "ImageObject",
      url: abs("/logo.png"),
      width: 512,
      height: 512,
    },
    image: abs("/og.png"),
    // Verified profiles only. Empty until PROFILES is filled in.
    sameAs: SOCIALS.map((s) => s.href),
    founder: { "@id": FOUNDER_ID },
    knowsAbout: [
      "AI agents",
      "AI voice agents",
      "WhatsApp automation",
      "Workflow automation",
      "CRM automation",
      "Custom business software",
      "Shopify integration",
      "API integration",
    ],
    areaServed: { "@type": "Country", name: "India" },
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Sales",
        email: SITE.email,
        telephone: SITE.whatsapp,
        availableLanguage: ["English", "Hindi", "Telugu", "Tamil"],
        areaServed: "IN",
      },
    ],
  });

export const founderSchema = () =>
  clean({
    "@type": "Person",
    "@id": FOUNDER_ID,
    name: FOUNDER.name,
    givenName: "Sri Harsha",
    jobTitle: FOUNDER.shortRole,
    description: FOUNDER.bio,
    url: abs(`/authors/${FOUNDER.slug}`),
    image: abs(FOUNDER.avatar),
    worksFor: { "@id": ORG_ID },
    knowsAbout: [...FOUNDER.expertise],
    sameAs: founderSameAs,
  });

export const websiteSchema = () =>
  clean({
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE.url,
    name: SITE.name,
    description: SITE.description,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-IN",
  });

export const webPageSchema = ({
  path,
  name,
  description,
  breadcrumb,
}: {
  path: string;
  name: string;
  description: string;
  breadcrumb?: { name: string; path: string }[];
}) =>
  clean({
    "@type": "WebPage",
    "@id": `${abs(path)}#webpage`,
    url: abs(path),
    name,
    description,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
    ...(breadcrumb
      ? { breadcrumb: { "@id": `${abs(path)}#breadcrumb` } }
      : {}),
  });

export const breadcrumbSchema = (
  path: string,
  trail: { name: string; path: string }[]
) => ({
  "@type": "BreadcrumbList",
  "@id": `${abs(path)}#breadcrumb`,
  itemListElement: [{ name: "Home", path: "/" }, ...trail].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: abs(c.path),
  })),
});

export const serviceSchema = ({
  path,
  name,
  description,
  serviceType,
}: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
}) =>
  clean({
    "@type": "Service",
    "@id": `${abs(path)}#service`,
    name,
    description,
    serviceType,
    url: abs(path),
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "Country", name: "India" },
  });

/**
 * Only call this when the page genuinely renders every Q and A as visible text.
 * FAQPage markup on questions a user cannot read is a manual-action risk.
 */
export const faqSchema = (
  path: string,
  faqs: readonly { q: string; a: string }[]
) => ({
  "@type": "FAQPage",
  "@id": `${abs(path)}#faq`,
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const articleSchema = ({
  path,
  headline,
  description,
  published,
  updated,
  image,
  wordCount,
}: {
  path: string;
  headline: string;
  description: string;
  published: string;
  updated: string;
  image?: string;
  wordCount?: number;
}) =>
  clean({
    "@type": "BlogPosting",
    "@id": `${abs(path)}#article`,
    headline,
    description,
    url: abs(path),
    datePublished: published,
    dateModified: updated,
    author: { "@id": FOUNDER_ID },
    publisher: { "@id": ORG_ID },
    isPartOf: { "@id": WEBSITE_ID },
    mainEntityOfPage: { "@id": `${abs(path)}#webpage` },
    inLanguage: "en-IN",
    image: image ? abs(image) : abs("/og.png"),
    wordCount,
  });

export const caseStudySchema = ({
  path,
  name,
  description,
  status,
}: {
  path: string;
  name: string;
  description: string;
  status: string;
}) =>
  clean({
    "@type": "CreativeWork",
    "@id": `${abs(path)}#project`,
    name,
    description,
    url: abs(path),
    creator: { "@id": ORG_ID },
    creativeWorkStatus: status,
    inLanguage: "en-IN",
  });

export const itemListSchema = (
  path: string,
  items: { name: string; path: string }[]
) => ({
  "@type": "ItemList",
  "@id": `${abs(path)}#list`,
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    url: abs(it.path),
  })),
});

/**
 * Wraps nodes into a single @graph. One script tag per page beats many:
 * cross-references resolve and Google parses it as one connected entity set.
 */
export function graph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes,
  };
}
