import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, graph, webPageSchema } from "@/lib/schema";
import { PROCESS_STEPS } from "@/lib/site";
import View from "./view";

const PATH = "/how-we-work";
const TRAIL = [
  { name: "Company", path: "/about" },
  { name: "How We Work", path: PATH },
];

export const metadata = pageMeta({
  title: "How We Work | Our Delivery Process",
  description:
    "The eight steps we follow on every project — discovery, workflow mapping, architecture, build, integration, testing, launch and optimisation.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "How We Work",
            description:
              "FlowFoundry's eight-step process for delivering automation and custom software.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          // HowTo is appropriate here: the page describes an ordered process
          // and every step is rendered as visible text.
          {
            "@type": "HowTo",
            "@id": "https://www.flowfoundryai.in/how-we-work#howto",
            name: "How FlowFoundry delivers an automation project",
            description:
              "The eight-step process from discovery through to optimisation.",
            step: PROCESS_STEPS.map((s, i) => ({
              "@type": "HowToStep",
              position: i + 1,
              name: s.title,
              text: s.body,
            })),
          }
        )}
      />
      <View />
    </>
  );
}
