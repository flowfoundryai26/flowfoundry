"use client";

import { motion } from "framer-motion";
import { PROCESS_STEPS, TRUST_LINES } from "@/lib/site";
import { SOLUTIONS } from "@/lib/content/solutions";
import { Arrow, Button, Container, Eyebrow, Index } from "@/components/ui";
import { Reveal, Words, fadeUp, stagger } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  Bullets,
  Callout,
  Compare,
  ContentHeading,
  Related,
  Section,
} from "@/components/content";

/** What actually happens in a consultation. Answers the unspoken "is this a sales call?" */
const CONSULTATION = [
  "You describe the process that is causing the problem, in whatever detail you have.",
  "We ask about the tools already in use, the volume involved, and who touches the workflow.",
  "We say which parts we would automate, which we would leave alone, and why.",
  "We flag anything that looks like the wrong solution, including when you do not need us.",
  "You get a written summary of the workflow as we understood it, and the options.",
];

const STEP_DETAIL: Record<string, { produces: string; involves: string }> = {
  Discovery: {
    produces: "A written description of the current process and the specific bottleneck.",
    involves: "A conversation with whoever actually runs the process day to day.",
  },
  "Workflow mapping": {
    produces: "A step-by-step map of conversations, data, rules and actions as they exist today.",
    involves: "Reviewing the map with your team to catch the exceptions nobody documented.",
  },
  "Solution architecture": {
    produces: "A scoped plan naming what gets automated, integrated or custom-built — and what stays manual.",
    involves: "Confirming integration feasibility against your actual systems, not assumed ones.",
  },
  Build: {
    produces: "Working software or a configured agent, developed against the agreed scope.",
    involves: "Regular checkpoints so scope drift surfaces early rather than at handover.",
  },
  Integration: {
    produces: "Live connections to your CRM, calendars, databases and channels.",
    involves: "Credential setup with you, scoped to least privilege.",
  },
  Testing: {
    produces: "Verified behaviour on the happy path, the edge cases and the failure paths.",
    involves: "You testing it against real scenarios before anything goes live.",
  },
  Launch: {
    produces: "A deployed system with monitoring, a rollback path and handover documentation.",
    involves: "An agreed go-live window and a named point of contact.",
  },
  Optimisation: {
    produces: "Measurement against the baseline we captured in discovery.",
    involves: "Reviewing real usage and refining what the data shows is not working.",
  },
};

export default function HowWeWorkView() {
  return (
    <div className="w-full overflow-x-clip">
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
            <Breadcrumbs
              trail={[
                { name: "Company", path: "/about" },
                { name: "How We Work", path: "/how-we-work" },
              ]}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>How We Work</Eyebrow>
            </motion.div>
            <h1 className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words text="Eight steps, and what each one produces." delay={0.15} />
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[58ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              Most automation projects fail in the first two steps, by building
              before the process is understood. This is the sequence we follow,
              with the deliverable for each stage stated so you know what you are
              getting.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <Button href="/contact" variant="onDark" size="lg">
                Book an automation consultation
                <Arrow />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* THE EIGHT STEPS */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="The process"
          title="From process to production."
          lede="Discovery and mapping come before any technology decision. That ordering is the whole approach."
        />

        <Reveal
          as="ol"
          step={0.05}
          className="mt-14 divide-y divide-line border-y border-line lg:mt-20"
        >
          {PROCESS_STEPS.map((s) => {
            const extra = STEP_DETAIL[s.title];
            return (
              <motion.li key={s.number} variants={fadeUp} className="py-9">
                <div className="grid gap-5 lg:grid-cols-[56px_0.8fr_1.1fr_1.1fr] lg:gap-8">
                  <Index>{s.number}</Index>

                  <h2 className="text-xl font-medium tracking-[-0.02em] text-fg">
                    {s.title}
                  </h2>

                  <p className="max-w-[44ch] text-[15px] leading-relaxed text-body">
                    {s.body}
                  </p>

                  {extra ? (
                    <div className="space-y-4">
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-strong">
                          You receive
                        </p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-body">
                          {extra.produces}
                        </p>
                      </div>
                      <div>
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                          Your involvement
                        </p>
                        <p className="mt-1.5 text-[14px] leading-relaxed text-muted">
                          {extra.involves}
                        </p>
                      </div>
                    </div>
                  ) : null}
                </div>
              </motion.li>
            );
          })}
        </Reveal>
      </Section>

      {/* THE CONSULTATION */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <ContentHeading
              eyebrow="Step zero"
              title="What actually happens in a consultation."
              lede="It is a working conversation about your process, not a pitch deck."
            />
            <div className="mt-8">
              <Callout title="It is free, and there is no obligation">
                If the outcome is that you do not need us, or that an off-the-shelf
                product would serve you better and more cheaply, we will say so.
                That is a more useful result than a proposal you should not accept.
              </Callout>
            </div>
          </div>
          <div className="lg:pt-2">
            <Bullets items={CONSULTATION} tone="live" />
          </div>
        </div>
      </Section>

      {/* HOW WE DECIDE */}
      <Section surface="ink">
        <ContentHeading
          invert
          align="split"
          eyebrow="How we decide"
          title="Build, integrate, or leave it alone."
          lede="Not every process should be automated. These are the tests we apply before recommending anything."
        />
        <div className="mt-14 lg:mt-18">
          <Compare
            dark
            title="When automation is the right call"
            left={{
              title: "Worth automating",
              items: [
                "The process runs often enough that the cost is measurable",
                "The rules are stable enough to write down",
                "The bottleneck is coordination rather than judgement",
                "The systems involved have usable APIs",
                "A failure is recoverable, or can be gated behind a person",
                "There is a baseline number you can compare against later",
              ],
            }}
            right={{
              title: "Leave it manual for now",
              items: [
                "The process changes every time it runs",
                "The value is in the human relationship, not the throughput",
                "It happens rarely enough that the build cost will not repay",
                "The rules are genuinely undecided inside the business",
                "A mistake would be expensive and hard to detect",
                "An existing product already does it well enough",
              ],
            }}
          />
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ContentHeading
            eyebrow="How we build"
            title="Five commitments."
            lede="These shape every engagement and they are the reason we argue for narrower first phases than most."
          />
          <div className="lg:pt-2">
            <Bullets items={TRUST_LINES} />
          </div>
        </div>
      </Section>

      <Section surface="paper">
        <ContentHeading eyebrow="Explore" title="Where to go next." />
        <div className="mt-12">
          <Related
            groups={[
              {
                title: "Solutions",
                links: SOLUTIONS.slice(0, 3).map((s) => ({
                  label: s.name,
                  href: `/solutions/${s.slug}`,
                  note: s.eyebrow,
                })),
              },
              {
                title: "More solutions",
                links: SOLUTIONS.slice(3).map((s) => ({
                  label: s.name,
                  href: `/solutions/${s.slug}`,
                  note: s.eyebrow,
                })),
              },
              {
                title: "Company",
                links: [
                  { label: "About FlowFoundry", href: "/about", note: "Who we are and why" },
                  { label: "Responsible automation", href: "/responsible-automation", note: "Access, permissions, limits" },
                  { label: "Case studies", href: "/case-studies", note: "Architecture write-ups" },
                ],
              },
            ]}
          />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Start with discovery. It costs you a conversation."
        lede="Describe the process that is slowing you down. You will get a clear view of what is worth automating, and an honest answer if the answer is nothing."
        primary={{ label: "Book an automation consultation", href: "/contact" }}
        secondary={{ label: "View case studies", href: "/case-studies" }}
        image="/images/why/implementation.webp"
      />
    </div>
  );
}
