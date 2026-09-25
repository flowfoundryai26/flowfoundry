import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";
import { PROJECTS } from "@/lib/site";
import View from "./view";

const PATH = "/portfolio";
const TRAIL = [{ name: "Portfolio", path: "/portfolio" }];

export const metadata = pageMeta({
  title: "Portfolio | What We Are Building",
  description:
    "The platforms FlowFoundry is building now: LeadPulz, iLoveSurprises, TalkBridge and FoundryPulse. AI voice, eCommerce, education and internal operations.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Portfolio",
            description: "Platforms currently in development at FlowFoundry AI Solutions.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          itemListSchema(
            PATH,
            PROJECTS.map((p) => ({
              name: p.name,
              path: p.href ?? `/case-studies/${p.slug}`,
            }))
          )
        )}
      />
      <View />
    </>
  );
}
