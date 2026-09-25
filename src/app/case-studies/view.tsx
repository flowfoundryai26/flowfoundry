"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import { Arrow, Button, Container, Eyebrow, Index, Status } from "@/components/ui";
import { Reveal, Spotlight, Words, fadeUp, stagger } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  Callout,
  ContentHeading,
  Section,
} from "@/components/content";

export default function CaseStudiesView() {
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
              trail={[{ name: "Case Studies", path: "/case-studies" }]}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>Case Studies</Eyebrow>
            </motion.div>
            <h1 className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words
                text="The architecture, not the highlight reel."
                delay={0.15}
              />
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[58ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              Four platforms, written up in full: the business problem, the
              architecture, the technologies, the problems we hit, and what we
              would do differently. Every one is currently in development and
              labelled as such.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <Button href="/contact" variant="onDark" size="lg">
                Discuss your project
                <Arrow />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* Honesty note — stated before the work, not buried after it */}
      <Section surface="white">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <ContentHeading
            eyebrow="Read this first"
            title="No results numbers yet, and we are not going to invent any."
          />
          <div className="lg:pt-3">
            <p className="max-w-[58ch] text-[17px] leading-relaxed text-body">
              FlowFoundry is early. Every platform below is in active
              development, which means we do not yet have verified performance
              figures to publish. Rather than quoting plausible-sounding
              percentages, each case study carries named metric slots that stay
              marked as pending until a figure is measured and dated.
            </p>
            <div className="mt-8">
              <Callout title="What you can judge us on instead">
                The engineering reasoning. Each write-up covers the architecture
                we chose, the failure modes we designed for, and the mistakes we
                made — which tells you more about how we would handle your
                project than a metric with no methodology attached.
              </Callout>
            </div>
          </div>
        </div>
      </Section>

      <Section surface="paper">
        <Reveal step={0.08} className="grid gap-4 lg:gap-5">
          {CASE_STUDIES.map((c, i) => (
            <motion.div key={c.slug} variants={fadeUp}>
              <Spotlight className="rounded-2xl border border-line bg-white transition-colors duration-500 hover:border-line-strong">
                <Link
                  href={`/case-studies/${c.slug}`}
                  className="grid gap-8 p-7 sm:p-9 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <Index>{String(i + 1).padStart(2, "0")}</Index>
                      <span className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                        {c.category}
                      </span>
                      <Status>{c.status}</Status>
                    </div>
                    <h2 className="mt-6 text-3xl font-medium tracking-[-0.03em] text-fg sm:text-4xl">
                      {c.name}
                    </h2>
                    <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-body">
                      {c.summary}
                    </p>
                    <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                      Read the case study
                      <ArrowUpRight
                        weight="bold"
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div className="border-t border-line pt-7 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                    <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                      The problem
                    </p>
                    <h3 className="mt-3 text-lg font-medium tracking-[-0.015em] text-fg">
                      {c.businessProblem.title}
                    </h3>
                    <p className="mt-3 max-w-[52ch] text-[14.5px] leading-relaxed text-body">
                      {c.businessProblem.body.slice(0, 220)}…
                    </p>
                    <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5">
                      {c.technologies
                        .flatMap((g) => g.items)
                        .slice(0, 6)
                        .map((t) => (
                          <li
                            key={t}
                            className="font-mono text-[10.5px] uppercase tracking-[0.1em] text-muted"
                          >
                            {t}
                          </li>
                        ))}
                    </ul>
                  </div>
                </Link>
              </Spotlight>
            </motion.div>
          ))}
        </Reveal>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Have a system like one of these in mind?"
        lede="Tell us what it needs to do. We will map the architecture and be straight with you about what it takes to build."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
        image="/images/use-cases/custom.webp"
      />
    </div>
  );
}
