import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/terms";
const TRAIL = [{ name: "Terms of Service", path: "/terms" }];

export const metadata = pageMeta({
  title: "Terms of Service",
  description:
    "The terms that apply when you use the FlowFoundry AI Solutions website and engage us for AI, automation, software or integration work.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Terms of Service",
            description: "Terms that apply to the FlowFoundry website and our services.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL)
        )}
      />
      <View />
    </>
  );
}
