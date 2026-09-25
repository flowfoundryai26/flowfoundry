"use client";

import { motion } from "framer-motion";
import type { Industry } from "@/lib/content/industries";
import { INDUSTRIES } from "@/lib/content/industries";
import { SOLUTIONS } from "@/lib/content/solutions";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import { PROCESS_STEPS } from "@/lib/site";
import { Arrow, Button, Container, Eyebrow } from "@/components/ui";
import { Reveal, Words, fadeUp, scaleIn, stagger } from "@/components/motion";
import { CTA, Process } from "@/components/sections";
import {
  Breadcrumbs,
  Bullets,
  Callout,
  ContentHeading,
  Conversation,
  Faqs,
  Flow,
  IntegrationChips,
  Related,
  Section,
  StepList,
} from "@/components/content";

export default function IndustryView({ industry: ind }: { industry: Industry }) {
  const trail = [
    { name: "Industries", path: "/industries" },
    { name: ind.name, path: `/industries/${ind.slug}` },
  ];

  const related = [
    {
      title: "Solutions that apply",
      links: ind.relatedSolutions
        .map((slug) => SOLUTIONS.find((x) => x.slug === slug))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/solutions/${x!.slug}`,
          note: x!.eyebrow,
        })),
    },
    {
      title: "Seen in practice",
      links: ind.relatedCaseStudies
        .map((slug) => CASE_STUDIES.find((x) => x.slug === slug))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/case-studies/${x!.slug}`,
          note: x!.category,
        })),
    },
    {
      title: "Other industries",
      links: INDUSTRIES.filter((x) => x.slug !== ind.slug)
        .slice(0, 4)
        .map((x) => ({
          label: x.name,
          href: `/industries/${x.slug}`,
          note: x.eyebrow,
        })),
    },
  ];

  return (
    <div className="w-full overflow-x-clip">
      {/* ---------------- HERO ---------------- */}
      <section className="relative w-full overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "72px 72px",
              maskImage:
                "radial-gradient(ellipse 70% 90% at 22% 40%, #000 0%, transparent 100%)",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 90% at 22% 40%, #000 0%, transparent 100%)",
            }}
          />
        </div>

        <Container className="relative z-10">
          <div className="pt-8">
            <Breadcrumbs trail={trail} />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>{ind.eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="mt-6 max-w-[24ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words text={ind.h1} delay={0.15} />
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[58ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              {ind.lede}
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="mt-9 flex flex-col gap-3 sm:flex-row"
            >
              <Button href="/contact" variant="onDark" size="lg">
                Book an automation consultation
                <Arrow />
              </Button>
              <Button href="#workflow" variant="outlineOnDark" size="lg">
                See the workflow
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ---------------- PROBLEM ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ContentHeading eyebrow="The problem" title={ind.problem.title} />
          <Reveal amount={0.3} className="lg:pt-3">
            <motion.p
              variants={fadeUp}
              className="max-w-[60ch] text-[17px] leading-relaxed text-body"
            >
              {ind.problem.body}
            </motion.p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- MANUAL WORKFLOW ---------------- */}
      <Section surface="paper" id="workflow">
        <ContentHeading
          align="split"
          eyebrow="Today"
          title="How this runs manually right now."
          lede="Written out step by step, because naming the process is what makes it possible to see where it breaks."
        />
        <div className="mt-14 lg:mt-18">
          <Flow steps={ind.manualWorkflow} />
        </div>
      </Section>

      {/* ---------------- RECOMMENDATION ---------------- */}
      <Section surface="ink">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ContentHeading
            invert
            eyebrow="What we recommend"
            title={ind.recommendation.title}
          />
          <div className="lg:pt-3">
            <Reveal amount={0.3}>
              <motion.p
                variants={fadeUp}
                className="max-w-[60ch] text-[17px] leading-relaxed text-on-dark"
              >
                {ind.recommendation.body}
              </motion.p>
            </Reveal>
            <div className="mt-8">
              <Callout title="Start narrow" dark>
                One workflow, chosen because it has a cost you can already
                measure. A broad first phase takes longer to reach production
                and makes it harder to tell which part actually helped.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- EXAMPLE AUTOMATION ---------------- */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Example automation"
          title={ind.exampleAutomation.title}
          lede={
            <>
              <span className="font-mono text-2xs uppercase tracking-[0.14em] text-muted">
                Trigger
              </span>
              <br />
              {ind.exampleAutomation.trigger}
            </>
          }
        />
        <div className="mt-14 lg:mt-16">
          <StepList items={ind.exampleAutomation.steps} />
        </div>
      </Section>

      {/* ---------------- EXAMPLE AGENT FLOW ---------------- */}
      <Section surface="ink">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ContentHeading
              invert
              eyebrow="Example agent conversation"
              title="What the caller actually experiences."
              lede="An illustrative exchange, written to show scope and tone. Names and details are examples, not transcripts from a real customer."
            />
          </div>
          <Reveal amount={0.15}>
            <motion.div variants={scaleIn}>
              <Conversation
                title={ind.exampleAgentFlow.title}
                turns={ind.exampleAgentFlow.turns}
              />
            </motion.div>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- INTEGRATIONS + BENEFITS ---------------- */}
      <Section surface="white">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <ContentHeading
              eyebrow="Integrations"
              title="Connects to what you already run."
            />
            <div className="mt-8">
              <IntegrationChips items={ind.integrations} />
            </div>
          </div>
          <div>
            <ContentHeading eyebrow="Outcomes" title="What changes." />
            <div className="mt-8">
              <Bullets items={ind.benefits} tone="live" />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- CONSIDERATIONS ---------------- */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ContentHeading
            eyebrow="Constraints we design around"
            title="The limits, stated up front."
            lede="Every industry has lines automation should not cross. These are the ones we build in deliberately rather than discover later."
          />
          <div className="lg:pt-2">
            <Bullets items={ind.considerations} />
          </div>
        </div>
      </Section>

      {/* ---------------- IMPLEMENTATION ---------------- */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Implementation"
          title="How the build runs."
          lede="The same eight steps on every engagement. Scope is decided in discovery, not assumed beforehand."
        />
        <div className="mt-14 lg:mt-20">
          <Process steps={PROCESS_STEPS.slice(0, 4).map((s) => ({ ...s }))} />
        </div>
        <div className="mt-12">
          <Process steps={PROCESS_STEPS.slice(4).map((s) => ({ ...s }))} />
        </div>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ContentHeading eyebrow="Questions" title="Straight answers." />
          </div>
          <Faqs items={ind.faqs} />
        </div>
      </Section>

      {/* ---------------- RELATED ---------------- */}
      <Section surface="white">
        <ContentHeading eyebrow="Keep reading" title="Related to this." />
        <div className="mt-12">
          <Related groups={related} />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title={`Map the workflow in your ${ind.name.toLowerCase().replace(/s$/, "")}.`}
        lede="Describe how the process runs today. We will come back with what can be automated, what should stay with your team, and what it would take to build."
        primary={{ label: "Book an automation consultation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
        image={ind.image}
      />
    </div>
  );
}
