import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { ARTICLES } from "@/lib/content/insights";
import View from "./view";

const PATH = "/insights";
const TRAIL = [{ name: "Insights", path: PATH }];

export const metadata = pageMeta({
  title: "Insights | AI Automation Write-Ups",
  description:
    "Long-form articles on AI voice agents, WhatsApp automation and CRM workflows — how they are built, where they break, and what not to automate.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            "@type": "Blog",
            "@id": "https://www.flowfoundryai.in/insights#blog",
            url: "https://www.flowfoundryai.in/insights",
            name: "FlowFoundry Insights",
            description:
              "Practical write-ups on AI automation, voice agents, WhatsApp workflows and CRM systems.",
            publisher: { "@id": "https://www.flowfoundryai.in/#organization" },
            inLanguage: "en-IN",
          },
          webPageSchema({
            path: PATH,
            name: "Insights",
            description:
              "Practical articles on automation workflows drawn from real engineering work.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          itemListSchema(
            PATH,
            ARTICLES.map((a) => ({
              name: a.title,
              path: `/insights/${a.slug}`,
            }))
          )
        )}
      />
      <View />
    </>
  );
}
