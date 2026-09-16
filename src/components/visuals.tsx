"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";

/* ============================================================
   DESIGN TOKENS — exported for cross-page reuse
============================================================ */

export type Tone =
  | "violet"
  | "indigo"
  | "cyan"
  | "emerald"
  | "amber"
  | "rose"
  | "slate";

export const TONES: Record<
  Tone,
  {
    bg: string;
    ring: string;
    text: string;
    dot: string;
    glow: string;
    gradient: string;
  }
> = {
  violet: {
    bg: "bg-violet-50",
    ring: "border-violet-200/70",
    text: "text-violet-700",
    dot: "bg-violet-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(139,92,246,0.35)]",
    gradient: "from-[#8B5CF6] to-[#4F6BFF]",
  },
  indigo: {
    bg: "bg-indigo-50",
    ring: "border-indigo-200/70",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(79,107,255,0.35)]",
    gradient: "from-[#4F6BFF] to-[#8B5CF6]",
  },
  cyan: {
    bg: "bg-cyan-50",
    ring: "border-cyan-200/70",
    text: "text-cyan-700",
    dot: "bg-cyan-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(6,182,212,0.35)]",
    gradient: "from-[#06B6D4] to-[#4F6BFF]",
  },
  emerald: {
    bg: "bg-emerald-50",
    ring: "border-emerald-200/70",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(16,185,129,0.35)]",
    gradient: "from-[#10B981] to-[#06B6D4]",
  },
  amber: {
    bg: "bg-amber-50",
    ring: "border-amber-200/70",
    text: "text-amber-700",
    dot: "bg-amber-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(245,158,11,0.35)]",
    gradient: "from-[#F59E0B] to-[#F472B6]",
  },
  rose: {
    bg: "bg-rose-50",
    ring: "border-rose-200/70",
    text: "text-rose-700",
    dot: "bg-rose-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(244,114,182,0.35)]",
    gradient: "from-[#F472B6] to-[#8B5CF6]",
  },
  slate: {
    bg: "bg-slate-50",
    ring: "border-slate-200/70",
    text: "text-slate-700",
    dot: "bg-slate-500",
    glow: "shadow-[0_20px_50px_-24px_rgba(100,116,139,0.3)]",
    gradient: "from-slate-500 to-slate-700",
  },
};

/* ============================================================
   SHARED PRIMITIVES
============================================================ */

function LivePulse({ tone = "emerald" }: { tone?: Tone }) {
  const t = TONES[tone];
  return (
    <span className="relative flex h-1.5 w-1.5">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 ${t.dot}`}
      />
      <span className={`relative inline-flex h-1.5 w-1.5 rounded-full ${t.dot}`} />
    </span>
  );
}

function CornerGlow({ tone }: { tone: Tone }) {
  const t = TONES[tone];
  return (
    <div
      className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${t.gradient} opacity-[0.08] blur-3xl`}
    />
  );
}

/* ============================================================
   HERO MOCKUP
============================================================ */

const PIPELINE: {
  label: string;
  meta: string;
  tone: Tone;
  icon: ReactNode;
}[] = [
  {
    label: "New Lead",
    meta: "Inbound call",
    tone: "slate",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.25 1L7.6 9.4a12.5 12.5 0 0 0 6 6l1.42-1.48a1 1 0 0 1 1-.25l3.3 1.1a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5Z"
        />
      </svg>
    ),
  },
  {
    label: "AI Agent",
    meta: "Engaging",
    tone: "violet",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M12 3v2m6.36 1.64-1.41 1.41M21 12h-2M4 12H3m3.34-5.66L4.93 4.93M12 19a5 5 0 0 0 5-5v-1a5 5 0 0 0-10 0v1a5 5 0 0 0 5 5Zm0 0v2"
        />
      </svg>
    ),
  },
  {
    label: "Qualified",
    meta: "Score 87",
    tone: "emerald",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.9}
          d="M5 13l4 4L19 7"
        />
      </svg>
    ),
  },
  {
    label: "CRM Sync",
    meta: "Record updated",
    tone: "cyan",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M4 4v6h6M20 20v-6h-6M20 9a8 8 0 0 0-14.9-3M4 15a8 8 0 0 0 14.9 3"
        />
      </svg>
    ),
  },
  {
    label: "Appointment",
    meta: "Thu · 09:30",
    tone: "rose",
    icon: (
      <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M8 3v3m8-3v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
        />
      </svg>
    ),
  },
];

const EVENTS = [
  { label: "Lead qualified", time: "now", tone: "emerald" as Tone },
  { label: "CRM updated", time: "12s", tone: "cyan" as Tone },
  { label: "Meeting booked", time: "1m", tone: "violet" as Tone },
  { label: "Follow-up scheduled", time: "1m", tone: "rose" as Tone },
];

export function HeroMockup() {
  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white p-4 shadow-[0_30px_80px_-30px_rgba(15,27,61,0.18)] sm:p-5 md:p-6">
      <CornerGlow tone="violet" />
      <CornerGlow tone="cyan" />

      {/* Header */}
      <div className="relative flex flex-wrap items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-white shadow-[0_8px_24px_-8px_rgba(79,107,255,0.7)]">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div className="min-w-0 leading-tight">
          <p className="text-[13px] font-semibold text-slate-900">
            Automation run
          </p>
          <p className="text-[11.5px] text-slate-500">
            Inbound lead pipeline
          </p>
        </div>
        <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
          <LivePulse tone="emerald" />
          Live
        </span>
      </div>

      {/* Pipeline */}
      <ol className="relative mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-5">
        {PIPELINE.map((step, i) => {
          const t = TONES[step.tone];
          return (
            <li key={step.label} className="relative">
              <div
                className={`group h-full rounded-2xl border bg-white p-3.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_-20px_rgba(15,27,61,0.2)] ${t.ring}`}
              >
                <div className="mb-3 flex items-center justify-between">
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-lg ${t.bg} ${t.text}`}
                  >
                    {step.icon}
                  </span>
                  <span className="text-[10px] font-semibold tabular-nums tracking-widest text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-[13px] font-semibold leading-tight text-slate-900">
                  {step.label}
                </p>
                <p className="mt-1 text-[11.5px] text-slate-500">
                  {step.meta}
                </p>
              </div>

              {i < PIPELINE.length - 1 && (
                <svg
                  className="absolute -right-2.5 top-1/2 hidden -translate-y-1/2 lg:block"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h13m-5-5 5 5-5 5"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </li>
          );
        })}
      </ol>

      {/* Event feed */}
      <div className="mt-5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
        {EVENTS.map((e) => {
          const t = TONES[e.tone];
          return (
            <div
              key={e.label}
              className="flex items-center gap-2.5 rounded-xl border border-slate-200/70 bg-slate-50/60 px-3 py-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_10px_24px_-12px_rgba(15,27,61,0.15)]"
            >
              <span
                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${t.bg} ${t.text}`}
              >
                <svg
                  className="h-3 w-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.4}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </span>
              <span className="truncate text-[12.5px] font-medium text-slate-800">
                {e.label}
              </span>
              <span className="ml-auto whitespace-nowrap text-[11px] tabular-nums text-slate-400">
                {e.time}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   ARCHITECTURE STACK
============================================================ */

const LAYERS: {
  title: string;
  subtitle: string;
  tone: Tone;
  icon: ReactNode;
  items: string[];
}[] = [
  {
    title: "Conversations",
    subtitle: "Where it starts",
    tone: "violet",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.86 9.86 0 0 1-4-.8L3 21l1.6-4.8A7.9 7.9 0 0 1 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8Z"
        />
      </svg>
    ),
    items: ["Calls", "WhatsApp", "Web Chat", "Email", "Forms"],
  },
  {
    title: "Business Logic",
    subtitle: "How it thinks",
    tone: "indigo",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M12 3v2m6.36 1.64-1.41 1.41M21 12h-2M4 12H3m3.34-5.66L4.93 4.93M12 21v-2m6.36-1.64-1.41-1.41M4.93 19.07l1.41-1.41M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z"
        />
      </svg>
    ),
    items: ["Qualification", "Routing", "Rules", "AI Decisions", "Automations"],
  },
  {
    title: "Data",
    subtitle: "What it knows",
    tone: "cyan",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M4 7c0-1.66 3.58-3 8-3s8 1.34 8 3-3.58 3-8 3-8-1.34-8-3Zm0 0v10c0 1.66 3.58 3 8 3s8-1.34 8-3V7M4 12c0 1.66 3.58 3 8 3s8-1.34 8-3"
        />
      </svg>
    ),
    items: ["CRM", "Databases", "ERP", "Knowledge Base", "Analytics"],
  },
  {
    title: "Actions",
    subtitle: "What it does",
    tone: "emerald",
    icon: (
      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.7}
          d="M13 10V3L4 14h7v7l9-11h-7z"
        />
      </svg>
    ),
    items: [
      "Book Meetings",
      "Update CRM",
      "Send Follow-ups",
      "Create Tasks",
      "Trigger Workflows",
    ],
  },
];

export function ArchitectureStack() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {LAYERS.map((layer, i) => {
        const t = TONES[layer.tone];
        return (
          <div key={layer.title} className="relative">
            <div
              className={`group relative h-full overflow-hidden rounded-2xl border bg-white p-5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_60px_-24px_rgba(15,27,61,0.22)] ${t.ring}`}
            >
              <CornerGlow tone={layer.tone} />

              <div className="relative">
                <div className="flex items-start justify-between">
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-white shadow-[0_10px_26px_-10px_rgba(79,107,255,0.5)]`}
                  >
                    {layer.icon}
                  </span>
                  <span className="text-[10px] font-semibold tabular-nums tracking-widest text-slate-400">
                    L{i + 1}
                  </span>
                </div>

                <h3 className="mt-5 text-[13px] font-semibold uppercase tracking-[0.14em] text-slate-900">
                  {layer.title}
                </h3>
                <p className={`mt-0.5 text-[11.5px] ${t.text}`}>
                  {layer.subtitle}
                </p>

                <ul className="mt-4 space-y-1.5">
                  {layer.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50/60 px-2.5 py-1.5 text-[12.5px] text-slate-700 transition-colors hover:border-slate-200 hover:bg-white"
                    >
                      <span className={`h-1 w-1 shrink-0 rounded-full ${t.dot}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {i < LAYERS.length - 1 && (
              <>
                <svg
                  className="mx-auto my-1 block lg:hidden"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 5v13m-5-5 5 5 5-5"
                    stroke="#94A3B8"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <svg
                  className="absolute -right-3 top-1/2 hidden -translate-y-1/2 lg:block"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M5 12h13m-5-5 5 5-5 5"
                    stroke="#94A3B8"
                    strokeWidth="1.9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ============================================================
   LEADPULZ DASHBOARD
============================================================ */

function Metric({
  label,
  value,
  delta,
  tone,
  icon,
}: {
  label: string;
  value: string;
  delta: string;
  tone: Tone;
  icon: ReactNode;
}) {
  const t = TONES[tone];
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-20px_rgba(15,27,61,0.18)]">
      <div className="flex items-center justify-between">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${t.bg} ${t.text}`}
        >
          {icon}
        </span>
        <span className={`text-[10.5px] font-semibold ${t.text}`}>{delta}</span>
      </div>
      <p className="mt-3 text-[11px] font-medium uppercase tracking-wider text-slate-500">
        {label}
      </p>
      <p className="mt-0.5 text-2xl font-light tabular-nums leading-none text-slate-900">
        {value}
      </p>
    </div>
  );
}

function Sparkline({ bars, tone }: { bars: number[]; tone: Tone }) {
  const t = TONES[tone];
  return (
    <div className="flex h-14 items-end gap-1" role="img" aria-label="Activity trend">
      {bars.map((h, i) => (
        <motion.span
          key={i}
          initial={{ height: "10%" }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{
            duration: 0.6,
            delay: i * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={`block flex-1 rounded-sm bg-gradient-to-t ${t.gradient} opacity-70`}
        />
      ))}
    </div>
  );
}

export function LeadPulzDashboard() {
  const spark = [42, 58, 36, 74, 52, 88, 46, 68, 40, 82, 56, 76];
  const bars = [40, 75, 30, 90, 55, 70, 38, 84, 46, 66, 28, 88, 52, 74, 36];

  return (
    <div className="relative w-full rounded-3xl bg-gradient-to-br from-[#0A1330] to-[#1A2340] p-1.5 shadow-[0_40px_100px_-40px_rgba(15,27,61,0.5)]">
      <div className="relative overflow-hidden rounded-[20px] bg-white p-4 sm:p-5">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[#4F6BFF]/10 blur-3xl" />

        {/* Header */}
        <div className="relative mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-white shadow-[0_8px_20px_-6px_rgba(79,107,255,0.6)]">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M4 19h16M7 16V8m5 8V5m5 11v-6"
                />
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-[13px] font-semibold text-slate-900">
                LeadPulz overview
              </p>
              <p className="text-[11px] text-slate-500">Last 24 hours</p>
            </div>
          </div>
          <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
            Sample
          </span>
        </div>

        {/* Metrics */}
        <div className="relative grid grid-cols-2 gap-3">
          <Metric
            label="Today's Calls"
            value="128"
            delta="+12%"
            tone="violet"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 5a2 2 0 0 1 2-2h2.28a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.25 1L7.6 9.4a12.5 12.5 0 0 0 6 6l1.42-1.48a1 1 0 0 1 1-.25l3.3 1.1a1 1 0 0 1 .68.95V19a2 2 0 0 1-2 2A16 16 0 0 1 3 5Z"
                />
              </svg>
            }
          />
          <Metric
            label="Qualified Leads"
            value="43"
            delta="+8%"
            tone="emerald"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            }
          />
          <Metric
            label="Appointments"
            value="18"
            delta="+5%"
            tone="cyan"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M8 3v3m8-3v3M3 9h18M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z"
                />
              </svg>
            }
          />
          <Metric
            label="Qualification Rate"
            value="67%"
            delta="+3%"
            tone="indigo"
            icon={
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.8}
                  d="M3 17l6-6 4 4 8-8m0 0h-5m5 0v5"
                />
              </svg>
            }
          />
        </div>

        {/* Sparkline */}
        <div className="relative mt-4 rounded-2xl border border-slate-200/70 bg-slate-50/50 p-4">
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              Call volume
            </p>
            <p className="text-[11px] text-slate-400">Past 12 hours</p>
          </div>
          <Sparkline bars={spark} tone="violet" />
        </div>

        {/* Active call */}
        <div className="relative mt-4 rounded-2xl border border-slate-200/70 bg-white p-4 transition-all duration-300 hover:shadow-[0_16px_40px_-20px_rgba(15,27,61,0.18)]">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-[12px] font-semibold text-white shadow-[0_8px_20px_-6px_rgba(79,107,255,0.6)]">
              <span className="relative z-10">S</span>
              <span className="absolute inset-0 animate-pulse rounded-full bg-[#4F6BFF]/20" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-slate-900">
                AI Agent · Sarah
                <span className="inline-flex items-center gap-1 text-[10.5px] font-medium text-emerald-600">
                  <LivePulse tone="emerald" />
                  Live
                </span>
              </p>
              <p className="mt-0.5 text-[11.5px] tabular-nums text-slate-500">
                Call duration · 04:32
              </p>
            </div>
            <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1 w-1 rounded-full bg-emerald-500" />
              Qualified
            </span>
          </div>

          {/* Waveform */}
          <div
            className="my-4 flex h-10 items-center gap-[2px]"
            role="img"
            aria-label="Call waveform"
          >
            {bars.slice(0, 12).map((h, i) => (
              <motion.span
                key={i}
                animate={{
                  height: [`${Math.max(h - 12, 15)}%`, `${h}%`, `${Math.max(h - 6, 20)}%`],
                }}
                transition={{
                  duration: 0.9 + (i % 4) * 0.15,
                  repeat: Infinity,
                  repeatType: "mirror",
                  ease: "easeInOut",
                }}
                className="block w-[3px] rounded-full bg-gradient-to-t from-[#4F6BFF]/30 to-[#4F6BFF]/70"
              />
            ))}
          </div>

          {/* Detail rows */}
          <div className="divide-y divide-slate-100">
            {[
              { label: "Lead status", value: "Qualified" },
              { label: "Intent", value: "Product Demo" },
              { label: "Action", value: "Meeting booked" },
            ].map((row) => (
              <div
                key={row.label}
                className="flex items-center justify-between py-2.5"
              >
                <span className="text-[12.5px] text-slate-500">
                  {row.label}
                </span>
                <span className="text-[12.5px] font-medium text-slate-900">
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div className="mt-4 flex flex-wrap gap-2">
            {[
              {
                label: "Transcript",
                icon: (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M8 7h8M8 11h8M8 15h5M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
                    />
                  </svg>
                ),
              },
              {
                label: "Summary",
                icon: (
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.8}
                      d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2M9 5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2M9 5a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2"
                    />
                  </svg>
                ),
              },
            ].map((tag) => (
              <span
                key={tag.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] text-slate-600 transition-colors hover:border-slate-300 hover:bg-white"
              >
                {tag.icon}
                {tag.label}
              </span>
            ))}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#4F6BFF]/10 px-2.5 py-1 text-[11px] font-medium text-[#4F6BFF] transition-colors hover:bg-[#4F6BFF]/15">
              <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.4}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              CRM Updated
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}