import JsonLd from "@/components/JsonLd";
import { pageMeta } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, graph, webPageSchema } from "@/lib/schema";
import { CAREERS_CONFIG } from "@/lib/careers-config";
import CareersView from "./view";

const PATH = "/careers";
const TRAIL = [{ name: "Careers & Internships", path: PATH }];

export const metadata = pageMeta({
  title: "Careers & Internships | FlowFoundry AI Solutions",
  description:
    "Explore the 3-month remote Software & AI Engineering Internship at FlowFoundry AI Solutions. Gain supervised practical experience, technical mentorship, and modern engineering workflows in an unpaid learning-focused program.",
  path: PATH,
  absoluteTitle: true,
});

export default function CareersPage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageSchema({
            path: PATH,
            name: "Careers & Internships | FlowFoundry AI Solutions",
            description:
              "Explore the 3-month remote Software & AI Engineering Internship at FlowFoundry AI Solutions.",
            breadcrumb: TRAIL,
          }),
          breadcrumbSchema(PATH, TRAIL),
          faqSchema(PATH, CAREERS_CONFIG.faqs)
        )}
      />
      <CareersView />
    </>
  );
}
