import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  graph,
  serviceSchema,
  webPageSchema,
} from "@/lib/schema";
import { SOLUTIONS, solutionBySlug } from "@/lib/content/solutions";
import View from "./view";

/** Static params means these render at build time, not per request. */
export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

/** Anything not in SOLUTIONS must 404 rather than render an empty shell. */
export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) return {};

  return pageMeta({
    title: s.metaTitle,
    description: s.metaDescription,
    path: `/solutions/${s.slug}`,
    image: s.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const s = solutionBySlug(slug);
  if (!s) notFound();

  const path = `/solutions/${s.slug}`;
  const trail = [
    { name: "Solutions", path: "/solutions" },
    { name: s.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: s.metaTitle,
            description: s.metaDescription,
            breadcrumb: trail,
          }),
          breadcrumbSchema(path, trail),
          serviceSchema({
            path,
            name: s.name,
            description: s.metaDescription,
            serviceType: s.eyebrow,
          }),
          // Legitimate: every question and answer is rendered as visible text.
          faqSchema(path, s.faqs)
        )}
      />
      <View solution={s} />
    </>
  );
}
