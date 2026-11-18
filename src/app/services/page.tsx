import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/services";
const TRAIL = [{ name: "Services", path: "/services" }];

export const metadata = pageMeta({
  title: "Services | AI, Websites & Software",
  description:
    "FlowFoundry offers AI agents, automation, custom software, website design and development, eCommerce and integrations for businesses in India.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Services",
            description: "AI agents, workflow automation, custom software, website design and development, eCommerce and integration services.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          serviceSchema({
            path: PATH,
            name: "AI, Automation and Custom Software Development",
            description:
              "Design and delivery of AI agents, workflow automation, custom business software and system integrations.",
            serviceType: "Business process automation and software development",
          })
        )}
      />
      <View />
    </>
  );
}
