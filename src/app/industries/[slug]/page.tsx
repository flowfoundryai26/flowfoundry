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
import { INDUSTRIES, industryBySlug } from "@/lib/content/industries";
import View from "./view";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) return {};

  return pageMeta({
    title: ind.metaTitle,
    description: ind.metaDescription,
    path: `/industries/${ind.slug}`,
    image: ind.image,
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const ind = industryBySlug(slug);
  if (!ind) notFound();

  const path = `/industries/${ind.slug}`;
  const trail = [
    { name: "Industries", path: "/industries" },
    { name: ind.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: ind.metaTitle,
            description: ind.metaDescription,
            breadcrumb: trail,
          }),
          breadcrumbSchema(path, trail),
          serviceSchema({
            path,
            name: `${ind.name} automation`,
            description: ind.metaDescription,
            serviceType: `Business automation for ${ind.name.toLowerCase()}`,
          }),
          faqSchema(path, ind.faqs)
        )}
      />
      <View industry={ind} />
    </>
  );
}
