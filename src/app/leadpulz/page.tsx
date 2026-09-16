"use client";

import Image from "next/image";
import type { ComponentType, ReactNode } from "react";
import { motion, Variants } from "framer-motion";

import { Arrow, Button } from "@/components/ui";

/* =========================================================
   MOTION TOKENS
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96, y: 24 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

/* =========================================================
   TONES
========================================================= */

type Tone = "violet" | "indigo" | "cyan" | "emerald" | "amber" | "rose";

const TONES: Record<
  Tone,
  {
    surface: string;
    ring: string;
    text: string;
    dot: string;
    iconBg: string;
    gradient: string;
    glow: string;
  }
> = {
  violet: {
    surface: "bg-violet-50/60",
    ring: "border-violet-200/70",
    text: "text-violet-700",
    dot: "bg-violet-500",
    iconBg: "bg-violet-100 text-violet-700",
    gradient: "from-[#8B5CF6] to-[#4F6BFF]",
    glow: "shadow-[0_20px_50px_-24px_rgba(139,92,246,0.35)]",
  },
  indigo: {
    surface: "bg-indigo-50/60",
    ring: "border-indigo-200/70",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    iconBg: "bg-indigo-100 text-indigo-700",
    gradient: "from-[#4F6BFF] to-[#8B5CF6]",
    glow: "shadow-[0_20px_50px_-24px_rgba(79,107,255,0.35)]",
  },
  cyan: {
    surface: "bg-cyan-50/60",
    ring: "border-cyan-200/70",
    text: "text-cyan-700",
    dot: "bg-cyan-500",
    iconBg: "bg-cyan-100 text-cyan-700",
    gradient: "from-[#06B6D4] to-[#4F6BFF]",
    glow: "shadow-[0_20px_50px_-24px_rgba(6,182,212,0.35)]",
  },
  emerald: {
    surface: "bg-emerald-50/60",
    ring: "border-emerald-200/70",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    iconBg: "bg-emerald-100 text-emerald-700",
    gradient: "from-[#10B981] to-[#06B6D4]",
    glow: "shadow-[0_20px_50px_-24px_rgba(16,185,129,0.35)]",
  },
  amber: {
    surface: "bg-amber-50/60",
    ring: "border-amber-200/70",
    text: "text-amber-700",
    dot: "bg-amber-500",
    iconBg: "bg-amber-100 text-amber-700",
    gradient: "from-[#F59E0B] to-[#F472B6]",
    glow: "shadow-[0_20px_50px_-24px_rgba(245,158,11,0.35)]",
  },
  rose: {
    surface: "bg-rose-50/60",
    ring: "border-rose-200/70",
    text: "text-rose-700",
    dot: "bg-rose-500",
    iconBg: "bg-rose-100 text-rose-700",
    gradient: "from-[#F472B6] to-[#8B5CF6]",
    glow: "shadow-[0_20px_50px_-24px_rgba(244,114,182,0.35)]",
  },
};

/* =========================================================
   ICONS
========================================================= */

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        d="M7.2 3.5 4.8 4.7a2 2 0 0 0-1 2.1c.8 6.9 6.3 12.4 13.2 13.2a2 2 0 0 0 2.1-1l1.2-2.4a1.5 1.5 0 0 0-.5-1.9l-3-2.1a1.5 1.5 0 0 0-1.8.1l-1.4 1.2a12.4 12.4 0 0 1-3.5-3.5L11.3 9a1.5 1.5 0 0 0 .1-1.8l-2.1-3a1.5 1.5 0 0 0-2.1-.7Z"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function QualificationIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <circle cx="9" cy="8" r="3" strokeWidth="1.7" />
      <path d="M4 18c.8-3.2 2.5-4.7 5-4.7 1.4 0 2.6.5 3.5 1.5" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m14 17 2.2 2.2L21 14.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CalendarIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" strokeWidth="1.7" />
      <path d="M7 3v4M17 3v4M3 9h18" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m8 15 2.2 2.2L16 12" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FollowUpIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M4 6h16v11H9l-5 4V6Z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M8 10h8M8 13h5" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function IntegrationIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <circle cx="6" cy="12" r="2.5" strokeWidth="1.7" />
      <circle cx="18" cy="6" r="2.5" strokeWidth="1.7" />
      <circle cx="18" cy="18" r="2.5" strokeWidth="1.7" />
      <path d="m8.3 10.8 7.3-3.6M8.3 13.2l7.3 3.6" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function AnalyticsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M4 18V11M10 18V7M16 18V4M22 18H2" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function KnowledgeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M5 4.5h11a3 3 0 0 1 3 3V20H8a3 3 0 0 1-3-3V4.5Z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M5 17c0-1.7 1.3-3 3-3h11M9 8h6M9 11h4" strokeWidth="1.7" strokeLinecap="round" />
    </svg>
  );
}

function WorkflowIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="4" width="6" height="5" rx="1.5" strokeWidth="1.7" />
      <rect x="15" y="15" width="6" height="5" rx="1.5" strokeWidth="1.7" />
      <path d="M9 6.5h3a3 3 0 0 1 3 3v1M15 17.5h-3a3 3 0 0 1-3-3v-1" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m13 9 2 2 2-2M11 15l-2-2-2 2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================================
   DATA
========================================================= */

const CAPABILITIES: {
  title: string;
  body: string;
  icon: ComponentType<{ className?: string }>;
  tone: Tone;
  span: string;
  index: string;
}[] = [
  {
    index: "01",
    title: "Voice Conversations",
    body: "Handle inbound and outbound business conversations using configurable AI voice agents.",
    icon: PhoneIcon,
    tone: "violet",
    span: "lg:col-span-2",
  },
  {
    index: "02",
    title: "Lead Qualification",
    body: "Ask the right questions, capture requirements, and qualify prospects using your business criteria.",
    icon: QualificationIcon,
    tone: "indigo",
    span: "",
  },
  {
    index: "03",
    title: "Appointment Booking",
    body: "Connect conversations with calendar availability and automate the path to a confirmed appointment.",
    icon: CalendarIcon,
    tone: "emerald",
    span: "",
  },
  {
    index: "04",
    title: "Follow-up Automation",
    body: "Trigger structured prospect follow-ups based on call outcomes, qualification status, and workflow rules.",
    icon: FollowUpIcon,
    tone: "amber",
    span: "lg:col-span-2",
  },
  {
    index: "05",
    title: "CRM & Calendar Integration",
    body: "Connect conversations to your existing CRM, calendars, databases, and business workflows.",
    icon: IntegrationIcon,
    tone: "cyan",
    span: "",
  },
  {
    index: "06",
    title: "Conversation Insights",
    body: "Review call outcomes, transcripts, qualification details, activity, and operational conversation data.",
    icon: AnalyticsIcon,
    tone: "rose",
    span: "",
  },
  {
    index: "07",
    title: "Custom Knowledge",
    body: "Give agents access to the business information they need to answer questions more accurately.",
    icon: KnowledgeIcon,
    tone: "indigo",
    span: "lg:col-span-2",
  },
  {
    index: "08",
    title: "Custom Conversation Flows",
    body: "Design qualification, routing, escalation, booking, and follow-up logic around your own process.",
    icon: WorkflowIcon,
    tone: "emerald",
    span: "lg:col-span-2",
  },
];

const HOW_IT_WORKS = [
  {
    number: "01",
    title: "Connect",
    body: "Configure your phone workflow, business knowledge, CRM, calendar, and qualification criteria.",
  },
  {
    number: "02",
    title: "Converse",
    body: "LeadPulz engages prospects using natural voice conversations tailored to your business context.",
  },
  {
    number: "03",
    title: "Understand",
    body: "The agent captures intent, requirements, qualification details, and conversation outcomes.",
  },
  {
    number: "04",
    title: "Take Action",
    body: "Based on the conversation, LeadPulz can trigger bookings, CRM updates, follow-ups, and other workflows.",
  },
];

const USE_CASES = [
  {
    title: "Inbound Lead Response",
    body: "Handle new enquiries when your sales team is busy, offline, or managing other conversations.",
    tone: "violet" as Tone,
  },
  {
    title: "Outbound Qualification",
    body: "Engage selected prospects, gather information, and identify which opportunities need human attention.",
    tone: "indigo" as Tone,
  },
  {
    title: "Appointment Scheduling",
    body: "Move qualified prospects from conversation to available meeting slots without repetitive back-and-forth.",
    tone: "emerald" as Tone,
  },
  {
    title: "Lead Follow-up",
    body: "Re-engage prospects based on defined workflows and previous conversation outcomes.",
    tone: "amber" as Tone,
  },
  {
    title: "Customer Enquiries",
    body: "Answer common questions using business knowledge and route conversations when human involvement is needed.",
    tone: "cyan" as Tone,
  },
  {
    title: "Conversation Intelligence",
    body: "Give teams visibility into what happened during calls and what actions should happen next.",
    tone: "rose" as Tone,
  },
];

const PRODUCT_FLOW = [
  { name: "Conversation", meta: "AI voice agent engages", tone: "violet" as Tone },
  { name: "Qualification", meta: "Intent & requirements captured", tone: "indigo" as Tone },
  { name: "Business Logic", meta: "Rules determine next action", tone: "cyan" as Tone },
  { name: "Integration", meta: "CRM & calendar connected", tone: "emerald" as Tone },
  { name: "Action", meta: "Book, update or follow up", tone: "amber" as Tone },
];

const CUSTOMIZATION = [
  "Custom qualification criteria",
  "Business-specific knowledge",
  "CRM and calendar connections",
  "Custom actions and workflows",
  "Human handoff when required",
];

/* =========================================================
   PRIMITIVES
========================================================= */

function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
}

function Eyebrow({
  children,
  tone = "indigo",
}: {
  children: ReactNode;
  tone?: "indigo" | "cyan" | "violet" | "emerald" | "dark";
}) {
  const tones: Record<string, string> = {
    indigo: "border-[#4F6BFF]/20 bg-[#4F6BFF]/5 text-[#4F6BFF]",
    cyan: "border-[#06B6D4]/20 bg-[#06B6D4]/5 text-[#0891B2]",
    violet: "border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-[#7C3AED]",
    emerald: "border-[#10B981]/20 bg-[#10B981]/5 text-[#047857]",
    dark: "border-white/15 bg-white/5 text-white/90",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] ${tones[tone]}`}
    >
      <span className="h-1 w-1 rounded-full bg-current opacity-70" />
      {children}
    </span>
  );
}

function SectionHeading({
  eyebrow,
  title,
  description,
  tone = "indigo",
  align = "center",
  invert = false,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  tone?: "indigo" | "cyan" | "violet" | "emerald" | "dark";
  align?: "center" | "left";
  invert?: boolean;
}) {
  return (
    <motion.div
      variants={fadeUp}
      className={
        align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-2xl"
      }
    >
      <Eyebrow tone={tone}>{eyebrow}</Eyebrow>
      <h2
        className={`mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] sm:text-5xl ${
          invert ? "text-white" : "text-slate-900"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            align === "center" ? "mx-auto max-w-2xl" : ""
          } ${invert ? "text-white/65" : "text-slate-600"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================
   HERO VOICE VISUAL
========================================================= */

function HeroVoiceVisual() {
  // Bars for the waveform
  const bars = [
    18, 28, 44, 30, 54, 40, 62, 34, 50, 66, 42, 58, 28, 48, 68, 38, 54, 30,
    44, 24, 36, 52, 30, 18,
  ];

  const actionRows = [
    "Qualification completed",
    "Calendar availability checked",
    "Meeting workflow triggered",
    "CRM activity prepared",
  ];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-16 top-24 h-56 w-56 rounded-full bg-[#8B5CF6]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-10 h-56 w-56 rounded-full bg-[#06B6D4]/20 blur-[100px]" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#8B5CF6]">
              LeadPulz AI Agent
            </p>
            <p className="mt-1 text-sm text-white/80">
              Live conversation workflow
            </p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Active
          </div>
        </div>

        {/* Caller card */}
        <div className="mt-6 rounded-[22px] border border-white/10 bg-white/[0.04] p-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-white shadow-[0_10px_26px_-10px_rgba(79,107,255,0.7)]">
              <PhoneIcon className="h-5 w-5" />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white">
                AI Agent Call
              </p>
              <p className="mt-1 text-xs text-white/50">
                New business enquiry
              </p>
            </div>

            <span className="rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5 text-xs font-medium text-white/80 tabular-nums">
              03:42
            </span>
          </div>

          {/* Waveform */}
          <div className="mt-6 flex h-16 items-center justify-center gap-[4px]">
            {bars.map((height, index) => (
              <motion.span
                key={index}
                animate={{
                  height: [
                    `${Math.max(height - 12, 10)}%`,
                    `${height}%`,
                    `${Math.max(height - 6, 12)}%`,
                  ],
                }}
                transition={{
                  duration: 0.8 + (index % 4) * 0.15,
                  repeat: Infinity,
                  repeatType: "mirror",
                }}
                className="w-[3px] rounded-full bg-gradient-to-t from-[#4F6BFF] to-[#06B6D4]"
              />
            ))}
          </div>
        </div>

        {/* Qualification rows */}
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Intent
            </p>
            <p className="mt-2 text-sm font-semibold text-white">
              Product Demo
            </p>
          </div>

          <div className="rounded-[18px] border border-white/10 bg-white/[0.03] p-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/40">
              Status
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <p className="text-sm font-semibold text-white">
                Qualified
              </p>
            </div>
          </div>
        </div>

        {/* Action feed */}
        <div className="mt-4 space-y-2">
          {actionRows.map((action, index) => (
            <motion.div
              key={action}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.13, duration: 0.4, ease: EASE }}
              className="flex items-center gap-3 rounded-xl border border-emerald-400/15 bg-emerald-400/5 px-4 py-3"
            >
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-400/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3 text-emerald-300">
                  <path d="m5 13 4 4L19 7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span className="text-xs font-medium text-emerald-200">
                {action}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function LeadPulzPage() {
  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={stagger}
        className="relative overflow-hidden bg-[#0A1330]"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "64px 64px",
            }}
          />
          <div className="absolute -right-40 top-0 h-[560px] w-[560px] rounded-full bg-[#4F6BFF]/25 blur-[130px]" />
          <div className="absolute -left-40 bottom-0 h-[520px] w-[520px] rounded-full bg-[#8B5CF6]/25 blur-[130px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid min-h-[760px] items-center gap-14 py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-24">
            {/* Left */}
            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}>
                <Eyebrow tone="dark">LeadPulz · AI Revenue Agent</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-[760px] text-[42px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[68px]"
              >
                Turn business calls into{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  measurable action.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[610px] text-[17px] leading-8 text-white/70 sm:text-lg"
              >
                LeadPulz is an AI-powered voice automation platform that helps
                businesses manage calls, qualify leads, schedule appointments,
                automate follow-ups, and connect conversations to business
                workflows.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[600px] text-base leading-7 text-white/50"
              >
                Give every conversation a structured next step — without
                forcing your team to manually manage every interaction.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  href="/contact?interest=leadpulz"
                  variant="onDark"
                  className="bg-white text-[#0A1330] hover:bg-white/95"
                >
                  Book a Demo <Arrow />
                </Button>

                <Button href="#product" variant="outlineOnDark">
                  See How It Works
                </Button>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="mt-10 flex flex-wrap gap-2"
              >
                {[
                  "Voice AI",
                  "Lead Qualification",
                  "Appointment Booking",
                  "CRM Integration",
                ].map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11.5px] font-medium text-white/65 backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            {/* Right */}
            <motion.div variants={scaleIn}>
              <HeroVoiceVisual />
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          PRODUCT DASHBOARD
      ===================================================== */}
      <motion.section
        id="product"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="bg-slate-50 pt-32 pb-24 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
      >
        <Container>
          <SectionHeading
            eyebrow="The product"
            title={
              <>
                One workspace for
                <br />
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  every conversation.
                </span>
              </>
            }
            description="Give your team visibility into calls, qualification results, appointments, agent activity, and conversation outcomes from one interface."
          />

          <motion.div variants={scaleIn} className="relative mt-14">
            <div className="pointer-events-none absolute -left-10 top-1/3 h-60 w-60 rounded-full bg-[#4F6BFF]/10 blur-[90px]" />
            <div className="pointer-events-none absolute -right-10 bottom-0 h-60 w-60 rounded-full bg-[#8B5CF6]/10 blur-[90px]" />

            {/* Browser chrome */}
            <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-2.5 shadow-[0_40px_100px_-40px_rgba(15,27,61,0.4)] sm:p-3">
              {/* Chrome bar */}
              <div className="flex items-center gap-1.5 px-2 pb-3">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                <div className="ml-3 flex-1 rounded-md border border-slate-200 bg-slate-50 px-3 py-1 text-[10.5px] text-slate-400">
                  app.leadpulz.ai
                </div>
              </div>

              <div className="relative overflow-hidden rounded-[18px] bg-slate-100">
                <Image
                  src="/images/dashboard.jpeg"
                  alt="LeadPulz AI Revenue Agent dashboard"
                  width={1600}
                  height={950}
                  className="h-auto w-full"
                  priority
                />

                {/* Live badge */}
                <div className="absolute right-4 top-4 inline-flex items-center gap-2 rounded-full bg-[#0F1B3D]/85 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  Live
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 left-8 hidden rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-xl md:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Conversation
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Qualification completed ✓
              </p>
            </motion.div>

            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-6 bottom-16 hidden rounded-2xl border border-slate-200/70 bg-white px-5 py-4 shadow-xl lg:block"
            >
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-slate-400">
                Workflow
              </p>
              <p className="mt-2 text-sm font-semibold text-slate-800">
                Next action triggered
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          CAPABILITIES — BENTO
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="Capabilities"
            title={
              <>
                More than an{" "}
                <span className="bg-gradient-to-r from-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  AI phone call.
                </span>
              </>
            }
            description="LeadPulz connects the conversation to the business process that needs to happen next."
            tone="cyan"
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CAPABILITIES.map((cap) => {
              const t = TONES[cap.tone];
              const Icon = cap.icon;
              return (
                <motion.article
                  key={cap.index}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={`group relative overflow-hidden rounded-[24px] border bg-white p-7 transition-all duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)] ${t.ring} ${cap.span}`}
                >
                  {/* Watermark */}
                  <span
                    className={`pointer-events-none absolute -right-2 -top-6 text-[88px] font-bold leading-none tracking-tighter opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09] bg-gradient-to-br ${t.gradient} bg-clip-text text-transparent`}
                  >
                    {cap.index}
                  </span>

                  <div className="relative flex items-start justify-between">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.5)]`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className={`text-[11px] font-semibold uppercase tracking-[0.18em] ${t.text}`}>
                      {cap.index}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-lg font-semibold tracking-tight text-slate-900">
                    {cap.title}
                  </h3>

                  <p className="relative mt-3 text-sm leading-6 text-slate-600">
                    {cap.body}
                  </p>

                  <div
                    className={`relative mt-6 h-px w-12 bg-gradient-to-r ${t.gradient} transition-all duration-500 group-hover:w-full`}
                  />
                </motion.article>
              );
            })}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          HOW IT WORKS
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        variants={stagger}
        className="bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="How it works"
            title="Conversation to action."
            description="LeadPulz is designed around the complete workflow, not only the call itself."
            tone="emerald"
          />

          <motion.div
            variants={stagger}
            className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-transparent via-[#4F6BFF]/40 to-transparent lg:block" />

            {HOW_IT_WORKS.map((step) => (
              <motion.article key={step.number} variants={fadeUp} className="relative">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-xs font-semibold text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.6)]">
                  {step.number}
                </div>

                <h3 className="mt-6 text-lg font-semibold tracking-tight text-slate-900">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {step.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          PRODUCT FLOW — Navy section
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="relative overflow-hidden bg-[#0A1330] py-24 sm:py-28 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#4F6BFF]/20 blur-[130px]" />
          <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#8B5CF6]/20 blur-[130px]" />
        </div>

        <Container className="relative z-10">
          <SectionHeading
            eyebrow="Intelligent workflow"
            title={
              <>
                What happens after the{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                  call matters.
                </span>
              </>
            }
            description="LeadPulz connects conversations to business logic, data, and actions so your team knows what happened and what should happen next."
            tone="dark"
            invert
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-3 lg:grid-cols-5"
          >
            {PRODUCT_FLOW.map((item, index) => {
              const t = TONES[item.tone];
              return (
                <motion.div key={item.name} variants={fadeUp} className="relative">
                  <div className="h-full rounded-[22px] border border-white/10 bg-white/[0.04] p-5 backdrop-blur-md transition-colors hover:bg-white/[0.06]">
                    <div className={`flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br ${t.gradient} text-[11px] font-semibold text-white`}>
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <h3 className="mt-5 text-lg font-semibold text-white">
                      {item.name}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-white/60">
                      {item.meta}
                    </p>
                  </div>

                  {index < PRODUCT_FLOW.length - 1 && (
                    <div className="absolute -right-[11px] top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 items-center justify-center rounded-full bg-white/15 backdrop-blur-md lg:flex">
                      <svg viewBox="0 0 24 24" fill="none" stroke="white" className="h-3 w-3">
                        <path d="m9 5 7 7-7 7" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          USE CASES
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
            <motion.div variants={fadeUp} className="lg:sticky lg:top-32 lg:self-start">
              <Eyebrow tone="violet">Use cases</Eyebrow>

              <h2 className="mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-5xl">
                Built for conversations that drive{" "}
                <span className="bg-gradient-to-r from-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  revenue.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Configure LeadPulz around the conversations, qualification
                logic, and follow-up processes your business actually uses.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
              {USE_CASES.map((useCase, index) => {
                const t = TONES[useCase.tone];
                return (
                  <motion.article
                    key={useCase.title}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`group relative overflow-hidden rounded-[24px] border bg-white p-6 transition-all duration-300 hover:shadow-[0_24px_60px_-28px_rgba(65,70,105,0.22)] ${t.ring}`}
                  >
                    <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${t.iconBg} text-xs font-semibold`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                      {useCase.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-slate-600">
                      {useCase.body}
                    </p>

                    <div
                      className={`mt-5 h-px w-10 bg-gradient-to-r ${t.gradient} transition-all duration-500 group-hover:w-full`}
                    />
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          CUSTOMIZATION
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="bg-slate-50 py-20 sm:py-24"
      >
        <Container>
          <div className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#4F6BFF]/10 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[110px]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_.85fr]">
              <div>
                <Eyebrow tone="cyan">Built around your business</Eyebrow>

                <h2 className="mt-5 max-w-2xl text-[28px] font-light leading-[1.15] tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  Your agent should understand your process —{" "}
                  <span className="bg-gradient-to-r from-[#06B6D4] to-[#4F6BFF] bg-clip-text text-transparent">
                    not use a generic script.
                  </span>
                </h2>

                <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
                  Configure conversation logic, qualification criteria,
                  business knowledge, integrations, routing, booking behavior,
                  and follow-up workflows around your operation.
                </p>
              </div>

              <div className="grid gap-3">
                {CUSTOMIZATION.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl border border-slate-200/70 bg-slate-50/60 px-4 py-3.5 transition-colors hover:border-[#4F6BFF]/30 hover:bg-[#4F6BFF]/5"
                  >
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#4F6BFF]/10">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="h-3 w-3 text-[#4F6BFF]">
                        <path d="m5 13 4 4L19 7" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>

                    <span className="text-sm text-slate-700">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
        className="bg-white px-5 pb-24 pt-12 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[36px] bg-[#0A1330] px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-16 lg:py-28">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#4F6BFF]/30 blur-[120px]" />
              <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#8B5CF6]/30 blur-[130px]" />
              <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-[#06B6D4]/20 blur-[110px]" />
            </div>

            <div className="relative z-10">
              <Eyebrow tone="dark">See LeadPulz in action</Eyebrow>

              <h2 className="mx-auto mt-6 max-w-4xl text-[34px] font-light leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                What could your team do if every lead got the{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  right next step?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Tell us how your business handles calls and leads today.
                We&apos;ll show you how LeadPulz can fit into the workflow.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/contact?interest=leadpulz"
                  variant="onDark"
                  className="bg-white text-[#0A1330] hover:bg-white/95"
                >
                  Book a Demo <Arrow />
                </Button>

                <Button href="/contact" variant="outlineOnDark">
                  Talk to Our Team
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}