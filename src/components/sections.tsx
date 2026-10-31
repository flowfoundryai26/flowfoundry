"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "@phosphor-icons/react";
import {
  Arrow,
  Button,
  Container,
  Eyebrow,
  Index,
  SectionHeading,
} from "./ui";
import {
  EASE,
  Reveal,
  Spotlight,
  Words,
  fadeIn,
  fadeUp,
  scaleIn,
  stagger,
} from "./motion";

/* =========================================================
   PAGE HERO - dark, asymmetric, optional photo fade
========================================================= */

export function PageHero({
  eyebrow,
  title,
  lede,
  secondary,
  primaryCta,
  secondaryCta,
  image,
  imageAlt = "",
  aside,
  strip,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  lede: ReactNode;
  secondary?: ReactNode;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  image?: string;
  imageAlt?: string;
  aside?: ReactNode;
  strip?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      {image ? (
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[62%]">
            <Image
              src={image}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 62vw"
              className="object-cover object-center opacity-40 saturate-[0.85]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#131210_0%,#131210_28%,rgba(19,18,16,0.7)_58%,rgba(19,18,16,0.55)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(19,18,16,0.6)_0%,rgba(19,18,16,0)_40%,#131210_100%)]" />
        </div>
      ) : null}

      <Container className="relative z-10">
        <div
          className={`grid items-end gap-12 ${
            compact ? "py-16 lg:py-24" : "py-20 lg:py-24"
          } ${aside ? "lg:grid-cols-[1.15fr_0.85fr] lg:items-center" : "lg:grid-cols-[1fr_minmax(0,320px)]"}`}
        >
          <motion.div initial="hidden" animate="visible" variants={stagger(0.1, 0.05)}>
            <motion.div variants={fadeUp}>
              <Eyebrow dark>{eyebrow}</Eyebrow>
            </motion.div>

            <h1 className="mt-8 max-w-[20ch] text-[clamp(2.25rem,4.6vw,3.5rem)] font-medium leading-[1.05] tracking-[-0.03em] text-fg text-balance">
              <Words text={title} delay={0.15} />
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-[48ch] text-[17px] leading-relaxed text-body sm:text-lg"
            >
              {lede}
            </motion.p>

            {secondary ? (
              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[54ch] text-[15px] leading-relaxed text-on-dark-muted"
              >
                {secondary}
              </motion.p>
            ) : null}

            {(primaryCta || secondaryCta) && (
              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
              >
                {primaryCta ? (
                    <Button href={primaryCta.href} variant="onDark" size="lg" className="w-full sm:w-auto">
                      {primaryCta.label}
                      <Arrow />
                    </Button>
                ) : null}
                {secondaryCta ? (
                  <Button href={secondaryCta.href} variant="outlineOnDark" size="lg" className="w-full sm:w-auto">
                    {secondaryCta.label}
                  </Button>
                ) : null}
              </motion.div>
            )}
          </motion.div>

          {aside ? (
            <motion.div initial="hidden" animate="visible" variants={scaleIn} className="min-w-0">
              {aside}
            </motion.div>
          ) : strip ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              className="lg:justify-self-end"
            >
              {strip}
            </motion.div>
          ) : null}
        </div>
      </Container>
    </section>
  );
}

/* =========================================================
   STAT STRIP - mono numbers, divide lines, no boxes
========================================================= */

export function StatStrip({
  items,
  dark = true,
  className = "",
}: {
  items: { value: ReactNode; label: string }[];
  dark?: boolean;
  className?: string;
}) {
  const cols: Record<number, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
  };
  return (
    <dl
      className={`grid grid-cols-2 gap-x-8 gap-y-6 ${cols[Math.min(items.length, 4)]} ${className}`}
    >
      {items.map((s) => (
        <div
          key={s.label}
          className={`border-l pl-4 ${dark ? "border-white/10" : "border-line-strong"}`}
        >
          <dt className="text-[13px] text-muted">{s.label}</dt>
          <dd className="tnum mt-2 text-[28px] font-medium leading-none tracking-[-0.02em] text-fg">
            {s.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/* =========================================================
   ROW LIST - index | title | body. No cards.
========================================================= */

export function RowList({
  items,
  dark = false,
  hrefBase,
}: {
  items: {
    id?: string;
    index: string;
    title: string;
    body: string;
    meta?: string[];
    href?: string;
  }[];
  dark?: boolean;
  hrefBase?: string;
}) {
  return (
    <Reveal
      as="ul"
      step={0.06}
      className={`divide-y border-y ${
        dark ? "divide-white/[0.07] border-white/[0.07]" : "divide-line border-line"
      }`}
    >
      {items.map((it) => {
        const href = it.href ?? (hrefBase && it.id ? `${hrefBase}#${it.id}` : undefined);
        const inner = (
          <div className="grid gap-4 py-7 sm:py-8 lg:grid-cols-[72px_1.1fr_1.6fr_40px] lg:items-baseline lg:gap-8">
            <Index dark={dark}>{it.index}</Index>
            <h3
              className={`text-xl font-medium tracking-[-0.02em] sm:text-2xl ${
                dark ? "text-white" : "text-fg"
              }`}
            >
              {it.title}
            </h3>
            <div>
              <p className={`text-[15px] leading-relaxed ${dark ? "text-on-dark" : "text-body"}`}>
                {it.body}
              </p>
              {it.meta ? (
                <p className="mt-3 text-[13px] text-muted">
                  {it.meta.join("  ·  ")}
                </p>
              ) : null}
            </div>
            {href ? (
              <ArrowUpRight
                className="hidden h-4 w-4 justify-self-end text-muted opacity-0 transition-opacity duration-200 group-hover:opacity-100 lg:block"
                aria-hidden="true"
              />
            ) : null}
          </div>
        );
        return (
          <motion.li key={it.index + it.title} variants={fadeUp} id={it.id} className="group scroll-mt-28 transition-colors duration-200 hover:bg-ink-2/60">
            {href ? (
              <Link href={href} className="block">
                {inner}
              </Link>
            ) : (
              inner
            )}
          </motion.li>
        );
      })}
    </Reveal>
  );
}

/* =========================================================
   PROCESS - timeline with a scroll-drawn progress line
========================================================= */

export function Process({
  steps,
  dark = false,
}: {
  steps: { number: string; title: string; body: string; label?: string }[];
  dark?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      <div
        className={`absolute inset-x-0 top-[5px] hidden h-px lg:block ${
          dark ? "bg-white/10" : "bg-line-strong"
        }`}
      >
        <motion.div
          className={`h-full origin-left ${dark ? "bg-accent-dark" : "bg-accent"}`}
          style={{ scaleX }}
        />
      </div>

      <Reveal step={0.1} className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {steps.map((s) => (
          <motion.div key={s.number} variants={fadeUp} className="relative">
            <span
              aria-hidden="true"
              className="relative z-10 mb-6 hidden h-[11px] w-[11px] rounded-full border-2 border-accent bg-ink lg:block"
            />
            <Index dark={dark}>{s.number}</Index>
            <h3
              className={`mt-2 text-xl font-medium tracking-[-0.02em] ${
                dark ? "text-white" : "text-fg"
              }`}
            >
              {s.title}
            </h3>
            <p className={`mt-3 max-w-[32ch] text-[15px] leading-relaxed ${dark ? "text-on-dark" : "text-body"}`}>
              {s.body}
            </p>
          </motion.div>
        ))}
      </Reveal>
    </div>
  );
}

/* =========================================================
   STICKY STACK - cards stick and pile as you scroll

   The image column is gone. It carried generated "AI architecture"
   diagrams - a cartoon robot, a glossy hexagon and garbled text that
   collided with the real copy - and nothing in them was true. These
   are four statements, so they are set as four statements: the
   struck serial, the claim, the reasoning, and the ember rule that
   runs through the rest of the page.
========================================================= */

export function StickyStack({
  items,
}: {
  items: { index: string; title: string; body: string; image?: string; alt?: string }[];
}) {
  return (
    <div className="space-y-5 lg:space-y-6">
      {items.map((it, i) => (
        <div
          key={it.index}
          className="lg:sticky"
          style={{ top: `calc(96px + ${i * 20}px)` }}
        >
          <div className="overflow-hidden rounded-xl border border-line bg-ink-2 p-8 sm:p-10">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-6 shrink-0 bg-accent" />
              <Index>{it.index}</Index>
            </div>
            <h3 className="mt-6 max-w-[20ch] text-2xl font-medium tracking-[-0.02em] text-fg sm:text-[28px] sm:leading-[1.15]">
              {it.title}
            </h3>
            <p className="mt-4 max-w-[52ch] text-[15px] leading-relaxed text-body">
              {it.body}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   CTA - dark panel, asymmetric, photo fade
========================================================= */

export function CTA({
  eyebrow = "Start a conversation",
  title,
  lede,
  primary = { label: "Book consultation", href: "/contact" },
  secondary,
  image,
}: {
  eyebrow?: string;
  title: string;
  lede: ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
  /* Optional, and unset on every page today. The default used to be a
     generated photograph whose screens carried invented figures. */
  image?: string;
}) {
  return (
    <section className="w-full bg-surface px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28">
      <Reveal amount={0.3} className="mx-auto w-full max-w-[1400px]">
        <motion.div
          variants={scaleIn}
          className="relative overflow-hidden rounded-2xl border border-line bg-ink"
        >
          {image ? (
          <div className="pointer-events-none absolute inset-0" aria-hidden="true">
            <div className="absolute inset-y-0 right-0 w-full lg:w-1/2">
              <Image
                src={image}
                alt=""
                fill
                sizes="(max-width: 1023px) 100vw, 50vw"
                className="object-cover opacity-30 saturate-[0.7]"
              />
            </div>
            <div className="absolute inset-0 bg-[linear-gradient(90deg,#131210_0%,#131210_40%,rgba(19,18,16,0.55)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,#131210_0%,rgba(19,18,16,0)_50%)]" />
          </div>
          ) : null}

          <div className="relative z-10 grid gap-10 px-7 py-16 sm:px-12 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:px-16 lg:py-24">
            <div>
              <Eyebrow dark>{eyebrow}</Eyebrow>
              <h2 className="mt-6 max-w-[18ch] text-[clamp(2rem,4.6vw,3.4rem)] font-medium leading-[1.04] tracking-[-0.03em] text-fg text-balance">
                {title}
              </h2>
              <p className="mt-6 max-w-[50ch] text-base leading-relaxed text-body sm:text-lg">
                {lede}
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col lg:items-end xl:flex-row">
                <Button href={primary.href} variant="onDark" size="lg" className="w-full sm:w-auto">
                  {primary.label}
                  <Arrow />
                </Button>
              {secondary ? (
                <Button href={secondary.href} variant="outlineOnDark" size="lg" className="w-full sm:w-auto">
                  {secondary.label}
                </Button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </Reveal>
    </section>
  );
}

/* =========================================================
   FEATURE GRID - asymmetric bento (2 cols, first spans)
========================================================= */

export function Bento({
  items,
  dark = false,
}: {
  items: {
    id?: string;
    index: string;
    title: string;
    body: string;
    icon?: ReactNode;
    tags?: string[];
    wide?: boolean;
  }[];
  dark?: boolean;
}) {
  return (
    <Reveal step={0.07} className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-5">
      {items.map((it) => (
        <motion.div
          key={it.index}
          variants={fadeUp}
          id={it.id}
          className={`scroll-mt-28 ${it.wide ? "lg:col-span-2" : ""}`}
        >
          <Spotlight
            dark={dark}
            className={`flex h-full flex-col rounded-2xl border p-7 transition-colors duration-500 sm:p-8 ${
              dark
                ? "border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.04]"
                : "border-line bg-surface hover:border-line-strong"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-ink-2 text-body">
                {it.icon}
              </span>
              <Index dark={dark}>{it.index}</Index>
            </div>
            <h3
              className={`mt-8 text-xl font-medium tracking-[-0.02em] ${
                dark ? "text-white" : "text-fg"
              }`}
            >
              {it.title}
            </h3>
            <p className={`mt-3 text-[15px] leading-relaxed ${dark ? "text-on-dark" : "text-body"}`}>
              {it.body}
            </p>
            {it.tags ? (
              <ul className="mt-auto flex flex-wrap gap-x-3 gap-y-1.5 pt-7">
                {it.tags.map((t) => (
                  <li key={t} className="text-[13px] text-muted">
                    {t}
                  </li>
                ))}
              </ul>
            ) : null}
          </Spotlight>
        </motion.div>
      ))}
    </Reveal>
  );
}

/* =========================================================
   SPLIT - a statement beside its supporting text

   The image is optional now, and no caller passes one. Every
   photograph this component used to carry came from one generated
   batch whose screens and signage had invented figures painted into
   them. Without an image the two columns carry the weight: the
   headline on one side, the argument on the other, with the figure
   in a panel under the headline where the floating card used to
   overlap the picture's corner.
========================================================= */

export function Split({
  eyebrow,
  title,
  children,
  image,
  imageAlt = "",
  reverse = false,
  stat,
  dark = false,
}: {
  // Optional: most sections carry their message in the headline alone.
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  image?: string;
  imageAlt?: string;
  reverse?: boolean;
  stat?: { value: ReactNode; label: string };
  dark?: boolean;
}) {
  void dark;

  const statPanel = stat ? (
    <div className="inline-flex flex-col rounded-xl border border-line bg-ink-2 px-6 py-5">
      <span className="tnum text-[28px] font-medium leading-none tracking-[-0.03em] text-fg">
        {stat.value}
      </span>
      <span className="mt-2 text-[13px] text-muted">{stat.label}</span>
    </div>
  ) : null;

  if (!image) {
    return (
      <Reveal amount={0.2} className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <motion.div variants={fadeUp} className={reverse ? "lg:order-2" : ""}>
          <SectionHeading eyebrow={eyebrow} title={title} />
          {statPanel ? <div className="mt-9">{statPanel}</div> : null}
        </motion.div>
        <motion.div
          variants={fadeUp}
          className={`space-y-5 text-body ${reverse ? "lg:order-1" : ""}`}
        >
          {children}
        </motion.div>
      </Reveal>
    );
  }

  return (
    <Reveal
      amount={0.2}
      className={`grid items-center gap-12 lg:gap-20 ${
        reverse ? "lg:grid-cols-[1fr_1.05fr]" : "lg:grid-cols-[1.05fr_1fr]"
      }`}
    >
      <motion.div variants={fadeUp} className={reverse ? "lg:order-2" : ""}>
        <SectionHeading eyebrow={eyebrow} title={title} />
        <div className="mt-7 space-y-4 text-body">{children}</div>
      </motion.div>

      <motion.div variants={scaleIn} className={`relative ${reverse ? "lg:order-1" : ""}`}>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(max-width: 1023px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        {statPanel ? (
          <div
            className={`absolute -bottom-6 shadow-lift ${
              reverse ? "-right-2 sm:-right-6" : "-left-2 sm:-left-6"
            }`}
          >
            {statPanel}
          </div>
        ) : null}
      </motion.div>
    </Reveal>
  );
}

/* =========================================================
   CHECK LIST - two column, no boxes
========================================================= */

export function Checks({
  items,
  dark = false,
  cols = 2,
}: {
  items: readonly string[];
  dark?: boolean;
  cols?: 1 | 2;
}) {
  return (
    <Reveal as="ul" step={0.05} className={`grid gap-x-8 gap-y-3 ${cols === 2 ? "sm:grid-cols-2" : ""}`}>
      {items.map((p) => (
        <motion.li key={p} variants={fadeUp} className="flex items-start gap-3">
          <span
            className="mt-[8px] h-1 w-1 shrink-0 rounded-full bg-line-strong"
          />
          <span className={`text-[15px] leading-relaxed ${dark ? "text-on-dark" : "text-body"}`}>
            {p}
          </span>
        </motion.li>
      ))}
    </Reveal>
  );
}

/* =========================================================
   LEGAL - privacy / terms layout with sticky index
========================================================= */

export function Legal({
  label,
  title,
  lede,
  updated,
  sections,
}: {
  label: string;
  title: string;
  lede: string;
  updated: string;
  sections: { index: string; title: string; content: string[] }[];
}) {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow={label}
        title={title}
        lede={lede}
        compact
        strip={
          <p className="font-mono text-2xs text-muted">Last updated · {updated}</p>
        }
      />

      <section className="w-full bg-surface py-20 lg:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[260px_1fr] lg:gap-20">
            <nav aria-label="Sections" className="lg:sticky lg:top-28 lg:self-start">
              <p className="text-[13px] text-muted">Contents</p>
              <ol className="mt-4 space-y-2.5">
                {sections.map((s) => (
                  <li key={s.index}>
                    <a
                      href={`#s-${s.index}`}
                      className="group inline-flex items-baseline gap-3 text-sm text-body transition-colors hover:text-fg"
                    >
                      <span className="font-mono text-2xs text-muted">{s.index}</span>
                      <span className="relative">
                        {s.title}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-fg transition-transform duration-200 group-hover:scale-x-100" />
                      </span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <Reveal as="ol" step={0.06} className="divide-y divide-line border-y border-line">
              {sections.map((s) => (
                <motion.li key={s.index} id={`s-${s.index}`} variants={fadeUp} className="scroll-mt-28 py-10">
                  <div className="grid gap-4 sm:grid-cols-[64px_1fr] sm:gap-8">
                    <Index className="pt-1.5">{s.index}</Index>
                    <div>
                      <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">{s.title}</h2>
                      <ul className="mt-5 space-y-3">
                        {s.content.map((c) => (
                          <li key={c} className="flex items-start gap-3 text-[15px] leading-relaxed text-body">
                            <span className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-line-strong" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.li>
              ))}
            </Reveal>
          </div>

          <Reveal amount={0.4} className="mt-16 lg:ml-[calc(260px+5rem)]">
            <motion.div variants={fadeUp} className="rounded-2xl border border-line bg-surface-2 p-8">
              <h2 className="text-xl font-medium tracking-[-0.02em] text-fg">Questions about this policy?</h2>
              <p className="mt-2 max-w-[56ch] text-[15px] leading-relaxed text-body">
                Email us at{" "}
                <a href="mailto:info@flowfoundryai.in" className="font-medium text-fg underline decoration-line-strong underline-offset-4">
                  info@flowfoundryai.in
                </a>{" "}
                or use the{" "}
                <Link href="/contact" className="font-medium text-fg underline decoration-line-strong underline-offset-4">
                  contact page
                </Link>
                .
              </p>
            </motion.div>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
