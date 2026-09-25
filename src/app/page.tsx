import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { graph, webPageSchema } from "@/lib/schema";
import View from "./view";

const PATH = "/";


export const metadata = pageMeta({
  title: "FlowFoundry | AI Agents, Automation & Custom Software",
  absoluteTitle: true,
  description:
    "FlowFoundry builds AI agents, automation, custom software and integrations around the way your business already works. Book an automation consultation.",
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
            description: "AI agents, automation, custom software and integrations built around your existing business workflow.",
          })
        )}
      />
      <View />
    </>
  );
}
