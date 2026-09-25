import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import View from "./view";

const PATH = "/case-studies";
const TRAIL = [{ name: "Case Studies", path: PATH }];

export const metadata = pageMeta({
  title: "Case Studies | AI Automation & Software",
  description:
    "Four platforms written up in full: the business problem, solution architecture, technologies, challenges and lessons. Every project labelled with its real status.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Case Studies",
            description:
              "Detailed engineering write-ups of the platforms FlowFoundry is building.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          itemListSchema(
            PATH,
            CASE_STUDIES.map((c) => ({
              name: c.name,
              path: `/case-studies/${c.slug}`,
            }))
          )
        )}
      />
      <View />
    </>
  );
}
