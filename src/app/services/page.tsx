"use client";

import { motion, Variants } from "framer-motion";

import { Arrow, Button } from "@/components/ui";
import type { ReactElement } from "react";

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

function AgentIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        d="M12 3v2M5.64 5.64l1.42 1.42M3 12h2M19 12h2M16.94 7.06l1.42-1.42M8.5 18h7M9.5 21h5"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M8.3 15.3A5 5 0 1 1 15.7 15.3C14.8 16 14 16.8 14 18h-4c0-1.2-.8-2-1.7-2.7Z"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AutomationIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <rect x="3" y="4" width="6" height="5" rx="1.5" strokeWidth="1.7" />
      <rect x="15" y="15" width="6" height="5" rx="1.5" strokeWidth="1.7" />
      <path
        d="M9 6.5h3a3 3 0 0 1 3 3v1M15 17.5h-3a3 3 0 0 1-3-3v-1"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path d="m13 9 2 2 2-2M11 15l-2-2-2 2" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CodeIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        d="m8 8-4 4 4 4M16 8l4 4-4 4M14 4l-4 16"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WebIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
      <path
        d="M3.5 9h17M3.5 15h17M12 3c2.2 2.4 3.2 5.4 3.2 9S14.2 18.6 12 21M12 3C9.8 5.4 8.8 8.4 8.8 12s1 6.6 3.2 9"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CommerceIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        d="M4 5h2l1.8 8.2A2 2 0 0 0 9.75 15H17a2 2 0 0 0 1.9-1.37L21 7H7"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="10" cy="19" r="1.2" strokeWidth="1.7" />
      <circle cx="18" cy="19" r="1.2" strokeWidth="1.7" />
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

/* =========================================================
   DATA
========================================================= */

const SERVICES: {
  id: string;
  index: string;
  title: string;
  body: string;
  tone: Tone;
  icon: (props: { className?: string }) => ReactElement;
  capabilities: string[];
  span: string;
}[] = [
  {
    id: "ai-agents",
    index: "01",
    title: "AI Agents",
    body: "Intelligent agents that understand conversations, access business knowledge, make decisions, and take action across your systems.",
    tone: "violet",
    icon: AgentIcon,
    span: "lg:col-span-2",
    capabilities: [
      "Voice and chat agents",
      "Lead qualification",
      "Customer support automation",
      "Knowledge-based assistants",
      "Business action execution",
      "CRM and workflow connectivity",
    ],
  },
  {
    id: "workflow-automation",
    index: "02",
    title: "Workflow Automation",
    body: "Turn repetitive, manual processes into connected workflows that move information and trigger the right action automatically.",
    tone: "emerald",
    icon: AutomationIcon,
    span: "",
    capabilities: [
      "Lead routing",
      "Follow-up automation",
      "Approvals and notifications",
      "Data synchronization",
      "Operational workflows",
      "Internal task automation",
    ],
  },
  {
    id: "custom-software",
    index: "03",
    title: "Custom Software",
    body: "Purpose-built applications designed around your business workflows rather than forcing your team into generic software.",
    tone: "indigo",
    icon: CodeIcon,
    span: "",
    capabilities: [
      "Internal tools",
      "SaaS platforms",
      "Business dashboards",
      "Customer portals",
      "Custom web applications",
      "Backend systems",
    ],
  },
  {
    id: "web-development",
    index: "04",
    title: "Web Development",
    body: "Modern websites and web applications designed for performance, clarity, conversion, and integration with your business systems.",
    tone: "amber",
    icon: WebIcon,
    span: "",
    capabilities: [
      "Corporate websites",
      "Landing pages",
      "Web applications",
      "Customer portals",
      "Responsive interfaces",
      "Performance optimization",
    ],
  },
  {
    id: "ecommerce",
    index: "05",
    title: "eCommerce",
    body: "Connected commerce experiences that combine storefronts, payments, customer journeys, operational automation, and integrations.",
    tone: "rose",
    icon: CommerceIcon,
    span: "",
    capabilities: [
      "Online stores",
      "Custom shopping experiences",
      "Payment integrations",
      "Order automation",
      "Inventory integrations",
      "Customer workflow automation",
    ],
  },
  {
    id: "integrations",
    index: "06",
    title: "Integrations",
    body: "Connect the tools your business already uses and keep data moving between systems without repetitive manual work.",
    tone: "cyan",
    icon: IntegrationIcon,
    span: "lg:col-span-2",
    capabilities: [
      "CRM integrations",
      "Calendar integrations",
      "REST APIs",
      "Database connectivity",
      "Messaging platforms",
      "Custom system integrations",
    ],
  },
];

const PROCESS = [
  {
    number: "01",
    label: "Discover",
    title: "Understand the process",
    body: "We map your existing workflow, people, tools, bottlenecks, business rules, and desired outcomes.",
  },
  {
    number: "02",
    label: "Design",
    title: "Design the system",
    body: "We define the architecture, user experience, integrations, automation logic, data flow, and implementation plan.",
  },
  {
    number: "03",
    label: "Build",
    title: "Build and integrate",
    body: "We develop the software, AI, workflows, and integrations, then test them together as one complete system.",
  },
  {
    number: "04",
    label: "Launch",
    title: "Deploy and improve",
    body: "We launch the solution, monitor how it performs, and refine it as requirements and operations evolve.",
  },
];

const TECHNOLOGY_AREAS = [
  {
    title: "AI & Language Systems",
    body: "LLMs, conversational AI, voice systems, retrieval, knowledge bases, and agent workflows.",
  },
  {
    title: "Application Engineering",
    body: "Modern frontend and backend architectures for reliable web applications, SaaS products, and business tools.",
  },
  {
    title: "Automation & APIs",
    body: "Event-driven workflows, API integrations, webhooks, business rules, data synchronization, and orchestration.",
  },
  {
    title: "Cloud & Infrastructure",
    body: "Deployments designed for maintainability, security, observability, reliability, and future scale.",
  },
];

const PROJECT_TYPES = [
  "Lead & sales automation",
  "Customer support systems",
  "AI voice agents",
  "CRM automation",
  "Operations automation",
  "Internal business tools",
  "SaaS platforms",
  "Web applications",
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
        className={`mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] sm:text-5xl ${
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
   HERO VISUAL — SYSTEM ORBIT
========================================================= */

function ServicesSystemVisual() {
  const items: { name: string; meta: string; tone: Tone; position: string }[] = [
    {
      name: "Conversations",
      meta: "Calls · Chat · Forms",
      tone: "violet",
      position: "left-0 top-8",
    },
    {
      name: "AI & Logic",
      meta: "Reason · Decide · Route",
      tone: "indigo",
      position: "right-0 top-[30%]",
    },
    {
      name: "Business Data",
      meta: "CRM · APIs · Database",
      tone: "cyan",
      position: "left-5 bottom-8",
    },
    {
      name: "Actions",
      meta: "Book · Update · Notify",
      tone: "emerald",
      position: "right-3 bottom-2",
    },
  ];

  return (
    <div className="relative mx-auto h-[460px] max-w-[540px] sm:h-[510px]">
      {/* Orbit rings */}
      <div className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
      <div className="absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/10" />

      {/* Center hub */}
      <div className="absolute left-1/2 top-1/2 flex h-[180px] w-[180px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_30px_90px_-30px_rgba(0,0,0,0.8)] backdrop-blur-md">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.6)]">
            <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7" stroke="currentColor">
              <path
                d="M7 7h4V3M17 17h-4v4M17 7h4v4M7 17H3v-4"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="12" cy="12" r="3.5" strokeWidth="1.7" />
            </svg>
          </div>

          <p className="mt-4 text-sm font-semibold text-white">
            FlowFoundry
          </p>

          <p className="mt-1 text-2xs font-medium uppercase tracking-[0.16em] text-on-dark-quiet">
            Intelligent system
          </p>
        </div>
      </div>

      {/* Floating nodes */}
      {items.map((item, index) => {
        const t = TONES[item.tone];
        return (
          <motion.div
            key={item.name}
            animate={{ y: index % 2 === 0 ? [0, -6, 0] : [0, 6, 0] }}
            transition={{
              duration: 4 + index * 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className={`absolute ${item.position} w-[185px] rounded-lg border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md sm:w-[210px] ${t.glow}`}
          >
            <div className="flex items-center gap-3">
              <span className={`h-2 w-2 rounded-full ${t.dot}`} />
              <p className="text-sm font-semibold text-white">{item.name}</p>
            </div>
            <p className="mt-2 text-xs leading-5 text-on-dark-quiet">{item.meta}</p>
          </motion.div>
        );
      })}

      {/* Ambient */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#4F6BFF]/20 blur-[90px]" />
    </div>
  );
}

/* =========================================================
   SERVICES PAGE
========================================================= */

export default function ServicesPage() {
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
                <Eyebrow tone="dark">AI • Automation • Software</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-[720px] text-[42px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[66px]"
              >
                Technology built around{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  your business.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[610px] text-base leading-8 text-on-dark-muted sm:text-lg"
              >
                FlowFoundry designs AI agents, automation, custom software,
                websites, eCommerce systems, and integrations around the
                processes that actually run your business.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[600px] text-base leading-7 text-on-dark-quiet"
              >
                Start with the workflow, bottleneck, or opportunity. We design
                the technology around it — not the other way around.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  href="/contact"
                  variant="onDark"
                >
                  Discuss Your Project <Arrow />
                </Button>

                <Button href="/solutions" variant="outlineOnDark">
                  Explore Solutions
                </Button>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="mt-10 flex flex-wrap gap-2"
              >
                {PROJECT_TYPES.slice(0, 5).map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-2xs font-medium text-on-dark-muted backdrop-blur-sm"
                  >
                    {item}
                  </span>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={scaleIn}>
              <ServicesSystemVisual />
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
          SERVICES — BENTO
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger}
        className="bg-slate-50 pt-32 pb-24 sm:pt-36 sm:pb-28 lg:pt-40 lg:pb-32"
      >
        <Container>
          <SectionHeading
            eyebrow="Our services"
            title={
              <>
                One team for the systems
                <br />
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  your business needs.
                </span>
              </>
            }
            description="Combine AI, automation, software, and integrations into a solution designed around your operation."
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-2"
          >
            {SERVICES.map((service) => {
              const t = TONES[service.tone];
              const Icon = service.icon;
              return (
                <motion.article
                  key={service.id}
                  id={service.id}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className={`group relative overflow-hidden rounded-xl border bg-white p-7 transition-all duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)] sm:p-8 ${t.ring} ${service.span}`}
                >
                  {/* Watermark number */}
                  <span
                    className={`pointer-events-none absolute -right-2 -top-6 text-[100px] font-bold leading-none tracking-tighter opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.09] bg-gradient-to-br ${t.gradient} bg-clip-text text-transparent`}
                  >
                    {service.index}
                  </span>

                  <div className="relative flex items-start justify-between gap-6">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-md bg-gradient-to-br ${t.gradient} text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.5)]`}
                    >
                      <Icon className="h-5 w-5" />
                    </div>

                    <span
                      className={`text-2xs font-semibold uppercase tracking-[0.18em] ${t.text}`}
                    >
                      {service.index}
                    </span>
                  </div>

                  <h3 className="relative mt-8 text-2xl font-semibold tracking-tight text-ink">
                    {service.title}
                  </h3>

                  <p className="relative mt-3 max-w-[600px] text-sm leading-7 text-slate sm:text-base">
                    {service.body}
                  </p>

                  {/* Capabilities */}
                  <div className="relative mt-7 border-t border-slate-100 pt-6">
                    <p className="text-2xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Capabilities
                    </p>

                    <div className="mt-4 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
                      {service.capabilities.map((capability) => (
                        <div
                          key={capability}
                          className="flex items-start gap-2.5"
                        >
                          <span
                            className={`mt-[7px] h-1.5 w-1.5 flex-shrink-0 rounded-full ${t.dot}`}
                          />
                          <span className="text-xs leading-5 text-slate">
                            {capability}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Bottom accent */}
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
          BUSINESS-FIRST
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
      >
        {/* Diagonal gradient accent */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-[#4F6BFF]/[0.06] blur-[130px]" />
          <div className="absolute -right-40 bottom-1/4 h-[500px] w-[500px] rounded-full bg-[#8B5CF6]/[0.06] blur-[130px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid items-center gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="cyan">Business-first engineering</Eyebrow>

              <h2 className="mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl">
                We don&apos;t start with the tool.
              </h2>

              <p className="relative mt-6 pl-5 text-xl font-light leading-9 text-slate">
                <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-[#4F6BFF] via-[#8B5CF6] to-transparent" />
                We start with the workflow.
              </p>

              <p className="mt-5 max-w-lg text-base leading-7 text-slate">
                The right solution might be an AI agent, automation, custom
                application, integration, or a combination of all four. The
                architecture should follow the business problem.
              </p>
            </motion.div>

            <motion.div
              variants={stagger}
              className="grid gap-4 sm:grid-cols-2"
            >
              {[
                {
                  number: "01",
                  title: "Process",
                  body: "Understand what happens today and where friction exists.",
                  tone: "violet" as Tone,
                },
                {
                  number: "02",
                  title: "Logic",
                  body: "Define decisions, rules, routing, and automation behavior.",
                  tone: "indigo" as Tone,
                },
                {
                  number: "03",
                  title: "Data",
                  body: "Identify the systems and information needed to make it work.",
                  tone: "cyan" as Tone,
                },
                {
                  number: "04",
                  title: "Action",
                  body: "Make the system update, notify, book, route, or execute automatically.",
                  tone: "emerald" as Tone,
                },
              ].map((item) => {
                const t = TONES[item.tone];
                return (
                  <motion.div
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
                  </motion.div>
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
        className="bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="How we work"
            title="From business problem to working system."
            description="A structured process keeps technology aligned with the outcome you're trying to create."
            tone="emerald"
          />

          <motion.div
            variants={stagger}
            className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Connector */}
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
          TECHNOLOGY
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div variants={fadeUp} className="lg:sticky lg:top-32">
              <Eyebrow tone="cyan">Technology</Eyebrow>

              <h2 className="mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-ink sm:text-5xl">
                Modern technology.{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] to-[#4F6BFF] bg-clip-text text-transparent">
                  Chosen for the problem.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate sm:text-lg">
                We avoid forcing every project into the same stack. Tools,
                platforms, and architecture are selected according to the
                requirements of the system.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="divide-y divide-slate-200">
              {TECHNOLOGY_AREAS.map((area, index) => (
                <motion.div
                  key={area.title}
                  variants={fadeUp}
                  className="group grid gap-3 py-7 transition-colors duration-200 sm:grid-cols-[60px_220px_1fr] sm:items-start sm:gap-8"
                >
                  <span className="relative text-sm font-semibold text-[#4F6BFF]">
                    {String(index + 1).padStart(2, "0")}
                    <span className="absolute -bottom-1 left-0 h-px w-6 bg-[#4F6BFF]/40 transition-all duration-300 group-hover:w-full group-hover:bg-[#4F6BFF]" />
                  </span>

                  <h3 className="text-base font-semibold tracking-tight text-ink">
                    {area.title}
                  </h3>

                  <p className="text-sm leading-6 text-slate">
                    {area.body}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          PROJECT TYPES
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

            <div className="relative grid items-start gap-10 lg:grid-cols-[0.8fr_1.2fr]">
              <div>
                <Eyebrow tone="violet">Common projects</Eyebrow>

                <h2 className="mt-5 text-[28px] font-light leading-[1.15] tracking-[-0.03em] text-ink sm:text-4xl">
                  What can we help you build?
                </h2>

                <p className="mt-4 max-w-sm text-sm leading-6 text-slate">
                  These are the systems we build most often. If your project
                  doesn&apos;t fit a category, that&apos;s fine — those are
                  usually the most interesting.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {PROJECT_TYPES.map((type) => (
                  <span
                    key={type}
                    className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2.5 text-xs font-medium text-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-[#4F6BFF]/30 hover:bg-[#4F6BFF]/5 hover:text-[#4F6BFF]"
                  >
                    {type}
                  </span>
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
        className="bg-white px-5 pb-24 pt-4 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-2xl bg-[#0A1330] px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-16 lg:py-28">
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
              <Eyebrow tone="dark">Start a project</Eyebrow>

              <h2 className="mx-auto mt-6 max-w-4xl text-[34px] font-light leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                Tell us what your business{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  needs to do better.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-on-dark-muted sm:text-lg">
                Share the workflow, bottleneck, or system you&apos;re working
                on. We&apos;ll help you explore the right combination of AI,
                automation, software, and integrations.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/contact"
                  variant="onDark"
                >
                  Book a Free Consultation <Arrow />
                </Button>

                <Button href="/solutions" variant="outlineOnDark">
                  Explore Solutions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}