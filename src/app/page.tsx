import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/";


export const metadata = pageMeta({
  title: "FlowFoundry | AI, Websites & Custom Software",
  absoluteTitle: true,
  description:
    "FlowFoundry builds AI agents, automation, custom software and responsive business websites. Explore website design concept demos and book a consultation.",
  path: PATH,
});

export default function Page() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "FlowFoundry AI Solutions",
            description: "AI agents, automation, custom software and responsive business websites built around your goals.",
          })
        )}
      />
      <View />
    </>
  );
}
