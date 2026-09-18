"use client";

import { motion, Variants } from "framer-motion";
import type { ComponentType } from "react";

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

function LeadIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <circle cx="8" cy="8" r="3" strokeWidth="1.7" />
      <path d="M3.5 18c.7-3 2.3-4.5 4.5-4.5 1.4 0 2.6.6 3.4 1.6" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M14 7h7M17.5 3.5V10.5" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m14 17 2.2 2.2L21 14.5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SalesIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M4 18V11M10 18V7M16 18V4M22 18H2" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m4 8 4-3 4 2 7-5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SupportIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M5 15.5A8 8 0 1 1 19 15" strokeWidth="1.7" strokeLinecap="round" />
      <rect x="3" y="12" width="4" height="6" rx="2" strokeWidth="1.7" />
      <rect x="17" y="12" width="4" height="6" rx="2" strokeWidth="1.7" />
      <path d="M17 18c0 2-1.5 3-4.5 3" strokeWidth="1.7" strokeLinecap="round" />
      <circle cx="11" cy="21" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function OperationsIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="4" width="6" height="5" rx="1.5" strokeWidth="1.7" />
      <rect x="15" y="15" width="6" height="5" rx="1.5" strokeWidth="1.7" />
      <path d="M9 6.5h3a3 3 0 0 1 3 3v1" strokeWidth="1.7" strokeLinecap="round" />
      <path d="M15 17.5h-3a3 3 0 0 1-3-3v-1" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m13 9 2 2 2-2M11 15l-2-2-2 2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CRMIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <ellipse cx="12" cy="5.5" rx="7" ry="3" strokeWidth="1.7" />
      <path d="M5 5.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" strokeWidth="1.7" />
      <path d="M5 11.5v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" strokeWidth="1.7" />
    </svg>
  );
}

function AppointmentIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="5" width="18" height="16" rx="2.5" strokeWidth="1.7" />
      <path d="M7 3v4M17 3v4M3 9h18" strokeWidth="1.7" strokeLinecap="round" />
      <path d="m8 15 2.2 2.2L16 12" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/* =========================================================
   DATA
========================================================= */

const SOLUTIONS: {
  id: string;
  index: string;
  title: string;
  problem: string;
  solution: string;
  outcome: string;
  tone: Tone;
  icon: ComponentType<{ className?: string }>;
  workflow: string[];
  capabilities: string[];
}[] = [
  {
    id: "lead-generation",
    index: "01",
    title: "Lead Generation Automation",
    problem:
      "Leads arrive from multiple channels, but response and qualification often depend on manual follow-up.",
    solution:
      "Connect lead sources to AI agents, qualification logic, CRM workflows, and automated follow-ups so opportunities move forward without unnecessary delay.",
    outcome:
      "A more consistent lead-handling process with faster routing and better visibility.",
    tone: "violet",
    icon: LeadIcon,
    workflow: ["Lead captured", "AI engagement", "Qualification", "CRM update", "Follow-up"],
    capabilities: [
      "Multi-channel lead capture",
      "Qualification workflows",
      "Lead scoring and routing",
      "Automated follow-ups",
      "CRM synchronization",
    ],
  },
  {
    id: "sales",
    index: "02",
    title: "Sales Automation",
    problem:
      "Sales teams lose time switching between outreach, qualification, calendars, CRM updates, and follow-ups.",
    solution:
      "Create connected sales workflows that automate repetitive coordination while keeping the sales team involved where human judgment matters.",
    outcome:
      "A cleaner pipeline with fewer manual handoffs and more consistent follow-up.",
    tone: "indigo",
    icon: SalesIcon,
    workflow: ["Prospect", "Conversation", "Qualified", "Meeting", "Pipeline"],
    capabilities: [
      "Lead engagement",
      "Qualification",
      "Meeting scheduling",
      "Follow-up automation",
      "Pipeline workflows",
    ],
  },
  {
    id: "support",
    index: "03",
    title: "Customer Support Automation",
    problem:
      "Support teams repeatedly answer the same questions while complex requests need careful routing and context.",
    solution:
      "Use AI agents and knowledge systems to handle common conversations, retrieve relevant information, and route complex cases to the right person.",
    outcome:
      "More consistent support while preserving human escalation for important conversations.",
    tone: "emerald",
    icon: SupportIcon,
    workflow: ["Customer", "AI support", "Knowledge", "Resolution", "Escalation"],
    capabilities: [
      "AI support agents",
      "Knowledge base integration",
      "Conversation routing",
      "Human escalation",
      "Support workflow automation",
    ],
  },
  {
    id: "operations",
    index: "04",
    title: "Operations Automation",
    problem:
      "Approvals, notifications, data entry, task handoffs, and reporting create unnecessary administrative work.",
    solution:
      "Connect operational tools and business rules so information automatically triggers the next step in the process.",
    outcome:
      "Less repetitive coordination and clearer operational workflows across teams.",
    tone: "amber",
    icon: OperationsIcon,
    workflow: ["Request", "Rules", "Approval", "System update", "Notification"],
    capabilities: [
      "Approval workflows",
      "Task automation",
      "Notifications",
      "Data movement",
      "Internal process automation",
    ],
  },
  {
    id: "crm",
    index: "05",
    title: "CRM Automation",
    problem:
      "CRM systems quickly lose value when updates, activity logs, lead stages, and customer data rely on manual entry.",
    solution:
      "Connect your CRM to conversations, lead sources, calendars, applications, and operational systems so records stay aligned with actual business activity.",
    outcome:
      "Cleaner customer data and fewer repetitive CRM updates for the team.",
    tone: "cyan",
    icon: CRMIcon,
    workflow: ["Activity", "Capture", "Sync", "CRM", "Next action"],
    capabilities: [
      "Automatic record updates",
      "Data synchronization",
      "Lead stage workflows",
      "Activity tracking",
      "System integrations",
    ],
  },
  {
    id: "appointments",
    index: "06",
    title: "Appointment Automation",
    problem:
      "Booking meetings manually creates delays, calendar conflicts, missed reminders, and unnecessary back-and-forth.",
    solution:
      "Connect lead conversations, qualification rules, calendars, confirmations, reminders, and CRM updates into one booking workflow.",
    outcome:
      "A smoother path from interested prospect to confirmed appointment.",
    tone: "rose",
    icon: AppointmentIcon,
    workflow: ["Qualified lead", "Availability", "Booking", "Confirmation", "Reminder"],
    capabilities: [
      "Calendar integration",
      "Availability checks",
      "Automated booking",
      "Confirmations",
      "Reminder workflows",
    ],
  },
];

const PROCESS = [
  {
    number: "01",
    label: "Understand",
    title: "Understand",
    body: "We map the existing process, tools, people, decisions, bottlenecks, and desired outcome.",
  },
  {
    number: "02",
    label: "Design",
    title: "Design",
    body: "We define the automation logic, system architecture, integrations, and user experience.",
  },
  {
    number: "03",
    label: "Build",
    title: "Build",
    body: "We develop, connect, and test the components as one complete business workflow.",
  },
  {
    number: "04",
    label: "Improve",
    title: "Improve",
    body: "We launch, monitor, refine, and extend the system as your business evolves.",
  },
];

const INDUSTRIES = [
  "Professional Services",
  "Sales Teams",
  "Service Businesses",
  "eCommerce",
  "Customer Support",
  "Operations Teams",
  "SaaS",
  "Education",
];

/* =========================================================
   PRIMITIVES
========================================================= */

function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
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
  children: React.ReactNode;
  tone?: "indigo" | "cyan" | "violet" | "emerald" | "dark";
}) {
  const tones: Record<string, string> = {
    indigo: "border-[#4F6BFF]/20 bg-[#4F6BFF]/5 text-[#4F6BFF]",
    cyan: "border-[#06B6D4]/20 bg-[#06B6D4]/5 text-[#0891B2]",
    violet: "border-[#8B5CF6]/20 bg-[#8B5CF6]/5 text-[#7C3AED]",
    emerald: "border-[#10B981]/20 bg-[#10B981]/5 text-[#047857]",
    dark: "border-white/15 bg-white/5 text-white",
  };

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-2xs font-semibold uppercase tracking-[0.18em] ${tones[tone]}`}
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
  title: React.ReactNode;
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
        className={`mt-5 text-4xl font-light leading-[1.1] tracking-[-0.035em] sm:text-5xl ${
          invert ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-5 text-base leading-7 sm:text-lg ${
            align === "center" ? "mx-auto max-w-2xl" : ""
          } ${invert ? "text-on-dark-muted" : "text-slate"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================
   HERO VISUAL — FLOW PANEL
========================================================= */

function SolutionFlowVisual() {
  const nodes = [
    { label: "Lead / Request", meta: "Input enters the system", tone: "violet" as Tone },
    { label: "AI + Business Logic", meta: "Understand, qualify, decide", tone: "indigo" as Tone },
    { label: "Data & Integrations", meta: "CRM, calendar, APIs", tone: "cyan" as Tone },
    { label: "Automated Action", meta: "Book, update, notify", tone: "emerald" as Tone },
  ];

  return (
    <div className="relative">
      {/* Ambient */}
      <div className="pointer-events-none absolute -left-16 top-20 h-56 w-56 rounded-full bg-[#8B5CF6]/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-52 w-52 rounded-full bg-[#06B6D4]/20 blur-[100px]" />

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-md sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-on-dark-quiet">
              Business Automation
            </p>
            <p className="mt-1 text-sm text-white">
              Connected system example
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

        {/* Flow */}
        <div className="mt-6 space-y-2.5">
          {nodes.map((node, index) => {
            const t = TONES[node.tone];
            return (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.12, duration: 0.5, ease: EASE }}
              >
                <div
                  className={`flex items-center gap-4 rounded-lg border p-4 transition-colors ${
                    index === 3
                      ? "border-emerald-400/20 bg-emerald-400/5"
                      : "border-white/10 bg-white/[0.03]"
                  }`}
                >
                  <div
                    className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-md bg-gradient-to-br ${t.gradient} text-xs font-semibold text-white shadow-[0_10px_26px_-10px_rgba(79,107,255,0.6)]`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1">
                    <p className="text-sm font-semibold text-white">
                      {node.label}
                    </p>
                    <p className="mt-1 text-xs text-on-dark-quiet">{node.meta}</p>
                  </div>

                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    className="h-4 w-4 text-on-dark-quiet"
                    stroke="currentColor"
                  >
                    <path
                      d="m9 5 7 7-7 7"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                {index < nodes.length - 1 && (
                  <div className="ml-[37px] h-2.5 w-px bg-gradient-to-b from-[#4F6BFF]/40 to-transparent" />
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Outcomes */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {["CRM updated", "Meeting booked", "Follow-up queued"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-md border border-emerald-400/15 bg-emerald-400/5 p-3"
            >
              <svg
                className="h-3.5 w-3.5 shrink-0 text-emerald-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <span className="text-xs font-medium text-emerald-300">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   SOLUTIONS PAGE
========================================================= */

export default function SolutionsPage() {
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
          <div className="grid min-h-[720px] items-center gap-14 py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-24">
            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}>
                <Eyebrow tone="dark">Business Solutions</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-[720px] text-4xl font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl"
              >
                Automate the process,
                <br />
                not just the{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  task.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[610px] text-base leading-8 text-on-dark-muted sm:text-lg"
              >
                FlowFoundry designs intelligent workflows around real business
                challenges — from lead handling and sales to support,
                operations, CRM, and appointment management.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[600px] text-base leading-7 text-on-dark-quiet"
              >
                We connect conversations, business logic, data, and actions so
                your systems do more than store information — they help move
                work forward.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  href="/contact"
                  variant="onDark"
                >
                  Discuss Your Workflow <Arrow />
                </Button>
                <Button href="/services" variant="outlineOnDark">
                  Explore Services
                </Button>
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn}>
              <SolutionFlowVisual />
            </motion.div>
          </div>
        </Container>

        {/* Position strip — floating card */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
          className="relative z-10 -mb-16"
        >
        </motion.div>
      </motion.section>

      {/* =====================================================
          SOLUTIONS INTRO
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-slate-50 pt-32 pb-20 sm:pt-36 sm:pb-24"
      >
        <Container>
          <SectionHeading
            eyebrow="Where we help"
            title={
              <>
                Solutions built around real
                <br />
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  business workflows.
                </span>
              </>
            }
            description="We don't force every client into the same automation template. Each system is designed around the way the process actually works."
          />
        </Container>
      </motion.section>

      {/* =====================================================
          SOLUTION SECTIONS
      ===================================================== */}
      <section className="bg-white pb-24 sm:pb-28 lg:pb-32">
        <Container>
          <div className="space-y-8">
            {SOLUTIONS.map((solution, index) => {
              const t = TONES[solution.tone];
              const Icon = solution.icon;
              const isReversed = index % 2 === 1;

              return (
                <motion.article
                  key={solution.id}
                  id={solution.id}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.1 }}
                  variants={fadeUp}
                  className={`relative overflow-hidden rounded-2xl border bg-white transition-shadow duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.2)] ${t.ring}`}
                >
                  {/* Tone accent corner */}
                  <div
                    className={`pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gradient-to-br ${t.gradient} opacity-[0.08] blur-3xl`}
                  />

                  <div
                    className={`relative grid gap-10 p-7 sm:p-10 lg:gap-14 lg:p-12 ${
                      isReversed ? "lg:grid-cols-[1.08fr_0.92fr]" : "lg:grid-cols-[0.92fr_1.08fr]"
                    }`}
                  >
                    {/* LEFT — Problem / Solution / Outcome */}
                    <div className={isReversed ? "lg:order-2" : ""}>
                      <div className="flex items-start justify-between gap-5">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br ${t.gradient} text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.5)]`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <span className={`text-2xs font-semibold uppercase tracking-[0.18em] ${t.text}`}>
                          {solution.index}
                        </span>
                      </div>

                      <h3 className="mt-7 text-2xl font-semibold leading-tight tracking-tight text-ink sm:text-3xl">
                        {solution.title}
                      </h3>

                      <div className="mt-7 space-y-6">
                        <div>
                          <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-muted">
                            The problem
                          </p>
                          <p className="mt-2.5 text-sm leading-7 text-slate">
                            {solution.problem}
                          </p>
                        </div>

                        <div>
                          <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-muted">
                            The FlowFoundry approach
                          </p>
                          <p className="mt-2.5 text-sm leading-7 text-slate">
                            {solution.solution}
                          </p>
                        </div>

                        <div className={`relative overflow-hidden rounded-lg border p-5 ${t.ring} ${t.surface}`}>
                          <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-muted">
                            Business outcome
                          </p>
                          <p className="mt-2 text-sm font-medium leading-6 text-slate">
                            {solution.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* RIGHT — Workflow + Capabilities */}
                    <div className={isReversed ? "lg:order-1" : ""}>
                      {/* Workflow */}
                      <div>
                        <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-muted">
                          Example workflow
                        </p>

                        <div className="mt-4 rounded-lg border border-slate-200/70 bg-slate-50/60 p-5">
                          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            {solution.workflow.map((step, stepIndex) => (
                              <div
                                key={step}
                                className="flex min-w-0 flex-1 items-center gap-3 sm:flex-col sm:gap-2"
                              >
                                <div
                                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${t.gradient} text-2xs font-semibold text-white shadow-[0_6px_16px_-6px_rgba(79,107,255,.6)]`}
                                >
                                  {stepIndex + 1}
                                </div>

                                <span className="text-2xs font-medium leading-5 text-slate sm:text-center">
                                  {step}
                                </span>

                                {stepIndex < solution.workflow.length - 1 && (
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    className="ml-auto h-3.5 w-3.5 rotate-90 text-muted sm:ml-0 sm:rotate-0"
                                    stroke="currentColor"
                                  >
                                    <path
                                      d="m9 5 7 7-7 7"
                                      strokeWidth="1.8"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                    />
                                  </svg>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Capabilities */}
                      <div className="mt-7">
                        <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-muted">
                          Common capabilities
                        </p>

                        <div className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                          {solution.capabilities.map((capability) => (
                            <div key={capability} className="flex items-start gap-2.5">
                              <span className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${t.dot}`} />
                              <span className="text-xs leading-5 text-slate">
                                {capability}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA */}
                      <div className="mt-8">
                        <Button
                          href={`/contact?solution=${solution.id}`}
                          variant="secondary"
                        >
                          Discuss This Solution <Arrow />
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </Container>
      </section>

      {/* =====================================================
          SYSTEM THINKING
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="relative overflow-hidden bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#4F6BFF]/[0.06] blur-[130px]" />
          <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/[0.06] blur-[130px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="violet">System thinking</Eyebrow>

              <h2 className="mt-5 text-4xl font-light leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl">
                One process can touch many systems.
              </h2>

              <p className="relative mt-6 pl-5 text-lg font-light leading-8 text-slate">
                <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-[#4F6BFF] via-[#8B5CF6] to-transparent" />
                Real automation usually spans more than one application.
              </p>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate">
                That&apos;s why we design around the full workflow instead of
                automating isolated clicks.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  number: "01",
                  title: "Conversations",
                  body: "Calls, forms, chat, email, lead enquiries, and customer interactions.",
                  tone: "violet" as Tone,
                },
                {
                  number: "02",
                  title: "Business Logic",
                  body: "Rules, qualification, routing, decisions, approvals, and automation logic.",
                  tone: "indigo" as Tone,
                },
                {
                  number: "03",
                  title: "Data",
                  body: "CRM records, databases, calendars, knowledge, analytics, and application data.",
                  tone: "emerald" as Tone,
                },
                {
                  number: "04",
                  title: "Actions",
                  body: "Book meetings, update systems, send follow-ups, create tasks, and trigger workflows.",
                  tone: "amber" as Tone,
                },
              ].map((item) => {
                const t = TONES[item.tone];
                return (
                  <motion.article
                    key={item.number}
                    variants={fadeUp}
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`group relative overflow-hidden rounded-xl border bg-white p-6 transition-all duration-300 hover:shadow-[0_24px_60px_-28px_rgba(65,70,105,0.22)] ${t.ring}`}
                  >
                    <span
                      className={`inline-flex h-8 w-8 items-center justify-center rounded-full ${t.iconBg} text-xs font-semibold`}
                    >
                      {item.number}
                    </span>

                    <h3 className="mt-5 text-lg font-semibold tracking-tight text-ink">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate">
                      {item.body}
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
          PROCESS
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="From idea to system"
            title="How we turn workflows into working systems."
            description="A structured process keeps technology aligned with the outcome you're trying to create."
            tone="emerald"
          />

          <motion.div
            variants={stagger}
            className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-transparent via-[#4F6BFF]/40 to-transparent lg:block" />

            {PROCESS.map((step) => (
              <motion.article key={step.number} variants={fadeUp} className="relative">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-xs font-semibold text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.6)]">
                  {step.number}
                </div>

                <p className="mt-6 text-2xs font-semibold uppercase tracking-[0.18em] text-[#4F6BFF]">
                  {step.label}
                </p>

                <h3 className="mt-2 text-lg font-semibold tracking-tight text-ink">
                  {step.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate">
                  {step.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          INDUSTRIES
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="bg-slate-50 py-20 sm:py-24"
      >
        <Container>
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/70 bg-white p-8 sm:p-12">
            <div className="pointer-events-none absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#4F6BFF]/10 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#8B5CF6]/10 blur-[110px]" />

            <div className="relative grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Eyebrow tone="cyan">Where it applies</Eyebrow>

                <h2 className="mt-5 text-2xl font-light leading-[1.15] tracking-[-0.03em] text-ink sm:text-4xl">
                  Built for different business models.
                </h2>

                <p className="mt-4 max-w-lg text-sm leading-6 text-slate sm:text-base">
                  The same underlying system-thinking can be adapted to
                  different industries, workflows, and customer journeys.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {INDUSTRIES.map((industry) => (
                  <span
                    key={industry}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F6BFF]/30 hover:bg-[#4F6BFF]/5 hover:text-[#4F6BFF]"
                  >
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          LEADPULZ CALLOUT
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={fadeUp}
        className="bg-white py-16 sm:py-20"
      >
        <Container>
          <div className="relative overflow-hidden rounded-2xl bg-[#0A1330] p-8 sm:p-12 lg:p-14">
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute -right-32 -top-32 h-80 w-80 rounded-full bg-[#4F6BFF]/30 blur-[110px]" />
              <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-[#8B5CF6]/30 blur-[110px]" />
            </div>

            <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <Eyebrow tone="dark">LeadPulz</Eyebrow>

                <h2 className="mt-5 max-w-3xl text-[26px] font-light leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl">
                  Looking specifically for voice and{" "}
                  <span className="bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                    revenue automation?
                  </span>
                </h2>

                <p className="mt-4 max-w-2xl text-base leading-7 text-on-dark-muted">
                  Explore LeadPulz, our AI Revenue Agent platform for calls,
                  lead qualification, appointment booking, follow-ups, and
                  conversation intelligence.
                </p>
              </div>

              <div className="shrink-0">
                <Button
                  href="/leadpulz"
                  variant="onDark"
                >
                  Explore LeadPulz <Arrow />
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </motion.section>
    </>
  );
}