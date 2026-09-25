import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

/**
 * Deliberately permissive. The only disallowed paths are ones that must never
 * be indexed (the post-submission confirmation and API routes) — blocking CSS,
 * JS or images would stop Google rendering the pages at all.
 *
 * The sitemap URL uses SITE.url, which is now the www host the server actually
 * returns 200 for. It previously pointed at the apex, which 308-redirects.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/thank-you"],
      },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  };
}
