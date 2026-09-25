import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/privacy";
const TRAIL = [{ name: "Privacy Policy", path: "/privacy" }];

export const metadata = pageMeta({
  title: "Privacy Policy",
  description:
    "How FlowFoundry AI Solutions collects, uses, stores and protects your information, and the choices you have over the data you share with us.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Privacy Policy",
            description: "How FlowFoundry collects, uses and protects your information.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL)
        )}
      />
      <View />
    </>
  );
}
