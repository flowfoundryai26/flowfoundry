import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/about";
const TRAIL = [{ name: "About", path: "/about" }];

export const metadata = pageMeta({
  title: "About FlowFoundry AI Solutions",
  description:
    "Who we are, why FlowFoundry exists and how we build systems. An AI automation and custom software company that works with the tools you already run.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "About FlowFoundry AI Solutions",
            description: "Who we are, why FlowFoundry exists, how we build systems, and the team behind it.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL)
        )}
      />
      <View />
    </>
  );
}
