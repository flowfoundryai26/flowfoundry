import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema, graph, serviceSchema, webPageSchema } from "@/lib/schema";
import { pageMeta } from "@/lib/seo";
import View from "./view";

const PATH = "/services/web-design";
const DESCRIPTION =
  "Website design services for businesses in India. FlowFoundry builds responsive websites, landing pages and custom web experiences with clear enquiry paths.";
const TRAIL = [
  { name: "Services", path: "/services" },
  { name: "Website Design & Development", path: PATH },
];

export const metadata = pageMeta({
  title: "Website Design & Development Services",
  description: DESCRIPTION,
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Website Design & Development",
            description: DESCRIPTION,
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          serviceSchema({
            path: PATH,
            name: "Website Design & Development",
            description: DESCRIPTION,
            serviceType: "Business website design and responsive website development",
          })
        )}
      />
      <View />
    </>
  );
}
