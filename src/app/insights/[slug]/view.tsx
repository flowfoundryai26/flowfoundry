"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Article, Block } from "@/lib/content/insights";
import { ARTICLES, tocOf } from "@/lib/content/insights";
import { SOLUTIONS } from "@/lib/content/solutions";
import { INDUSTRIES } from "@/lib/content/industries";
import { CASE_STUDIES } from "@/lib/content/case-studies";
import { FOUNDER } from "@/lib/site";
import { EVENTS, track } from "@/lib/analytics";
import { Arrow, Button, buttonClass, Container, Eyebrow } from "@/components/ui";
import { Reveal, fadeUp, stagger } from "@/components/motion";
import { CTA } from "@/components/sections";
import {
  Breadcrumbs,
  Bullets,
  Callout,
  Compare,
  ContentHeading,
  Faqs,
  Flow,
  Related,
  Section,
  StepList,
} from "@/components/content";

/* =========================================================
   BLOCK RENDERER
   Semantic elements only — h2/h3 keep the document outline
   intact, which is what makes the table of contents honest.
========================================================= */

function Blocks({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        switch (b.t) {
          case "h2":
            return (
              <h2
                key={i}
                id={b.id}
                className="mt-16 scroll-mt-28 text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-fg first:mt-0"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                className="mt-10 text-xl font-medium tracking-[-0.02em] text-fg"
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p
                key={i}
                className="mt-5 max-w-[68ch] text-[17px] leading-[1.75] text-body"
              >
                {b.text}
              </p>
            );
          case "ul":
            return (
              <div key={i} className="mt-6 max-w-[68ch]">
                <Bullets items={b.items} />
              </div>
            );
          case "ol":
            return (
              <div key={i} className="mt-6 max-w-[68ch]">
                <StepList items={b.items} />
              </div>
            );
          case "flow":
            return (
              <div key={i} className="mt-10">
                <Flow title={b.title} steps={b.steps} />
              </div>
            );
          case "compare":
            return (
              <div key={i} className="mt-10">
                <Compare title={b.title} left={b.left} right={b.right} />
              </div>
            );
          case "callout":
            return (
              <div key={i} className="mt-9 max-w-[68ch]">
                <Callout title={b.title}>{b.text}</Callout>
              </div>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="mt-9 max-w-[62ch] border-l-2 border-accent pl-6 text-[19px] leading-[1.6] text-fg"
              >
                {b.text}
              </blockquote>
            );
          default:
            return null;
        }
      })}
    </>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function ArticleView({ article: a }: { article: Article }) {
  const trail = [
    { name: "Insights", path: "/insights" },
    { name: a.title, path: `/insights/${a.slug}` },
  ];
  const toc = tocOf(a);

  const fmt = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const related = [
    {
      title: "Solutions",
      links: a.relatedSolutions
        .map((s) => SOLUTIONS.find((x) => x.slug === s))
        .filter((x) => Boolean(x))
        .map((x) => ({
          label: x!.name,
          href: `/solutions/${x!.slug}`,
          note: x!.eyebrow,
        })),
    },
    {
      title: "Industries",
      links: a.relatedIndustries
        .map((s) => INDUSTRIES.find((x) => x.slug === s))
        .filter((x) => Boolean(x))
        .map((x) => ({ label: x!.name, href: `/industries/${x!.slug}` })),
    },
    {
      title: "More reading",
      links: [
        ...a.relatedCaseStudies
          .map((s) => CASE_STUDIES.find((x) => x.slug === s))
          .filter((x) => Boolean(x))
          .map((x) => ({
            label: x!.name,
            href: `/case-studies/${x!.slug}`,
            note: x!.category,
          })),
        ...ARTICLES.filter((x) => x.slug !== a.slug).map((x) => ({
          label: x.title,
          href: `/insights/${x.slug}`,
          note: x.category,
        })),
      ],
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
            <Breadcrumbs
              trail={[
                { name: "Insights", path: "/insights" },
                { name: a.category, path: `/insights/${a.slug}` },
              ]}
            />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="max-w-[46rem] py-14 lg:py-20"
          >
            <motion.div variants={fadeUp}>
              <Eyebrow dark>{a.category}</Eyebrow>
            </motion.div>

            <h1 className="mt-6 text-[clamp(2rem,4.2vw,3.4rem)] font-medium leading-[1.06] tracking-[-0.035em] text-white text-balance">
              {a.h1}
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 text-base leading-relaxed text-on-dark sm:text-lg"
            >
              {a.lede}
            </motion.p>

            {/* Byline — a real author, linked to a real author page */}
            <motion.div
              variants={fadeUp}
              className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-white/[0.08] pt-7"
            >
              <Link
                href={`/authors/${FOUNDER.slug}`}
                className="group flex items-center gap-3.5"
                rel="author"
              >
                <span className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border border-white/10">
                  <Image
                    src={FOUNDER.avatar}
                    alt={`${FOUNDER.name}, ${FOUNDER.shortRole} at FlowFoundry AI Solutions`}
                    fill
                    sizes="44px"
                    className="object-cover"
                  />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-white transition-colors group-hover:text-accent-dark">
                    {FOUNDER.name}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-muted">
                    {FOUNDER.role}
                  </span>
                </span>
              </Link>

              <dl className="flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-muted">
                <div>
                  <dt className="inline">Published </dt>
                  <dd className="inline text-on-dark">
                    <time dateTime={a.published}>{fmt(a.published)}</time>
                  </dd>
                </div>
                {a.updated !== a.published ? (
                  <div>
                    <dt className="inline">Updated </dt>
                    <dd className="inline text-on-dark">
                      <time dateTime={a.updated}>{fmt(a.updated)}</time>
                    </dd>
                  </div>
                ) : null}
                <div>
                  <dt className="inline">Read </dt>
                  <dd className="inline text-on-dark">
                    {a.readingMinutes} min
                  </dd>
                </div>
              </dl>
            </motion.div>
          </motion.div>
        </Container>
      </section>

      {/* ---------------- BODY + TOC ---------------- */}
      <section className="w-full bg-white py-16 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[240px_1fr] lg:gap-20">
            {/* TOC */}
            <nav
              aria-label="On this page"
              className="lg:sticky lg:top-28 lg:self-start"
            >
              <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                On this page
              </p>
              <ol className="mt-4 space-y-2.5">
                {toc.map((h, i) => (
                  <li key={h.id}>
                    <a
                      href={`#${h.id}`}
                      className="group flex items-baseline gap-3 text-[13.5px] leading-snug text-body transition-colors hover:text-fg"
                    >
                      <span className="font-mono text-2xs text-muted">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span>{h.text}</span>
                    </a>
                  </li>
                ))}
              </ol>

              <div className="mt-8 border-t border-line pt-6">
                <Button href="/contact" variant="secondary" size="sm">
                  Book a consultation
                  <Arrow />
                </Button>
              </div>
            </nav>

            {/* Article */}
            <article className="min-w-0">
              <Blocks blocks={a.body} />

              {/* Mid-article CTA, contextual to the topic */}
              <div className="mt-16 rounded-2xl border border-line bg-paper p-7 sm:p-9">
                <p className="font-mono text-2xs uppercase tracking-[0.16em] text-accent-strong">
                  Related service
                </p>
                <h2 className="mt-3 max-w-[30ch] text-2xl font-medium tracking-[-0.025em] text-fg">
                  Want this mapped for your business?
                </h2>
                <p className="mt-3 max-w-[54ch] text-[15px] leading-relaxed text-body">
                  Describe how the process runs today. We will come back with
                  what can be automated, what should stay with your team, and
                  what it would take to build.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/contact"
                    onClick={() =>
                      track(EVENTS.articleCtaClick, { article: a.slug })
                    }
                    className={buttonClass({ variant: "primary" })}
                  >
                    Book an automation consultation
                    <Arrow />
                  </Link>
                  {a.relatedSolutions[0] ? (
                    <Button
                      href={`/solutions/${a.relatedSolutions[0]}`}
                      variant="secondary"
                    >
                      {SOLUTIONS.find((s) => s.slug === a.relatedSolutions[0])
                        ?.name ?? "Explore solutions"}
                    </Button>
                  ) : null}
                </div>
              </div>

              {/* FAQ */}
              {a.faqs.length > 0 ? (
                <div className="mt-16">
                  <h2 className="text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.15] tracking-[-0.025em] text-fg">
                    Frequently asked
                  </h2>
                  <div className="mt-8">
                    <Faqs items={a.faqs} />
                  </div>
                </div>
              ) : null}

              {/* Author card */}
              <aside className="mt-16 border-t border-line pt-10">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
                  <span className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-line">
                    <Image
                      src={FOUNDER.avatar}
                      alt={`${FOUNDER.name}, ${FOUNDER.shortRole} at FlowFoundry AI Solutions`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                      Written by
                    </p>
                    <h2 className="mt-2 text-xl font-medium tracking-[-0.02em] text-fg">
                      {FOUNDER.name}
                    </h2>
                    <p className="mt-1 text-sm text-muted">{FOUNDER.role}</p>
                    <p className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-body">
                      {FOUNDER.bio}
                    </p>
                    <Link
                      href={`/authors/${FOUNDER.slug}`}
                      className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-fg"
                    >
                      More from {FOUNDER.name.split(" ")[0]}
                    </Link>
                  </div>
                </div>
              </aside>
            </article>
          </div>
        </Container>
      </section>

      {/* ---------------- RELATED ---------------- */}
      <Section surface="paper">
        <ContentHeading eyebrow="Keep reading" title="Related to this." />
        <div className="mt-12">
          <Related groups={related} />
        </div>
      </Section>

      <CTA
        eyebrow="Next step"
        title="Map this against your own workflow."
        lede="A consultation is a conversation about how your process runs today, not a pitch. You will leave with a view on what is worth automating first."
        primary={{ label: "Book a consultation", href: "/contact" }}
        secondary={{ label: "Read more insights", href: "/insights" }}
        image={a.image}
      />
    </div>
  );
}
