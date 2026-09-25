import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";
import { SOLUTIONS } from "@/lib/content/solutions";
import { INDUSTRIES } from "@/lib/content/industries";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import { ARTICLES } from "@/lib/content/insights";
import { FOUNDER } from "@/lib/site";

/**
 * Only canonical, indexable, 200-returning URLs belong here.
 *
 * Two things this deliberately avoids:
 *  - /thank-you, which is noindex. Listing a noindex URL is a contradictory signal.
 *  - a `new Date()` lastModified on every entry, which told Google the whole site
 *    changed on every crawl and made lastmod worthless. Content now carries its
 *    own date, and static pages use a single release date bumped on deploy.
 */
const RELEASE_DATE = "2026-09-25";

type Entry = MetadataRoute.Sitemap[number];

const entry = (
  path: string,
  priority: number,
  changeFrequency: Entry["changeFrequency"],
  lastModified: string = RELEASE_DATE
): Entry => ({
  url: `${SITE.url}${path === "/" ? "" : path}`,
  lastModified,
  changeFrequency,
  priority,
});

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // Core
    entry("/", 1.0, "weekly"),
    entry("/contact", 0.9, "monthly"),
    entry("/solutions", 0.9, "monthly"),
    entry("/case-studies", 0.8, "monthly"),
    entry("/industries", 0.8, "monthly"),
    entry("/about", 0.8, "monthly"),
    entry("/services", 0.7, "monthly"),
    entry("/how-we-work", 0.7, "yearly"),
    entry("/leadpulz", 0.7, "monthly"),
    entry("/portfolio", 0.6, "monthly"),
    entry("/insights", 0.7, "weekly"),
    entry("/responsible-automation", 0.6, "yearly"),

    // Solution detail pages
    ...SOLUTIONS.map((s) => entry(`/solutions/${s.slug}`, 0.9, "monthly")),

    // Industry pages
    ...INDUSTRIES.map((i) => entry(`/industries/${i.slug}`, 0.8, "monthly")),

    // Case studies
    ...CASE_STUDIES.map((c) => entry(`/case-studies/${c.slug}`, 0.7, "monthly")),

    // Articles — real per-article dates
    ...ARTICLES.map((a) =>
      entry(`/insights/${a.slug}`, 0.6, "yearly", a.updated)
    ),

    // Author
    entry(`/authors/${FOUNDER.slug}`, 0.5, "monthly"),

    // Legal
    entry("/privacy", 0.3, "yearly"),
    entry("/terms", 0.3, "yearly"),
  ];
}
