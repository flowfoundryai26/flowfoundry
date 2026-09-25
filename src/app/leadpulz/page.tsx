import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/leadpulz";
const TRAIL = [{ name: "LeadPulz AI", path: "/leadpulz" }];

export const metadata = pageMeta({
  title: "LeadPulz | Our AI Voice Agent Platform",
  description:
    "LeadPulz is our AI voice platform for qualifying leads, handling calls, booking appointments and syncing every conversation to your CRM. In development.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "LeadPulz",
            description: "AI voice platform for lead qualification, calling, appointment booking and CRM synchronisation.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          serviceSchema({
            path: PATH,
            name: "LeadPulz AI Voice Agent Platform",
            description:
              "AI voice agents for inbound and outbound calls, lead qualification, appointment booking and follow-up automation.",
            serviceType: "AI voice agent platform",
          })
        )}
      />
      <View />
    </>
  );
}
