import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  caseStudySchema,
  faqSchema,
  graph,
  webPageSchema,
} from "@/lib/schema";
import { CASE_STUDIES, caseStudyBySlug } from "@/lib/content/case-studies";
import View from "./view";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const c = caseStudyBySlug(slug);
  if (!c) return {};

  return pageMeta({
    title: c.metaTitle,
    description: c.metaDescription,
    path: `/case-studies/${c.slug}`,
    image: c.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const c = caseStudyBySlug(slug);
  if (!c) notFound();

  const path = `/case-studies/${c.slug}`;
  const trail = [
    { name: "Case Studies", path: "/case-studies" },
    { name: c.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: c.metaTitle,
            description: c.metaDescription,
            breadcrumb: trail,
          }),
          breadcrumbSchema(path, trail),
          caseStudySchema({
            path,
            name: c.name,
            description: c.metaDescription,
            status: c.status,
          }),
          ...(c.faqs.length ? [faqSchema(path, c.faqs)] : [])
        )}
      />
      <View study={c} />
    </>
  );
}
