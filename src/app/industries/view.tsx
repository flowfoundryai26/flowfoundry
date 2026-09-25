"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { INDUSTRIES } from "@/lib/content/industries";
import { SOLUTIONS } from "@/lib/content/solutions";
import { Arrow, Button, Container, Eyebrow, Index } from "@/components/ui";
import { Reveal, Spotlight, Words, fadeUp, stagger } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  ContentHeading,
  Related,
  Section,
} from "@/components/content";

export default function IndustriesView() {
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
            <Breadcrumbs trail={[{ name: "Industries", path: "/industries" }]} />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>Industries</Eyebrow>
            </motion.div>
            <h1 className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words
                text="The same problem, in your industry's language."
                delay={0.15}
              />
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[58ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              Repetitive coordination looks different in a dental clinic than it
              does in a property business. These pages describe the workflow each
              industry actually runs today, and what we would automate first.
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

      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Where we work"
          title="Five industries, written properly."
          lede="Deliberately a short list. Each page explains a real workflow rather than swapping a keyword into a template."
        />

        <Reveal
          step={0.07}
          className="mt-14 grid gap-4 md:grid-cols-2 lg:mt-18 lg:gap-5"
        >
          {INDUSTRIES.map((ind, i) => (
            <motion.div
              key={ind.slug}
              variants={fadeUp}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <Spotlight className="h-full rounded-2xl border border-line bg-white transition-colors duration-500 hover:border-line-strong">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="flex h-full flex-col p-7 sm:p-8"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                      {ind.eyebrow}
                    </span>
                    <Index>{String(i + 1).padStart(2, "0")}</Index>
                  </div>

                  <h2
                    className={`mt-7 font-medium tracking-[-0.025em] text-fg ${
                      i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"
                    }`}
                  >
                    {ind.name}
                  </h2>

                  <p className="mt-3 max-w-[58ch] text-[15px] leading-relaxed text-body">
                    {ind.lede}
                  </p>

                  <p className="mt-6 max-w-[54ch] text-[14px] leading-relaxed text-muted">
                    <span className="font-medium text-fg">Start with: </span>
                    {ind.recommendation.title}
                  </p>

                  <span className="mt-auto flex items-center gap-1.5 pt-8 text-sm font-medium text-fg">
                    Read the workflow
                    <ArrowUpRight
                      weight="bold"
                      aria-hidden="true"
                      className="h-4 w-4 transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5"
                    />
                  </span>
                </Link>
              </Spotlight>
            </motion.div>
          ))}
        </Reveal>
      </Section>

      <Section surface="paper">
        <ContentHeading
          eyebrow="Not listed?"
          title="The pattern transfers."
          lede="These five are the industries we have written up. The underlying work — mapping a workflow, automating the coordination, integrating what you already run — is not industry-specific."
        />
        <div className="mt-10">
          <Button href="/contact" variant="primary">
            Describe your workflow
            <Arrow />
          </Button>
        </div>
      </Section>

      <Section surface="white">
        <ContentHeading eyebrow="Explore" title="By capability instead." />
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
                  { label: "How we work", href: "/how-we-work", note: "Our eight-step process" },
                  { label: "Case studies", href: "/case-studies", note: "What we are building" },
                  { label: "Responsible automation", href: "/responsible-automation", note: "Access, permissions, oversight" },
                ],
              },
            ]}
          />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Which process is costing you the most right now?"
        lede="That is the one to automate first. Tell us how it runs today and we will map what it would take."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "See our solutions", href: "/solutions" }}
        image="/images/cta-bg.webp"
      />
    </div>
  );
}
