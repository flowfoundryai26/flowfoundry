import type { Metadata } from "next";
import { SITE } from "./site";

/**
 * Every indexable page builds its metadata through pageMeta().
 *
 * Why this exists: the root layout used to declare `alternates.canonical: "/"`,
 * and Next.js inherits that into any page which does not override it. Because
 * every page was a client component it could not export metadata at all, so the
 * whole site shipped one title, one description and a canonical pointing at the
 * homepage. pageMeta() makes the canonical a required argument so that failure
 * mode cannot come back.
 */
export const OG_IMAGE = "/og.png";

type PageMetaArgs = {
  /** Exact <title>. Keep under ~60 chars. Do not append the brand — the
   *  root layout template does that, except when `absoluteTitle` is set. */
  title: string;
  /** 140–160 chars: what the page is, the service, the benefit. */
  description: string;
  /** Root-relative path with a leading slash and no trailing slash, e.g. "/solutions". */
  path: string;
  /** Use when the title already contains the brand (homepage, campaign pages). */
  absoluteTitle?: boolean;
  /** Page-specific social image. Defaults to the site OG image. */
  image?: string;
  /** Set for utility pages that must stay out of the index. */
  noindex?: boolean;
  /** "article" for insights posts, otherwise "website". */
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
};

export function pageMeta({
  title,
  description,
  path,
  absoluteTitle = false,
  image = OG_IMAGE,
  noindex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
}: PageMetaArgs): Metadata {
  const url = `${SITE.url}${path === "/" ? "" : path}`;

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      siteName: SITE.name,
      title: absoluteTitle ? title : `${title} | ${SITE.name}`,
      description,
      url,
      locale: "en_IN",
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: absoluteTitle ? title : `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
    ...(noindex
      ? { robots: { index: false, follow: false } }
      : {}),
  };
}

/** Absolute URL for a root-relative path. Used by every schema builder. */
export const abs = (path: string) =>
  path.startsWith("http") ? path : `${SITE.url}${path === "/" ? "" : path}`;
