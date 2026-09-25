import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/contact";
const TRAIL = [{ name: "Contact", path: "/contact" }];

export const metadata = pageMeta({
  title: "Contact Us | Book an Automation Consultation",
  description:
    "Tell us which workflow is slowing your business down. We reply within one business day with a clear next step — no generic pitch, no obligation.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Contact FlowFoundry",
            description: "Book an automation consultation with FlowFoundry AI Solutions.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL)
        )}
      />
      <View />
    </>
  );
}
