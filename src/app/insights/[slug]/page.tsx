import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  articleSchema,
  breadcrumbSchema,
  faqSchema,
  graph,
  webPageSchema,
} from "@/lib/schema";
import { ARTICLES, articleBySlug, wordCountOf } from "@/lib/content/insights";
import { FOUNDER } from "@/lib/site";
import View from "./view";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export const dynamicParams = false;

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) return {};

  return pageMeta({
    title: a.metaTitle,
    description: a.metaDescription,
    path: `/insights/${a.slug}`,
    image: a.image,
    type: "article",
    publishedTime: a.published,
    modifiedTime: a.updated,
    authors: [FOUNDER.name],
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const a = articleBySlug(slug);
  if (!a) notFound();

  const path = `/insights/${a.slug}`;
  const trail = [
    { name: "Insights", path: "/insights" },
    { name: a.title, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path,
            name: a.title,
            description: a.metaDescription,
            breadcrumb: trail,
          }),
          breadcrumbSchema(path, trail),
          articleSchema({
            path,
            headline: a.title,
            description: a.metaDescription,
            published: a.published,
            updated: a.updated,
            image: a.image,
            wordCount: wordCountOf(a),
          }),
          ...(a.faqs.length ? [faqSchema(path, a.faqs)] : [])
        )}
      />
      <View article={a} />
    </>
  );
}
