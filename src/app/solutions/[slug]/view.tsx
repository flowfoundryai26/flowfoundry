"use client";

import { motion } from "framer-motion";
import type { Solution } from "@/lib/content/solutions";
import { SOLUTIONS } from "@/lib/content/solutions";
import { INDUSTRIES } from "@/lib/content/industries";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import { Button, Arrow, Container, Eyebrow } from "@/components/ui";
import { Reveal, Words, fadeUp, stagger, scaleIn } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  Bullets,
  Callout,
  ContentHeading,
  DefRows,
  Faqs,
  Flow,
  IntegrationChips,
  Related,
  Section,
  StepList,
} from "@/components/content";

export default function SolutionView({ solution: s }: { solution: Solution }) {
  const trail = [
    { name: "Solutions", path: "/solutions" },
    { name: s.name, path: `/solutions/${s.slug}` },
  ];

  const related = [
    {
      title: "Related solutions",
      links: s.relatedSolutions
        .map((slug) => SOLUTIONS.find((x) => x.slug === slug))
        .filter((x): x is Solution => Boolean(x))
        .map((x) => ({
          label: x.name,
          href: `/solutions/${x.slug}`,
          note: x.metaTitle,
        })),
    },
    {
      title: "For your industry",
      links: s.relatedIndustries
        .map((slug) => INDUSTRIES.find((x) => x.slug === slug))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/industries/${x!.slug}`,
          note: x!.eyebrow,
        })),
    },
    {
      title: "Seen in practice",
      links: s.relatedCaseStudies
        .map((slug) => CASE_STUDIES.find((x) => x.slug === slug))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/case-studies/${x!.slug}`,
          note: x!.category,
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
            className="grid items-end gap-12 py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-20"
          >
            <div className="min-w-0">
              <motion.div variants={fadeUp}>
                <Eyebrow dark>{s.eyebrow}</Eyebrow>
              </motion.div>

              <h1 className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
                <Words text={s.h1} delay={0.15} />
              </h1>

              <motion.p
                variants={fadeUp}
                className="mt-7 max-w-[56ch] text-base leading-relaxed text-on-dark sm:text-lg"
              >
                {s.lede}
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="/contact" variant="onDark" size="lg">
                  Book an automation consultation
                  <Arrow />
                </Button>
                <Button href="#how-it-works" variant="outlineOnDark" size="lg">
                  See how it works
                </Button>
              </motion.div>
            </div>

            {/* Capability rail instead of a decorative photo */}
            <motion.div variants={scaleIn} className="min-w-0 lg:justify-self-end">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7">
                <p className="font-mono text-2xs uppercase tracking-[0.16em] text-on-dark-muted">
                  Connects with
                </p>
                <div className="mt-5">
                  <IntegrationChips items={s.integrations.slice(0, 8)} dark />
                </div>
                <p className="mt-6 border-t border-white/[0.07] pt-5 text-[13.5px] leading-relaxed text-on-dark-muted">
                  Built around the tools you already run. Nothing here requires
                  replacing your existing stack.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ---------------- PROBLEM ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <ContentHeading eyebrow="The problem" title={s.problem.title} />
            <Reveal amount={0.3} className="mt-7">
              <motion.p
                variants={fadeUp}
                className="max-w-[58ch] text-[17px] leading-relaxed text-body"
              >
                {s.problem.body}
              </motion.p>
            </Reveal>
          </div>
          <div className="lg:pt-4">
            <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
              What it looks like
            </p>
            <div className="mt-6">
              <Bullets items={s.problem.symptoms} />
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- MANUAL vs AUTOMATED ---------------- */}
      <Section surface="paper" id="how-it-works">
        <ContentHeading
          align="split"
          eyebrow="How it works"
          title="The same process, before and after."
          lede="Left is the workflow most teams run today. Right is the route the system takes instead."
        />

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
              Manual today
            </p>
            <div className="mt-6">
              <StepList items={s.manualToday} />
            </div>
          </div>

          <div>
            <Flow title="Automated route" steps={s.automatedFlow} />
          </div>
        </div>
      </Section>

      {/* ---------------- CAPABILITIES ---------------- */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="What we build"
          title="The pieces this is assembled from."
          lede="Scope is chosen in discovery. Most engagements start with one or two of these rather than all of them."
        />
        <div className="mt-14 lg:mt-16">
          <DefRows items={s.capabilities} />
        </div>
      </Section>

      {/* ---------------- INTEGRATIONS + OVERSIGHT ---------------- */}
      <Section surface="ink">
        <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <div>
            <ContentHeading
              invert
              eyebrow="Integrations"
              title="Works with your existing stack."
              lede="We connect what you already run rather than asking you to migrate."
            />
            <div className="mt-8">
              <IntegrationChips items={s.integrations} dark />
            </div>
          </div>

          <div>
            <ContentHeading
              invert
              eyebrow="Human oversight"
              title="Where a person stays in the loop."
            />
            <Reveal amount={0.3} className="mt-7">
              <motion.p
                variants={fadeUp}
                className="max-w-[58ch] text-[16px] leading-relaxed text-on-dark"
              >
                {s.humanOversight}
              </motion.p>
            </Reveal>
            <div className="mt-8">
              <Callout title="Our position" dark>
                We do not claim AI should run unattended. Automation removes the
                repetitive work; the decisions that carry risk stay with your
                team by design.{" "}
                <a
                  href="/responsible-automation"
                  className="font-medium text-white underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
                >
                  How we handle access and permissions
                </a>
                .
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      {/* ---------------- BENEFITS ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ContentHeading
            eyebrow="Outcomes"
            title="What changes operationally."
            lede="Stated as operational changes rather than percentages. We measure against your own baseline after launch."
          />
          <div className="lg:pt-2">
            <Bullets items={s.benefits} tone="live" />
          </div>
        </div>
      </Section>

      {/* ---------------- PROCESS ---------------- */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <ContentHeading
            eyebrow="Implementation"
            title="How an engagement runs."
            lede="Eight steps, start to finish. Discovery is where scope gets decided — not before."
          />
          <div>
            <Reveal amount={0.2}>
              <motion.div variants={fadeUp}>
                <Button href="/how-we-work" variant="secondary">
                  See the full process
                  <Arrow />
                </Button>
              </motion.div>
            </Reveal>
          </div>
        </div>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <ContentHeading eyebrow="Questions" title="Straight answers." />
          </div>
          <Faqs items={s.faqs} />
        </div>
      </Section>

      {/* ---------------- RELATED ---------------- */}
      <Section surface="paper">
        <ContentHeading eyebrow="Keep reading" title="Related to this." />
        <div className="mt-12">
          <Related groups={related} />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title={`Talk through your ${s.name.toLowerCase()} workflow.`}
        lede="Tell us how the process runs today. We will map what can be automated, what should stay manual, and what it would take to build."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "View case studies", href: "/case-studies" }}
        image={s.image}
      />
    </div>
  );
}
