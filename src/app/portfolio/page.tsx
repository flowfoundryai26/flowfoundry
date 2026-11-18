import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";
import { PROJECTS } from "@/lib/site";
import View from "./view";

const PATH = "/portfolio";
const TRAIL = [{ name: "Portfolio", path: "/portfolio" }];

export const metadata = pageMeta({
  title: "Portfolio | Platforms & Website Demos",
  description:
    "Explore FlowFoundry's AI and software platforms plus five working website design concept demos for dental, beauty, restaurant, real estate and education businesses.",
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
            description: "Platforms in development and website design concept demos from FlowFoundry AI Solutions.",
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
