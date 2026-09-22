"use client";

import Image from "next/image";
import { memo, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import {
  Check,
  Phone,
  CalendarCheck,
  ArrowsClockwise,
  ChatCircleText,
  Lightning,
  Database,
  Sparkle,
} from "@phosphor-icons/react";
import { EASE, SPRING } from "./motion";
import { Tilt } from "./motion";

/* =========================================================
   AGENT CONSOLE — hero visual.
   A single looping "run": lead arrives → agent converses →
   logic decides → systems update → meeting booked.
   Isolated + memoized so its timers never re-render the page.
========================================================= */

const TRANSCRIPT = [
  { who: "lead", text: "Hi, I run a 12-person clinic. We miss calls after 6pm." },
  { who: "agent", text: "Understood. Do you use a booking system today?" },
  { who: "lead", text: "Google Calendar and a Zoho CRM." },
  { who: "agent", text: "Great — I can check availability and book directly. Thursday 10:30 works?" },
  { who: "lead", text: "Yes, that's fine." },
] as const;

const ACTIONS = [
  { label: "Intent captured", icon: ChatCircleText },
  { label: "Qualified: clinic, 12 staff", icon: Sparkle },
  { label: "Zoho CRM record updated", icon: Database },
  { label: "Calendar slot booked", icon: CalendarCheck },
  { label: "Confirmation sent", icon: Lightning },
];

type Phase = "incoming" | "talking" | "acting" | "done";

function useAgentLoop(active: boolean) {
  const [phase, setPhase] = useState<Phase>("incoming");
  const [line, setLine] = useState(0);
  const [done, setDone] = useState(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!active) return;
    if (reduce) {
      setPhase("done");
      setLine(TRANSCRIPT.length);
      setDone(ACTIONS.length);
      return;
    }

    let t: ReturnType<typeof setTimeout>;

    if (phase === "incoming") {
      t = setTimeout(() => setPhase("talking"), 1400);
    } else if (phase === "talking") {
      if (line < TRANSCRIPT.length) {
        t = setTimeout(() => setLine(line + 1), 1100);
      } else {
        t = setTimeout(() => setPhase("acting"), 500);
      }
    } else if (phase === "acting") {
      if (done < ACTIONS.length) {
        t = setTimeout(() => setDone(done + 1), 520);
      } else {
        t = setTimeout(() => setPhase("done"), 400);
      }
    } else {
      t = setTimeout(() => {
        setPhase("incoming");
        setLine(0);
        setDone(0);
      }, 4200);
    }
    return () => clearTimeout(t);
  }, [active, phase, line, done, reduce]);

  return { phase, line, done };
}

export const AgentConsole = memo(function AgentConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const { phase, line, done } = useAgentLoop(inView);

  return (
    <div ref={ref} className="relative w-full pb-8">
      {/* Panel */}
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/80 shadow-dark backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />

        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-accent/15 text-accent-dark">
              <Phone weight="fill" className="h-3.5 w-3.5" />
            </span>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-dark-muted">
                Live run
              </p>
              <p className="text-xs font-medium text-white">Inbound enquiry · AI agent</p>
            </div>
          </div>
          <PhasePill phase={phase} />
        </div>

        <div className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
          {/* Transcript */}
          <div className="min-h-[268px] space-y-3 border-b border-white/[0.06] p-5 md:border-b-0 md:border-r">
            <AnimatePresence initial={false}>
              {phase === "incoming" && (
                <motion.div
                  key="incoming"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="flex items-center gap-3 rounded-lg border border-white/[0.08] bg-white/[0.03] px-3.5 py-3"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-dark opacity-70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-dark" />
                  </span>
                  <span className="text-xs text-on-dark">
                    Incoming call · +91 98•• ••• 4127
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {TRANSCRIPT.slice(0, phase === "incoming" ? 0 : line).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={SPRING}
                className={`flex ${m.who === "agent" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-[12.5px] leading-relaxed ${
                    m.who === "agent"
                      ? "rounded-br-sm bg-accent text-white"
                      : "rounded-bl-sm border border-white/[0.08] bg-white/[0.04] text-on-dark"
                  }`}
                >
                  {m.text}
                </div>
              </motion.div>
            ))}

            {phase === "talking" && line < TRANSCRIPT.length && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`flex ${
                  TRANSCRIPT[line].who === "agent" ? "justify-end" : "justify-start"
                }`}
              >
                <span className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-white/[0.04] px-3 py-2">
                  {[0, 1, 2].map((d) => (
                    <motion.span
                      key={d}
                      className="h-1 w-1 rounded-full bg-on-dark"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 1, repeat: Infinity, delay: d * 0.18 }}
                    />
                  ))}
                </span>
              </motion.div>
            )}
          </div>

          {/* Actions */}
          <div className="p-5">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-dark-muted">
              Actions
            </p>
            <ul className="mt-3 space-y-2">
              {ACTIONS.map((a, i) => {
                const isDone = i < done;
                const isNext = i === done && phase === "acting";
                const Icon = a.icon;
                return (
                  <li
                    key={a.label}
                    className={`flex items-center gap-2.5 rounded-lg border px-3 py-2 text-xs transition-colors duration-500 ${
                      isDone
                        ? "border-live/25 bg-live/[0.08] text-white"
                        : "border-white/[0.06] bg-transparent text-on-dark-muted"
                    } ${isNext ? "shimmer" : ""}`}
                  >
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md ${
                        isDone ? "bg-live text-white" : "bg-white/[0.06]"
                      }`}
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        {isDone ? (
                          <motion.span
                            key="check"
                            initial={{ scale: 0.4, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ type: "spring", stiffness: 500, damping: 22 }}
                          >
                            <Check weight="bold" className="h-3 w-3" />
                          </motion.span>
                        ) : (
                          <motion.span key="icon" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <Icon className="h-3 w-3" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                    <span className="truncate">{a.label}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Footer metrics */}
        <div className="grid grid-cols-3 divide-x divide-white/[0.06] border-t border-white/[0.06]">
          {[
            ["Response", "0.8s"],
            ["Duration", "1m 42s"],
            ["Outcome", phase === "done" ? "Booked" : "—"],
          ].map(([k, v]) => (
            <div key={k} className="px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-dark-muted">
                {k}
              </p>
              <p className="tnum mt-0.5 font-mono text-sm text-white">{v}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Toast — overshoot spring */}
      <AnimatePresence>
        {phase === "done" && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ type: "spring", stiffness: 420, damping: 18 }}
            className="absolute -bottom-7 left-1/2 flex w-max -translate-x-1/2 items-center gap-3 rounded-xl border border-white/10 bg-white px-4 py-3 text-fg shadow-lift sm:left-auto sm:right-6 sm:translate-x-0"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-live/10 text-live">
              <CalendarCheck weight="fill" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-xs font-semibold">Meeting booked</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                Thu · 10:30 · Zoho synced
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

function PhasePill({ phase }: { phase: Phase }) {
  const map: Record<Phase, { label: string; cls: string }> = {
    incoming: { label: "Ringing", cls: "text-accent-dark border-accent/30 bg-accent/10" },
    talking: { label: "In conversation", cls: "text-accent-dark border-accent/30 bg-accent/10" },
    acting: { label: "Executing", cls: "text-[#f0c36b] border-warn/30 bg-warn/10" },
    done: { label: "Complete", cls: "text-[#5fd39e] border-live/30 bg-live/10" },
  };
  const m = map[phase];
  return (
    <motion.span
      key={phase}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] ${m.cls}`}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-60" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {m.label}
    </motion.span>
  );
}

/* =========================================================
   SYSTEM FLOW — Conversations → Logic → Data → Actions
   SVG path draws with scroll; a pulse travels the route.
========================================================= */

const NODES = [
  {
    key: "conversations",
    title: "Conversations",
    body: "Calls, WhatsApp, chat, email, forms.",
    icon: ChatCircleText,
    detail: ["Voice", "Chat", "Email", "Forms"],
  },
  {
    key: "logic",
    title: "Business logic",
    body: "Qualification, routing, rules, decisions.",
    icon: Sparkle,
    detail: ["Qualify", "Route", "Decide", "Approve"],
  },
  {
    key: "data",
    title: "Data",
    body: "CRM, calendars, databases, knowledge.",
    icon: Database,
    detail: ["CRM", "Calendar", "DB", "Docs"],
  },
  {
    key: "actions",
    title: "Actions",
    body: "Bookings, updates, follow-ups, tasks.",
    icon: Lightning,
    detail: ["Book", "Update", "Notify", "Assign"],
  },
];

export function SystemFlow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 60%"],
  });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const pulseX = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={ref} className="relative">
      {/* Route line — desktop */}
      <div className="pointer-events-none absolute inset-x-0 top-[26px] hidden h-px lg:block">
        <svg className="h-full w-full overflow-visible" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0.5" x2="100%" y2="0.5" stroke="rgba(255,255,255,0.08)" />
          <motion.line
            x1="0"
            y1="0.5"
            x2="100%"
            y2="0.5"
            stroke="#6d9bff"
            strokeWidth="1.5"
            style={{ pathLength }}
          />
        </svg>
        <motion.span
          className="absolute -top-[3px] h-[7px] w-[7px] rounded-full bg-white shadow-[0_0_0_4px_rgba(109,155,255,0.25)]"
          style={{ left: pulseX }}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-4 lg:gap-6">
        {NODES.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.12 }}
              className="relative"
            >
              {/* Node */}
              <div className="relative z-10 flex h-[52px] w-[52px] items-center justify-center rounded-xl border border-white/10 bg-ink text-accent-dark shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                <motion.span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-xl border border-accent-dark/40"
                  animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.6 }}
                />
                <Icon className="h-5 w-5" />
              </div>

              <p className="mt-6 font-mono text-2xs uppercase tracking-[0.16em] text-on-dark-muted">
                0{i + 1}
              </p>
              <h3 className="mt-2 text-lg font-medium tracking-[-0.01em] text-white">
                {n.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-on-dark">{n.body}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {n.detail.map((d, j) => (
                  <motion.li
                    key={d}
                    className="rounded-md border border-white/[0.08] bg-white/[0.03] px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-on-dark"
                    animate={{ opacity: [0.55, 1, 0.55] }}
                    transition={{
                      duration: 3.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.4 + j * 0.25,
                    }}
                  >
                    {d}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   VOICE WAVE — perpetual bars
========================================================= */

export const VoiceWave = memo(function VoiceWave({
  bars = 28,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  return (
    <div className={`flex h-12 items-center gap-[3px] ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const base = 0.25 + Math.abs(Math.sin(i * 0.9)) * 0.75;
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-accent-dark"
            style={{ height: "100%", transformOrigin: "center" }}
            animate={{ scaleY: [base * 0.3, base, base * 0.45, base * 0.9, base * 0.3] }}
            transition={{
              duration: 1.6 + (i % 5) * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: (i % 7) * 0.08,
            }}
          />
        );
      })}
    </div>
  );
});

/* =========================================================
   DEVICE — dashboard in a tilting browser frame
========================================================= */

export function Device({
  src,
  alt,
  className = "",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <Tilt className={`rounded-2xl ${className}`} max={5}>
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-2 shadow-dark">
        <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="ml-3 h-5 flex-1 rounded-md bg-white/[0.05]" />
        </div>
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          priority={priority}
          sizes="(max-width: 1023px) 100vw, 55vw"
          className="h-auto w-full"
        />
      </div>
    </Tilt>
  );
}

/* =========================================================
   SYNC ORBIT — integrations orbit a core (about / services)
========================================================= */

export const SyncOrbit = memo(function SyncOrbit({ items }: { items: string[] }) {
  const ring1 = items.slice(0, 6);
  const ring2 = items.slice(6, 14);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      {/* Core */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-ink text-accent-dark shadow-dark">
        <ArrowsClockwise className="h-7 w-7" />
        <motion.span
          className="absolute inset-0 rounded-2xl border border-accent-dark/40"
          animate={{ scale: [1, 1.5], opacity: [0.5, 0] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeOut" }}
        />
      </div>

      {[
        { r: "62%", items: ring1, dur: 40, dir: 1 },
        { r: "92%", items: ring2, dur: 70, dir: -1 },
      ].map((ring, ri) => (
        <motion.div
          key={ri}
          className="absolute left-1/2 top-1/2 rounded-full border border-dashed border-white/10"
          style={{ width: ring.r, height: ring.r, x: "-50%", y: "-50%" }}
          animate={{ rotate: 360 * ring.dir }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
        >
          {ring.items.map((it, i) => {
            const angle = (i / ring.items.length) * 360;
            return (
              <div
                key={it}
                className="absolute left-1/2 top-1/2 h-0 w-1/2 origin-left"
                style={{ transform: `rotate(${angle}deg)` }}
              >
                <div
                  className="absolute right-0 top-0"
                  style={{ transform: `translate(50%, -50%) rotate(${-angle}deg)` }}
                >
                  <motion.span
                    className="block whitespace-nowrap rounded-full border border-white/10 bg-ink-2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-on-dark"
                    animate={{ rotate: -360 * ring.dir }}
                    transition={{ duration: ring.dur, repeat: Infinity, ease: "linear" }}
                  >
                    {it}
                  </motion.span>
                </div>
              </div>
            );
          })}
        </motion.div>
      ))}
    </div>
  );
});
