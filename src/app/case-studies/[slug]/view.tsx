"use client";

import { motion } from "framer-motion";
import type { CaseStudy } from "@/lib/content/case-studies";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import { SOLUTIONS } from "@/lib/content/solutions";
import { INDUSTRIES } from "@/lib/content/industries";
import { Arrow, Button, Container, Eyebrow, Status } from "@/components/ui";
import { Reveal, Words, fadeUp, stagger } from "@/components/motion";
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
  MetricSlots,
  Related,
  Section,
  StepList,
} from "@/components/content";

export default function CaseStudyView({ study: c }: { study: CaseStudy }) {
  const trail = [
    { name: "Case Studies", path: "/case-studies" },
    { name: c.name, path: `/case-studies/${c.slug}` },
  ];

  const related = [
    {
      title: "Solutions involved",
      links: c.relatedSolutions
        .map((slug) => SOLUTIONS.find((x) => x.slug === slug))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/solutions/${x!.slug}`,
          note: x!.eyebrow,
        })),
    },
    {
      title: "Relevant industries",
      links: c.relatedIndustries
        .map((slug) => INDUSTRIES.find((x) => x.slug === slug))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/industries/${x!.slug}`,
          note: x!.eyebrow,
        })),
    },
    {
      title: "Other case studies",
      links: CASE_STUDIES.filter((x) => x.slug !== c.slug).map((x) => ({
        label: x.name,
        href: `/case-studies/${x.slug}`,
        note: x.category,
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
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Eyebrow dark>{c.category}</Eyebrow>
              <Status dark>{c.status}</Status>
            </motion.div>

            <h1 className="mt-6 max-w-[24ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words text={c.h1} delay={0.15} />
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[62ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              {c.overview}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/contact" variant="onDark" size="lg">
                Discuss a similar system
                <Arrow />
              </Button>
              <Button href="#architecture" variant="outlineOnDark" size="lg">
                See the architecture
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ---------------- PROBLEM ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ContentHeading
            eyebrow="Business problem"
            title={c.businessProblem.title}
          />
          <Reveal amount={0.3} className="lg:pt-3">
            <motion.p
              variants={fadeUp}
              className="max-w-[60ch] text-[17px] leading-relaxed text-body"
            >
              {c.businessProblem.body}
            </motion.p>
          </Reveal>
        </div>
      </Section>

      {/* ---------------- REQUIREMENTS ---------------- */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContentHeading
            eyebrow="Requirements"
            title="What it had to do."
            lede="The brief, before any technology was chosen."
          />
          <div className="lg:pt-2">
            <Bullets items={c.requirements} />
          </div>
        </div>
      </Section>

      {/* ---------------- ARCHITECTURE ---------------- */}
      <Section surface="ink" id="architecture">
        <ContentHeading
          invert
          align="split"
          eyebrow="Solution architecture"
          title="How the system is put together."
          lede="Described in layers, because that is how the design decisions actually separate."
        />
        <div className="mt-14 lg:mt-20">
          <Flow
            dark
            steps={c.architecture.map((a) => ({
              step: a.layer,
              detail: a.detail,
            }))}
          />
        </div>
      </Section>

      {/* ---------------- TECHNOLOGIES ---------------- */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Technologies"
          title="What it is built with."
        />
        <Reveal
          step={0.06}
          className="mt-14 grid gap-x-10 gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3"
        >
          {c.technologies.map((g) => (
            <motion.div key={g.group} variants={fadeUp}>
              <h3 className="font-mono text-2xs uppercase tracking-[0.18em] text-muted">
                {g.group}
              </h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px] text-body">
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </Reveal>
      </Section>

      {/* ---------------- FEATURES ---------------- */}
      <Section surface="paper">
        <ContentHeading
          align="split"
          eyebrow="Core features"
          title="What it does."
        />
        <div className="mt-14 lg:mt-16">
          <DefRows items={c.coreFeatures} />
        </div>
      </Section>

      {/* ---------------- CHALLENGES ---------------- */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Challenges"
          title="What was actually hard."
          lede="The problems worth writing down, and how each one was handled."
        />
        <Reveal
          as="ul"
          step={0.06}
          className="mt-14 divide-y divide-line border-y border-line"
        >
          {c.challenges.map((ch) => (
            <motion.li key={ch.challenge} variants={fadeUp} className="py-8">
              <div className="grid gap-4 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
                <h3 className="text-xl font-medium tracking-[-0.02em] text-fg">
                  {ch.challenge}
                </h3>
                <p className="max-w-[62ch] text-[15px] leading-relaxed text-body">
                  {ch.approach}
                </p>
              </div>
            </motion.li>
          ))}
        </Reveal>
      </Section>

      {/* ---------------- IMPLEMENTATION ---------------- */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContentHeading
            eyebrow="Implementation"
            title="The order we built it in."
            lede="Sequence matters. Each step was chosen because it de-risked the next one."
          />
          <div>
            <StepList items={c.implementation} />
          </div>
        </div>
      </Section>

      {/* ---------------- INTEGRATIONS ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContentHeading eyebrow="Integrations" title="What it connects to." />
          <div className="lg:pt-2">
            <IntegrationChips items={c.integrations} />
          </div>
        </div>
      </Section>

      {/* ---------------- RESULTS (metric slots) ---------------- */}
      <Section surface="ink">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div>
            <ContentHeading
              invert
              eyebrow="Results"
              title="Measured, or marked pending."
            />
            <div className="mt-8">
              <Callout title="Why these are empty" dark>
                {c.status === "In development"
                  ? "This platform is still in development, so there is no verified production data to publish. Each metric below names what we will measure and how. A figure appears here only once it has been measured and dated."
                  : "Each metric names what is measured and how. A figure appears only once it has been verified and dated."}
              </Callout>
            </div>
          </div>
          <div>
            <MetricSlots items={c.results} dark />
          </div>
        </div>
      </Section>

      {/* ---------------- LESSONS ---------------- */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <ContentHeading
            eyebrow="Lessons"
            title="What we would tell ourselves at the start."
          />
          <div className="lg:pt-2">
            <Bullets items={c.lessons} />
          </div>
        </div>
      </Section>

      {/* ---------------- FAQ ---------------- */}
      {c.faqs.length > 0 ? (
        <Section surface="paper">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div className="lg:sticky lg:top-28 lg:self-start">
              <ContentHeading eyebrow="Questions" title="About this project." />
            </div>
            <Faqs items={c.faqs} />
          </div>
        </Section>
      ) : null}

      {/* ---------------- RELATED ---------------- */}
      <Section surface="white">
        <ContentHeading eyebrow="Keep reading" title="Related to this." />
        <div className="mt-12">
          <Related groups={related} />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Need something built to this standard?"
        lede="Describe the system you have in mind. We will tell you what it takes, what we would do differently, and whether we are the right team for it."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "All case studies", href: "/case-studies" }}
        image={c.image}
      />
    </div>
  );
}
