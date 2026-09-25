"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Check, Minus, Plus } from "@phosphor-icons/react";
import { Container, Eyebrow, Index, SectionHeading } from "./ui";
import { Reveal, fadeUp } from "./motion";

/* =========================================================
   SECTION SHELL — consistent rhythm, alternating surfaces
========================================================= */

export function Section({
  children,
  surface = "white",
  id,
  className = "",
}: {
  children: ReactNode;
  surface?: "white" | "paper" | "ink";
  id?: string;
  className?: string;
}) {
  const bg =
    surface === "ink" ? "bg-ink" : surface === "paper" ? "bg-paper" : "bg-white";
  return (
    <section
      id={id}
      className={`w-full scroll-mt-24 ${bg} py-20 lg:py-28 ${className}`}
    >
      <Container>{children}</Container>
    </section>
  );
}

/* =========================================================
   BREADCRUMBS — visible trail matching BreadcrumbList schema
========================================================= */

export function Breadcrumbs({
  trail,
  dark = true,
}: {
  trail: { name: string; path: string }[];
  dark?: boolean;
}) {
  const muted = dark ? "text-on-dark-muted" : "text-muted";
  const strong = dark ? "text-white" : "text-fg";
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-2xs uppercase tracking-[0.14em]">
        <li>
          <Link href="/" className={`${muted} transition-colors hover:${strong}`}>
            Home
          </Link>
        </li>
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-2">
              <span aria-hidden="true" className={muted}>
                /
              </span>
              {last ? (
                <span className={strong} aria-current="page">
                  {c.name}
                </span>
              ) : (
                <Link
                  href={c.path}
                  className={`${muted} transition-colors hover:text-white`}
                >
                  {c.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/* =========================================================
   FLOW — a numbered step sequence. The workflow diagram.
   Rail on the left, steps hanging off it. No cards.
========================================================= */

export function Flow({
  title,
  steps,
  dark = false,
}: {
  title?: string;
  steps: { step: string; detail: string }[];
  dark?: boolean;
}) {
  return (
    <div>
      {title ? (
        <p
          className={`font-mono text-2xs uppercase tracking-[0.16em] ${
            dark ? "text-on-dark-muted" : "text-muted"
          }`}
        >
          {title}
        </p>
      ) : null}
      <Reveal
        as="ol"
        step={0.05}
        className={`${title ? "mt-7" : ""} relative border-l ${
          dark ? "border-white/[0.09]" : "border-line-strong"
        }`}
      >
        {steps.map((s, i) => (
          <motion.li key={s.step} variants={fadeUp} className="relative pb-9 pl-7 last:pb-0">
            {/* Node on the rail */}
            <span
              aria-hidden="true"
              className={`absolute -left-[5.5px] top-[7px] h-[9px] w-[9px] rounded-full border-2 ${
                dark ? "border-accent-dark bg-ink" : "border-accent bg-white"
              }`}
            />
            <div className="flex flex-wrap items-baseline gap-x-3">
              <Index dark={dark}>{String(i + 1).padStart(2, "0")}</Index>
              <h3
                className={`text-[17px] font-medium tracking-[-0.015em] ${
                  dark ? "text-white" : "text-fg"
                }`}
              >
                {s.step}
              </h3>
            </div>
            <p
              className={`mt-2 max-w-[62ch] text-[15px] leading-relaxed ${
                dark ? "text-on-dark" : "text-body"
              }`}
            >
              {s.detail}
            </p>
          </motion.li>
        ))}
      </Reveal>
    </div>
  );
}

/* =========================================================
   PLAIN STEP LIST — for "how it runs manually today"
========================================================= */

export function StepList({
  items,
  dark = false,
}: {
  items: readonly string[];
  dark?: boolean;
}) {
  return (
    <Reveal
      as="ol"
      step={0.04}
      className={`divide-y border-y ${
        dark ? "divide-white/[0.07] border-white/[0.07]" : "divide-line border-line"
      }`}
    >
      {items.map((s, i) => (
        <motion.li
          key={s}
          variants={fadeUp}
          className="flex items-baseline gap-5 py-4"
        >
          <Index dark={dark}>{String(i + 1).padStart(2, "0")}</Index>
          <span
            className={`text-[15px] leading-relaxed ${
              dark ? "text-on-dark" : "text-body"
            }`}
          >
            {s}
          </span>
        </motion.li>
      ))}
    </Reveal>
  );
}

/* =========================================================
   BULLETS — dot list, no boxes
========================================================= */

export function Bullets({
  items,
  dark = false,
  cols = 1,
  tone = "accent",
}: {
  items: readonly string[];
  dark?: boolean;
  cols?: 1 | 2;
  tone?: "accent" | "live";
}) {
  const dot =
    tone === "live" ? "bg-live" : dark ? "bg-accent-dark" : "bg-accent";
  return (
    <Reveal
      as="ul"
      step={0.04}
      className={`grid gap-x-10 gap-y-3 ${cols === 2 ? "sm:grid-cols-2" : ""}`}
    >
      {items.map((p) => (
        <motion.li key={p} variants={fadeUp} className="flex items-start gap-3">
          <span
            aria-hidden="true"
            className={`mt-[8px] h-1.5 w-1.5 shrink-0 rounded-full ${dot}`}
          />
          <span
            className={`text-[15px] leading-relaxed ${
              dark ? "text-on-dark" : "text-body"
            }`}
          >
            {p}
          </span>
        </motion.li>
      ))}
    </Reveal>
  );
}

/* =========================================================
   DEFINITION ROWS — title + body pairs. Lines, not cards.
========================================================= */

export function DefRows({
  items,
  dark = false,
}: {
  items: { title: string; body: string }[];
  dark?: boolean;
}) {
  return (
    <Reveal
      as="ul"
      step={0.05}
      className={`grid divide-y border-y sm:grid-cols-2 sm:divide-y-0 ${
        dark
          ? "divide-white/[0.07] border-white/[0.07]"
          : "divide-line border-line"
      }`}
    >
      {items.map((it, i) => (
        <motion.li
          key={it.title}
          variants={fadeUp}
          className={`py-6 sm:py-7 ${
            i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"
          } ${
            i % 2 === 1
              ? dark
                ? "sm:border-l sm:border-white/[0.07]"
                : "sm:border-l sm:border-line"
              : ""
          } ${
            i >= 2
              ? dark
                ? "sm:border-t sm:border-white/[0.07]"
                : "sm:border-t sm:border-line"
              : ""
          }`}
        >
          <h3
            className={`text-[17px] font-medium tracking-[-0.015em] ${
              dark ? "text-white" : "text-fg"
            }`}
          >
            {it.title}
          </h3>
          <p
            className={`mt-2 max-w-[48ch] text-[15px] leading-relaxed ${
              dark ? "text-on-dark" : "text-body"
            }`}
          >
            {it.body}
          </p>
        </motion.li>
      ))}
    </Reveal>
  );
}

/* =========================================================
   COMPARE — two columns. Used for scope boundaries.
========================================================= */

export function Compare({
  title,
  left,
  right,
  dark = false,
}: {
  title?: string;
  left: { title: string; items: readonly string[] };
  right: { title: string; items: readonly string[] };
  dark?: boolean;
}) {
  const border = dark ? "border-white/[0.09]" : "border-line";
  const head = dark ? "text-white" : "text-fg";
  const bodyText = dark ? "text-on-dark" : "text-body";

  const col = (
    side: { title: string; items: readonly string[] },
    variant: "yes" | "no"
  ) => (
    <div className="min-w-0">
      <div className="flex items-center gap-2.5">
        <span
          aria-hidden="true"
          className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
            variant === "yes"
              ? "bg-live/12 text-live"
              : dark
                ? "bg-white/[0.07] text-on-dark-muted"
                : "bg-paper text-muted"
          }`}
        >
          {variant === "yes" ? (
            <Check weight="bold" className="h-3 w-3" />
          ) : (
            <Minus weight="bold" className="h-3 w-3" />
          )}
        </span>
        <h3 className={`text-[15px] font-medium tracking-[-0.01em] ${head}`}>
          {side.title}
        </h3>
      </div>
      <ul className="mt-5 space-y-2.5">
        {side.items.map((it) => (
          <li
            key={it}
            className={`flex items-start gap-2.5 text-[14.5px] leading-relaxed ${bodyText}`}
          >
            <span
              aria-hidden="true"
              className={`mt-[8px] h-1 w-1 shrink-0 rounded-full ${
                variant === "yes"
                  ? "bg-live"
                  : dark
                    ? "bg-white/25"
                    : "bg-line-strong"
              }`}
            />
            {it}
          </li>
        ))}
      </ul>
    </div>
  );

  return (
    <div>
      {title ? (
        <p
          className={`font-mono text-2xs uppercase tracking-[0.16em] ${
            dark ? "text-on-dark-muted" : "text-muted"
          }`}
        >
          {title}
        </p>
      ) : null}
      <div
        className={`${title ? "mt-6" : ""} grid gap-10 border-t ${border} pt-8 md:grid-cols-2 md:gap-14`}
      >
        {col(left, "yes")}
        {col(right, "no")}
      </div>
    </div>
  );
}

/* =========================================================
   CALLOUT — a single framed aside. Used sparingly.
========================================================= */

export function Callout({
  title,
  children,
  dark = false,
}: {
  title: string;
  children: ReactNode;
  dark?: boolean;
}) {
  return (
    <aside
      className={`rounded-xl border-l-2 py-5 pl-6 pr-5 ${
        dark
          ? "border-l-accent-dark bg-white/[0.03]"
          : "border-l-accent bg-paper"
      }`}
    >
      <p
        className={`font-mono text-2xs uppercase tracking-[0.14em] ${
          dark ? "text-accent-dark" : "text-accent-strong"
        }`}
      >
        {title}
      </p>
      <div
        className={`mt-2.5 max-w-[62ch] text-[15px] leading-relaxed ${
          dark ? "text-on-dark" : "text-body"
        }`}
      >
        {children}
      </div>
    </aside>
  );
}

/* =========================================================
   FAQ — native details/summary. Keyboard accessible for free,
   and the answer text is always in the DOM, which is what makes
   FAQPage markup legitimate here.
========================================================= */

export function Faqs({
  items,
  dark = false,
}: {
  items: readonly { q: string; a: string }[];
  dark?: boolean;
}) {
  return (
    <Reveal
      as="ul"
      step={0.05}
      className={`divide-y border-y ${
        dark ? "divide-white/[0.07] border-white/[0.07]" : "divide-line border-line"
      }`}
    >
      {items.map((f) => (
        <motion.li key={f.q} variants={fadeUp}>
          <details className="group/faq">
            <summary
              className={`flex cursor-pointer list-none items-start justify-between gap-6 py-6 text-[17px] font-medium tracking-[-0.015em] transition-colors [&::-webkit-details-marker]:hidden ${
                dark
                  ? "text-white hover:text-accent-dark"
                  : "text-fg hover:text-accent-strong"
              }`}
            >
              <span className="max-w-[56ch]">{f.q}</span>
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition-colors ${
                  dark
                    ? "border-white/15 text-on-dark"
                    : "border-line-strong text-muted"
                }`}
              >
                <Plus
                  weight="bold"
                  className="h-3 w-3 transition-transform duration-300 group-open/faq:rotate-45"
                />
              </span>
            </summary>
            <p
              className={`max-w-[68ch] pb-7 text-[15px] leading-relaxed ${
                dark ? "text-on-dark" : "text-body"
              }`}
            >
              {f.a}
            </p>
          </details>
        </motion.li>
      ))}
    </Reveal>
  );
}

/* =========================================================
   INTEGRATION CHIPS
========================================================= */

export function IntegrationChips({
  items,
  dark = false,
}: {
  items: readonly string[];
  dark?: boolean;
}) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((i) => (
        <li
          key={i}
          className={`rounded-full border px-3.5 py-2 text-xs font-medium ${
            dark
              ? "border-white/10 bg-white/[0.04] text-on-dark"
              : "border-line bg-white text-body"
          }`}
        >
          {i}
        </li>
      ))}
    </ul>
  );
}

/* =========================================================
   METRIC SLOTS — case-study results.
   A slot without a verified value renders as pending. It is
   never dressed up as an achievement.
========================================================= */

export function MetricSlots({
  items,
  dark = false,
}: {
  items: {
    label: string;
    value?: string;
    verifiedOn?: string;
    method?: string;
  }[];
  dark?: boolean;
}) {
  return (
    <Reveal
      as="ul"
      step={0.06}
      className={`grid divide-y border-y sm:grid-cols-2 ${
        dark ? "divide-white/[0.07] border-white/[0.07]" : "divide-line border-line"
      }`}
    >
      {items.map((m, i) => {
        const verified = Boolean(m.value && m.verifiedOn);
        return (
          <motion.li
            key={m.label}
            variants={fadeUp}
            className={`py-7 ${i % 2 === 0 ? "sm:pr-10" : "sm:pl-10"} ${
              i % 2 === 1
                ? dark
                  ? "sm:border-l sm:border-white/[0.07]"
                  : "sm:border-l sm:border-line"
                : ""
            }`}
          >
            <p
              className={`font-mono text-[10px] uppercase tracking-[0.16em] ${
                dark ? "text-on-dark-muted" : "text-muted"
              }`}
            >
              {m.label}
            </p>

            {verified ? (
              <>
                <p
                  className={`tnum mt-2 text-3xl font-medium tracking-[-0.03em] ${
                    dark ? "text-white" : "text-fg"
                  }`}
                >
                  {m.value}
                </p>
                <p
                  className={`mt-1.5 font-mono text-[10px] uppercase tracking-[0.12em] ${
                    dark ? "text-on-dark-muted" : "text-muted"
                  }`}
                >
                  Verified {m.verifiedOn}
                </p>
              </>
            ) : (
              <p
                className={`mt-2.5 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${
                  dark
                    ? "border-white/10 bg-white/[0.03] text-on-dark-muted"
                    : "border-line bg-paper text-muted"
                }`}
              >
                Pending measurement
              </p>
            )}

            {m.method ? (
              <p
                className={`mt-3 max-w-[44ch] text-[13px] leading-relaxed ${
                  dark ? "text-on-dark-muted" : "text-muted"
                }`}
              >
                {m.method}
              </p>
            ) : null}
          </motion.li>
        );
      })}
    </Reveal>
  );
}

/* =========================================================
   RELATED — internal linking block. Prevents orphan pages.
========================================================= */

export function Related({
  groups,
  dark = false,
}: {
  groups: {
    title: string;
    links: { label: string; href: string; note?: string }[];
  }[];
  dark?: boolean;
}) {
  const visible = groups.filter((g) => g.links.length > 0);
  if (visible.length === 0) return null;

  return (
    <div className="grid gap-10 md:grid-cols-3 md:gap-12">
      {visible.map((g) => (
        <nav key={g.title} aria-label={g.title}>
          <h2
            className={`font-mono text-2xs uppercase tracking-[0.18em] ${
              dark ? "text-on-dark-muted" : "text-muted"
            }`}
          >
            {g.title}
          </h2>
          <ul
            className={`mt-5 divide-y border-t ${
              dark
                ? "divide-white/[0.07] border-white/[0.07]"
                : "divide-line border-line"
            }`}
          >
            {g.links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="group flex items-start justify-between gap-4 py-3.5"
                >
                  <span className="min-w-0">
                    <span
                      className={`block text-[15px] font-medium transition-colors ${
                        dark
                          ? "text-white group-hover:text-accent-dark"
                          : "text-fg group-hover:text-accent-strong"
                      }`}
                    >
                      {l.label}
                    </span>
                    {l.note ? (
                      <span
                        className={`mt-0.5 block text-[13px] leading-relaxed ${
                          dark ? "text-on-dark-muted" : "text-muted"
                        }`}
                      >
                        {l.note}
                      </span>
                    ) : null}
                  </span>
                  <ArrowUpRight
                    weight="bold"
                    aria-hidden="true"
                    className={`mt-1 h-3.5 w-3.5 shrink-0 opacity-0 transition-all duration-300 group-hover:opacity-100 ${
                      dark ? "text-white" : "text-fg"
                    }`}
                  />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ))}
    </div>
  );
}

/* =========================================================
   CONVERSATION — example agent dialogue
========================================================= */

export function Conversation({
  title,
  turns,
}: {
  title: string;
  turns: { who: string; line: string }[];
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2">
      <div className="flex items-center gap-2.5 border-b border-white/[0.07] px-6 py-4">
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 rounded-full bg-live"
        />
        <p className="font-mono text-2xs uppercase tracking-[0.14em] text-on-dark-muted">
          {title}
        </p>
      </div>
      <Reveal as="ol" step={0.06} className="space-y-4 p-6 sm:p-7">
        {turns.map((t, i) => {
          const isAgent = t.who.toLowerCase().includes("agent");
          return (
            <motion.li
              key={i}
              variants={fadeUp}
              className={`flex ${isAgent ? "justify-start" : "justify-end"}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-[14.5px] leading-relaxed sm:max-w-[74%] ${
                  isAgent
                    ? "rounded-bl-md border border-white/[0.08] bg-white/[0.04] text-on-dark"
                    : "rounded-br-md bg-accent/90 text-white"
                }`}
              >
                <span className="mb-1 block font-mono text-[9.5px] uppercase tracking-[0.14em] opacity-60">
                  {t.who}
                </span>
                {t.line}
              </div>
            </motion.li>
          );
        })}
      </Reveal>
    </div>
  );
}

/* =========================================================
   HEADING SHORTHAND for content pages
========================================================= */

export function ContentHeading({
  eyebrow,
  title,
  lede,
  invert = false,
  align = "left",
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  invert?: boolean;
  align?: "left" | "split";
}) {
  return (
    <Reveal amount={0.3}>
      <motion.div variants={fadeUp}>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          invert={invert}
          align={align}
        />
      </motion.div>
    </Reveal>
  );
}

export { Eyebrow };
