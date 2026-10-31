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
  ArrowsClockwise,
  ChatCircleText,
  Lightning,
  Database,
  Circuitry,
} from "@phosphor-icons/react";
import { EASE } from "./motion";

/* =========================================================
   AGENT CONSOLE - the hero visual, and the one bright thing
   on the page.

   A single run: a lead arrives, the agent talks, the systems
   update, the meeting is booked. Everything around it on the page
   is quiet so this reads first.

   Ember appears here in exactly two places, and both mean the same
   thing - the path the work travels: the 2px edge marking which
   side of the transcript is the agent, and the rail the actions
   complete down. Nothing glows, nothing pings, nothing shimmers.

   Isolated + memoized so its timers never re-render the page.
========================================================= */

const TRANSCRIPT = [
  { who: "lead", text: "Hi, I run a 12-person clinic. We miss calls after 6pm." },
  { who: "agent", text: "Understood. Do you use a booking system today?" },
  { who: "lead", text: "Google Calendar and a Zoho CRM." },
  { who: "agent", text: "I can check availability and book directly. Does Thursday 10:30 work?" },
  { who: "lead", text: "Yes, that's fine." },
] as const;

const ACTIONS = [
  "Intent captured",
  "Qualified: clinic, 12 staff",
  "Zoho CRM record updated",
  "Calendar slot booked",
  "Confirmation sent",
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

const PHASE_LABEL: Record<Phase, string> = {
  incoming: "Ringing",
  talking: "In conversation",
  acting: "Executing",
  done: "Complete",
};

export const AgentConsole = memo(function AgentConsole() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-10% 0px" });
  const { phase, line, done } = useAgentLoop(inView);

  return (
    <div ref={ref} className="relative w-full">
      <div className="relative overflow-hidden rounded-2xl border border-line-strong bg-ink-2 shadow-dark">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-ink-3 text-body">
              <Phone className="h-4 w-4" />
            </span>
            <div>
              <p className="text-[13px] font-medium text-fg">
                Inbound enquiry, AI agent
              </p>
              <p className="serial mt-0.5 font-mono text-2xs text-muted">
                Sample run
              </p>
            </div>
          </div>
          <span className="flex items-center gap-2 font-mono text-2xs text-muted">
            <span
              aria-hidden="true"
              className={`h-1.5 w-1.5 shrink-0 rounded-full ${
                phase === "done" ? "bg-live" : "bg-accent"
              }`}
            />
            {PHASE_LABEL[phase]}
          </span>
        </div>

        <div className="grid gap-0 md:grid-cols-[1.25fr_1fr]">
          {/* Transcript */}
          <div
            data-chat
            className="min-h-[280px] space-y-3 border-b border-line p-5 md:border-b-0 md:border-r"
          >
            <AnimatePresence initial={false}>
              {phase === "incoming" && (
                <motion.div
                  key="incoming"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="flex items-center gap-2.5 rounded-lg border border-line bg-ink px-3.5 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span className="text-[13px] text-body">Incoming call</span>
                </motion.div>
              )}
            </AnimatePresence>

            {TRANSCRIPT.slice(0, phase === "incoming" ? 0 : line).map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
                className={`flex ${
                  m.who === "agent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] rounded-lg px-3.5 py-2.5 text-[13px] leading-relaxed ${
                    m.who === "agent"
                      ? "border-r-2 border-accent bg-ink-3 text-fg"
                      : "border border-line bg-ink text-body"
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
                transition={{ duration: 0.2, ease: EASE }}
                className={`flex ${
                  TRANSCRIPT[line].who === "agent"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <span className="inline-flex items-center gap-1 rounded-lg border border-line bg-ink px-3 py-2">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      aria-hidden="true"
                      className="h-1 w-1 rounded-full bg-muted"
                    />
                  ))}
                </span>
              </motion.div>
            )}
          </div>

          {/*
            Actions. The ember rail is the route the work travels: it
            fills to the step the run has reached, which is the only
            thing on this panel that moves for a reason.
          */}
          <div className="p-5">
            <p className="text-[13px] font-medium text-fg">Actions</p>

            <ol className="relative mt-4 pl-5">
              <span
                aria-hidden="true"
                className="absolute bottom-1 left-[3px] top-1 w-px bg-line-strong"
              />
              <motion.span
                aria-hidden="true"
                className="absolute left-[3px] top-1 w-px origin-top bg-accent"
                style={{ bottom: 4 }}
                animate={{ scaleY: done / ACTIONS.length }}
                transition={{ duration: 0.4, ease: EASE }}
              />
              {ACTIONS.map((label, i) => {
                const isDone = i < done;
                return (
                  <li
                    key={label}
                    className="relative flex h-10 items-center gap-2.5"
                  >
                    <span
                      aria-hidden="true"
                      className={`absolute -left-5 h-[7px] w-[7px] rounded-full transition-colors duration-300 ${
                        isDone ? "bg-accent" : "bg-ink-3 ring-1 ring-line-strong"
                      }`}
                    />
                    <span
                      className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-md transition-colors duration-300 ${
                        isDone ? "bg-ink-3 text-fg" : "bg-transparent text-muted"
                      }`}
                    >
                      {isDone ? (
                        <Check className="h-3 w-3" />
                      ) : (
                        <span className="serial font-mono text-[10px]">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                      )}
                    </span>
                    <span
                      className={`truncate text-[13px] transition-colors duration-300 ${
                        isDone ? "text-fg" : "text-muted"
                      }`}
                    >
                      {label}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>

        {/* Footer metrics */}
        <div className="grid grid-cols-3 divide-x divide-line border-t border-line">
          {[
            ["Response", "0.8s"],
            ["Duration", "1m 42s"],
            ["Outcome", phase === "done" ? "Booked" : "—"],
          ].map(([k, v]) => (
            <div key={k} className="px-4 py-3.5">
              <p className="text-2xs text-muted">{k}</p>
              <p
                className={`tnum mt-1 font-mono text-sm ${
                  k === "Outcome" && phase === "done" ? "text-fg" : "text-body"
                }`}
              >
                {v}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

/* =========================================================
   SYSTEM FLOW - Conversations, logic, data, actions.

   The same route as the console rail, laid flat: one ember line
   drawn with scroll, four stations along it. The line drawing IS
   the explanation, so it stays; the ring pulses and the chips
   breathing on their own offsets did not explain anything and are
   gone.
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
    icon: Circuitry,
    detail: ["Qualify", "Route", "Decide", "Approve"],
  },
  {
    key: "data",
    title: "Data",
    body: "CRM, calendars, databases, knowledge.",
    icon: Database,
    detail: ["CRM", "Calendar", "Database", "Docs"],
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
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="relative">
      {/* The route - desktop */}
      <div className="pointer-events-none absolute inset-x-0 top-[24px] hidden h-px bg-line-strong lg:block">
        <motion.div
          className="h-full origin-left bg-accent"
          style={{ scaleX }}
        />
      </div>

      <div className="grid gap-10 lg:grid-cols-4 lg:gap-8">
        {NODES.map((n, i) => {
          const Icon = n.icon;
          return (
            <motion.div
              key={n.key}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.4, ease: EASE, delay: i * 0.05 }}
              className="relative"
            >
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-xl border border-line-strong bg-ink-2 text-body">
                <Icon className="h-[18px] w-[18px]" />
              </div>

              <p className="serial mt-6 font-mono text-xs text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-medium tracking-[-0.01em] text-fg">
                {n.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-body">{n.body}</p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {n.detail.map((d) => (
                  <li
                    key={d}
                    className="rounded-md border border-line bg-ink-2 px-2 py-1 text-2xs text-muted"
                  >
                    {d}
                  </li>
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
   VOICE WAVE - the call demo on /leadpulz.

   Kept moving because it depicts a live call, which is the thing
   the page is about. Calmed: fewer bars, one neutral colour, a
   slower cycle, and it holds still for reduced motion.
========================================================= */

export const VoiceWave = memo(function VoiceWave({
  bars = 24,
  className = "",
}: {
  bars?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <div className={`flex h-10 items-center gap-1 ${className}`} aria-hidden="true">
      {Array.from({ length: bars }).map((_, i) => {
        const base = 0.3 + Math.abs(Math.sin(i * 0.9)) * 0.7;
        return (
          <motion.span
            key={i}
            className="w-[3px] rounded-full bg-muted"
            style={{ height: "100%", transformOrigin: "center" }}
            animate={
              reduce
                ? { scaleY: base * 0.6 }
                : { scaleY: [base * 0.35, base, base * 0.5, base * 0.35] }
            }
            transition={
              reduce
                ? { duration: 0 }
                : {
                    duration: 2 + (i % 5) * 0.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: (i % 7) * 0.08,
                  }
            }
          />
        );
      })}
    </div>
  );
});

/* =========================================================
   DEVICE - a screenshot in a browser frame
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
    <div
      className={`overflow-hidden rounded-2xl border border-line-strong bg-ink-2 shadow-dark ${className}`}
    >
      <div className="flex items-center gap-2 border-b border-line px-4 py-3">
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="h-2 w-2 rounded-full bg-line-strong" />
        <span className="ml-3 h-5 flex-1 rounded-md bg-ink" />
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
  );
}

/* =========================================================
   SYNC ORBIT - the integrations a system connects to.

   Was two rings counter-rotating forever, with every label
   rotating back the other way to stay upright. It is a diagram,
   so it now holds still and can actually be read.
========================================================= */

export const SyncOrbit = memo(function SyncOrbit({ items }: { items: string[] }) {
  const ring1 = items.slice(0, 6);
  const ring2 = items.slice(6, 14);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]" aria-hidden="true">
      {/* Core */}
      <div className="absolute left-1/2 top-1/2 z-10 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-xl border border-line-strong bg-ink-2 text-body">
        <ArrowsClockwise className="h-6 w-6" />
      </div>

      {[
        { r: "62%", items: ring1 },
        { r: "92%", items: ring2 },
      ].map((ring, ri) => (
        <div
          key={ri}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line"
          style={{ width: ring.r, height: ring.r }}
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
                  <span className="block whitespace-nowrap rounded-md border border-line bg-ink-2 px-2.5 py-1 text-2xs text-body">
                    {it}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
});
