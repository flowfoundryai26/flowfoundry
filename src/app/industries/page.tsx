import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import {
  breadcrumbSchema,
  graph,
  itemListSchema,
  webPageSchema,
} from "@/lib/schema";
import { INDUSTRIES } from "@/lib/content/industries";
import View from "./view";

const PATH = "/industries";
const TRAIL = [{ name: "Industries", path: PATH }];

export const metadata = pageMeta({
  title: "AI Automation by Industry",
  description:
    "AI and automation for dental clinics, healthcare, real estate, eCommerce and local service businesses — with the real workflow each industry runs explained.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Industries",
            description:
              "Industry-specific automation workflows for clinics, real estate, eCommerce and service businesses.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          itemListSchema(
            PATH,
            INDUSTRIES.map((i) => ({
              name: i.name,
              path: `/industries/${i.slug}`,
            }))
          )
        )}
      />
      <View />
    </>
  );
}
