import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, itemListSchema, webPageSchema } from "@/lib/schema";
import { SOLUTIONS } from "@/lib/content/solutions";
import View from "./view";

const PATH = "/solutions";
const TRAIL = [{ name: "Solutions", path: "/solutions" }];

export const metadata = pageMeta({
  title: "AI Automation Solutions",
  description:
    "Automation solutions mapped to the outcome you need: faster lead response, fewer manual tasks, connected tools and centralised operations.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Solutions",
            description: "AI and automation solutions organised by the business outcome they deliver.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          itemListSchema(
            PATH,
            SOLUTIONS.map((s) => ({ name: s.name, path: `/solutions/${s.slug}` }))
          )
        )}
      />
      <View />
    </>
  );
}
