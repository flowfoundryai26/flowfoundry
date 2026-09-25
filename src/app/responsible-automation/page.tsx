import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/responsible-automation";
const TRAIL = [
  { name: "Company", path: "/about" },
  { name: "Responsible Automation", path: PATH },
];

export const metadata = pageMeta({
  title: "Responsible Automation & AI Oversight",
  description:
    "How we control what AI agents are allowed to do: least-privilege access, capability whitelisting, human approval on irreversible actions and audit logging.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Responsible Automation",
            description:
              "The access controls, permission boundaries and oversight practices FlowFoundry applies to AI agents and automation.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL)
        )}
      />
      <View />
    </>
  );
}
