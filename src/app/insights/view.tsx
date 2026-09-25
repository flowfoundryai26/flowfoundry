"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import { ARTICLES, PLANNED_ARTICLES } from "@/lib/content/insights";
import { FOUNDER } from "@/lib/site";
import { Arrow, Button, Container, Eyebrow, Index } from "@/components/ui";
import { Reveal, Spotlight, Words, fadeUp, stagger } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  Callout,
  ContentHeading,
  Section,
} from "@/components/content";

export default function InsightsView() {
  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

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
            <Breadcrumbs trail={[{ name: "Insights", path: "/insights" }]} />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>Insights</Eyebrow>
            </motion.div>
            <h1 className="mt-6 max-w-[22ch] text-[clamp(2.1rem,4.4vw,3.7rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white text-balance">
              <Words text="Practical write-ups from work we have done." delay={0.15} />
            </h1>
            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[58ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              Long, specific articles on automation workflows — how they are
              built, where they break, and what we would not automate. Written by
              the person doing the engineering, not a content team.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-9">
              <Button href="/contact" variant="onDark" size="lg">
                Book a consultation
                <Arrow />
              </Button>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ---------------- ARTICLES ---------------- */}
      <Section surface="white">
        <ContentHeading
          align="split"
          eyebrow="Published"
          title="Written properly, and not many of them."
          lede="Three long articles rather than thirty short ones. Thin pages dilute a site and give a reader no reason to trust it."
        />

        <Reveal step={0.08} className="mt-14 grid gap-4 lg:mt-18 lg:gap-5">
          {ARTICLES.map((a, i) => (
            <motion.article key={a.slug} variants={fadeUp}>
              <Spotlight className="rounded-2xl border border-line bg-white transition-colors duration-500 hover:border-line-strong">
                <Link
                  href={`/insights/${a.slug}`}
                  className="grid gap-7 p-7 sm:p-9 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <Index>{String(i + 1).padStart(2, "0")}</Index>
                      <span className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                        {a.category}
                      </span>
                      <span className="font-mono text-2xs uppercase tracking-[0.12em] text-muted">
                        {a.readingMinutes} min read
                      </span>
                    </div>

                    <h2 className="mt-6 max-w-[34ch] text-2xl font-medium tracking-[-0.025em] text-fg sm:text-3xl">
                      {a.title}
                    </h2>

                    <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-body">
                      {a.lede}
                    </p>

                    <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-fg">
                      Read the article
                      <ArrowUpRight
                        weight="bold"
                        aria-hidden="true"
                        className="h-4 w-4 transition-transform duration-300 group-hover/spot:-translate-y-0.5 group-hover/spot:translate-x-0.5"
                      />
                    </span>
                  </div>

                  <div className="flex flex-col justify-between gap-6 border-t border-line pt-6 lg:border-l lg:border-t-0 lg:pl-14 lg:pt-0">
                    <div className="flex items-center gap-3">
                      <span className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-line">
                        <Image
                          src={FOUNDER.avatar}
                          alt={`${FOUNDER.name}, ${FOUNDER.shortRole}`}
                          fill
                          sizes="36px"
                          className="object-cover"
                        />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[13px] font-medium text-fg">
                          {FOUNDER.name}
                        </span>
                        <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                          {FOUNDER.shortRole}
                        </span>
                      </span>
                    </div>

                    <dl className="space-y-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                      <div>
                        <dt className="inline">Published </dt>
                        <dd className="inline text-body">
                          <time dateTime={a.published}>{fmt(a.published)}</time>
                        </dd>
                      </div>
                      {a.updated !== a.published ? (
                        <div>
                          <dt className="inline">Updated </dt>
                          <dd className="inline text-body">
                            <time dateTime={a.updated}>{fmt(a.updated)}</time>
                          </dd>
                        </div>
                      ) : null}
                    </dl>
                  </div>
                </Link>
              </Spotlight>
            </motion.article>
          ))}
        </Reveal>
      </Section>

      {/* ---------------- PIPELINE ---------------- */}
      <Section surface="paper">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <div>
            <ContentHeading
              eyebrow="In the pipeline"
              title="What we are writing next."
            />
            <div className="mt-8">
              <Callout title="Why these are not published yet">
                Publishing empty stubs to fill a content calendar is how a site
                accumulates thin pages that drag down everything else. These are
                listed as a plan, not as pages.
              </Callout>
            </div>
          </div>

          <Reveal
            as="ul"
            step={0.05}
            className="divide-y divide-line border-y border-line"
          >
            {PLANNED_ARTICLES.map((t, i) => (
              <motion.li
                key={t}
                variants={fadeUp}
                className="flex items-baseline gap-5 py-4"
              >
                <Index>{String(i + 1).padStart(2, "0")}</Index>
                <span className="text-[15px] leading-relaxed text-body">
                  {t}
                </span>
              </motion.li>
            ))}
          </Reveal>
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Prefer to talk it through?"
        lede="A consultation covers the same ground as these articles, applied to your actual workflow."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
        image="/images/mission.webp"
      />
    </div>
  );
}
