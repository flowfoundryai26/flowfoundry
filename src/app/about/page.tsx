"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

import { TEAM } from "@/lib/site";
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
   DATA
========================================================= */

const PRINCIPLES = [
  {
    number: "01",
    title: "Process before tools",
    body: "We begin with how the business actually works — the workflow, people, bottlenecks, decisions, and desired outcome.",
  },
  {
    number: "02",
    title: "Outcome before features",
    body: "Technology should create measurable operational value, not simply add more software to the stack.",
  },
  {
    number: "03",
    title: "Integration before isolation",
    body: "We design systems that work with your existing tools, data, and processes instead of creating another disconnected silo.",
  },
  {
    number: "04",
    title: "Automation with human control",
    body: "AI and automation should remove repetitive work while keeping important decisions visible and controllable.",
  },
  {
    number: "05",
    title: "Build for evolution",
    body: "The systems we create are designed to grow as your business, customers, and operational requirements change.",
  },
];

const CAPABILITIES = [
  "AI Agents",
  "Voice AI",
  "Workflow Automation",
  "Custom Software",
  "Web Applications",
  "eCommerce",
  "CRM Integrations",
  "API Integrations",
];

const SYSTEM_LAYERS = [
  {
    title: "Conversations",
    description: "Calls, chat, forms, email, customer interactions",
    tone: "violet",
    items: ["Calls", "Web Chat", "WhatsApp", "Email", "Forms"],
  },
  {
    title: "Business Logic",
    description: "Rules, routing, qualification, decisions, automation",
    tone: "indigo",
    items: ["Qualification", "Routing", "Rules", "AI Decisions"],
  },
  {
    title: "Data",
    description: "CRMs, databases, knowledge bases, analytics",
    tone: "cyan",
    items: ["CRM", "Databases", "Knowledge Base", "Analytics"],
  },
  {
    title: "Actions",
    description: "Bookings, updates, follow-ups, tasks, workflows",
    tone: "emerald",
    items: ["Book Meetings", "Update CRM", "Follow-ups", "Workflows"],
  },
];

const FOCUS_AREAS = [
  {
    index: "01",
    title: "AI Engineering",
    body: "Designing intelligent agents and AI-enabled systems that understand context, access business knowledge, and take meaningful action.",
    accent: "from-[#8B5CF6] to-[#4F6BFF]",
    span: "lg:col-span-2",
  },
  {
    index: "02",
    title: "Automation",
    body: "Removing repetitive coordination across sales, support, operations, follow-ups, approvals, notifications, and data movement.",
    accent: "from-[#10B981] to-[#06B6D4]",
    span: "",
  },
  {
    index: "03",
    title: "Software",
    body: "Building purpose-designed platforms, dashboards, portals, internal tools, websites, and applications around real workflows.",
    accent: "from-[#06B6D4] to-[#4F6BFF]",
    span: "",
  },
  {
    index: "04",
    title: "Integration",
    body: "Connecting business systems, APIs, CRMs, calendars, databases, and communication platforms into one operating flow.",
    accent: "from-[#F472B6] to-[#8B5CF6]",
    span: "lg:col-span-2",
  },
];

/* =========================================================
   TONES
========================================================= */

const TONES: Record<
  string,
  { bg: string; text: string; dot: string; ring: string; gradient: string }
> = {
  violet: {
    bg: "bg-violet-50",
    text: "text-violet-700",
    dot: "bg-violet-500",
    ring: "border-violet-200/70",
    gradient: "from-[#8B5CF6] to-[#4F6BFF]",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    dot: "bg-indigo-500",
    ring: "border-indigo-200/70",
    gradient: "from-[#4F6BFF] to-[#8B5CF6]",
  },
  cyan: {
    bg: "bg-cyan-50",
    text: "text-cyan-700",
    dot: "bg-cyan-500",
    ring: "border-cyan-200/70",
    gradient: "from-[#06B6D4] to-[#4F6BFF]",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    dot: "bg-emerald-500",
    ring: "border-emerald-200/70",
    gradient: "from-[#10B981] to-[#06B6D4]",
  },
};

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
   ABOUT PAGE
========================================================= */

export default function AboutPage() {
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
        {/* Background layers */}
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
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#06B6D4]/10 blur-[120px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid min-h-[680px] items-center gap-14 py-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16 lg:py-24">
            {/* Left */}
            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}>
                <Eyebrow tone="dark">About FlowFoundry</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-[700px] text-[42px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[64px]"
              >
                Building smarter ways for businesses to{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  work.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[590px] text-[17px] leading-8 text-white/70 sm:text-lg"
              >
                FlowFoundry AI Solutions helps businesses turn ideas, manual
                processes, and disconnected tools into intelligent business
                systems.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 max-w-[590px] text-base leading-7 text-white/55"
              >
                We combine AI engineering, automation, software development,
                and integrations to connect conversations, business logic,
                data, and actions around the way your business actually
                operates.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  href="/contact"
                  variant="onDark"
                  className="bg-white text-[#0A1330] hover:bg-white/95"
                >
                  Talk to Our Team <Arrow />
                </Button>

                <Button href="/services" variant="outlineOnDark">
                  Explore Our Services
                </Button>
              </motion.div>
            </motion.div>

            {/* Right visual */}
            <motion.div variants={scaleIn} className="relative">
              {/* Glow */}
              <div className="pointer-events-none absolute -inset-6 rounded-[40px] bg-gradient-to-br from-[#4F6BFF]/20 via-[#8B5CF6]/15 to-transparent blur-3xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-3 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.8)] backdrop-blur-sm">
                <div className="overflow-hidden rounded-[20px] bg-white">
                  <Image
                    src="/images/flowfoundry-system.png"
                    alt="FlowFoundry intelligent business system connecting conversations, logic, data, and actions"
                    width={1400}
                    height={1100}
                    priority
                    className="h-auto w-full"
                  />
                </div>
              </div>

              {/* Floating stat */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -left-5 top-1/3 hidden rounded-2xl border border-white/10 bg-[#0F1B3D]/90 px-4 py-3 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md lg:block"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Focus
                </p>
                <p className="mt-1 text-xs font-semibold text-white">
                  Business systems
                </p>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-5 bottom-1/4 hidden rounded-2xl border border-white/10 bg-[#0F1B3D]/90 px-4 py-3 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md lg:block"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
                  Approach
                </p>
                <p className="mt-1 text-xs font-semibold text-white">
                  Process first
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          INTRODUCTION
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="cyan">Who we are</Eyebrow>

              <h2 className="mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-5xl">
                We build systems,
                <br />
                not just tools.
              </h2>
            </motion.div>

            <motion.div variants={fadeUp}>
              {/* Pull quote */}
              <p className="relative pl-5 text-xl font-light leading-9 text-slate-800 sm:text-2xl sm:leading-10">
                <span className="absolute left-0 top-1 h-[calc(100%-0.5rem)] w-0.5 bg-gradient-to-b from-[#4F6BFF] via-[#8B5CF6] to-transparent" />
                FlowFoundry is a team of AI engineers, automation specialists,
                and software developers focused on helping businesses operate
                smarter, faster, and with greater clarity.
              </p>

              <p className="mt-6 text-base leading-8 text-slate-600 sm:text-lg">
                We go beyond building standalone applications. Our work starts
                with understanding the workflows, customer interactions,
                internal processes, business rules, data, and systems that keep
                an organization moving.
              </p>

              <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg">
                From there, we design practical technology around those
                processes — reducing repetitive work, connecting disconnected
                systems, improving response times, and creating a stronger
                foundation for growth.
              </p>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          FOCUS AREAS — BENTO
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="What we bring together"
            title={
              <>
                Technology that works as{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  one system.
                </span>
              </>
            }
            description="We combine the disciplines required to move from a business problem to a complete, connected solution."
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {FOCUS_AREAS.map((item) => (
              <motion.article
                key={item.index}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={`group relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)] ${item.span}`}
              >
                {/* Watermark number */}
                <span
                  className={`pointer-events-none absolute -right-2 -top-6 text-[88px] font-bold leading-none tracking-tighter opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1] bg-gradient-to-br ${item.accent} bg-clip-text text-transparent`}
                >
                  {item.index}
                </span>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${item.accent} text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.5)]`}
                >
                  {item.index === "01" && (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      />
                    </svg>
                  )}
                  {item.index === "02" && (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M4 4v6h6M20 20v-6h-6M20 9a8 8 0 0 0-14.9-3M4 15a8 8 0 0 0 14.9 3"
                      />
                    </svg>
                  )}
                  {item.index === "03" && (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                      />
                    </svg>
                  )}
                  {item.index === "04" && (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.7}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  )}
                </div>

                <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.body}
                </p>

                {/* Animated underline */}
                <div
                  className={`mt-6 h-px w-12 bg-gradient-to-r ${item.accent} transition-all duration-500 group-hover:w-full`}
                />
              </motion.article>
            ))}
          </motion.div>

          {/* Capability chips */}
          <motion.div
            variants={fadeIn}
            className="mt-12 flex flex-wrap justify-center gap-2"
          >
            {CAPABILITIES.map((capability) => (
              <span
                key={capability}
                className="rounded-full border border-slate-200 bg-white px-4 py-2 text-[12.5px] font-medium text-slate-600 transition-colors duration-200 hover:border-[#4F6BFF]/30 hover:bg-[#4F6BFF]/5 hover:text-[#4F6BFF]"
              >
                {capability}
              </span>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          MISSION + VISION
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="relative overflow-hidden bg-[#0A1330] py-24 sm:py-28 lg:py-32"
      >
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-[#4F6BFF]/20 blur-[130px]" />
          <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-[#8B5CF6]/20 blur-[130px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid gap-5 lg:grid-cols-2">
            {/* Mission — dark on dark */}
            <motion.article
              variants={fadeUp}
              className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-8 backdrop-blur-sm sm:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#4F6BFF]/25 blur-[90px]" />

              <div className="relative z-10">
                <Eyebrow tone="dark">Our mission</Eyebrow>

                <h3 className="mt-6 text-3xl font-light leading-[1.15] tracking-[-0.03em] text-white sm:text-4xl">
                  Turn complex business processes into{" "}
                  <span className="bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] bg-clip-text text-transparent">
                    intelligent, connected systems.
                  </span>
                </h3>

                <p className="mt-6 max-w-xl text-base leading-7 text-white/65">
                  Our mission is to help businesses remove operational
                  friction, automate repetitive work, connect their systems,
                  and use technology in ways that create practical business
                  value.
                </p>
              </div>
            </motion.article>

            {/* Vision — light on dark */}
            <motion.article
              variants={fadeUp}
              className="relative overflow-hidden rounded-[28px] bg-white p-8 sm:p-10 lg:p-12"
            >
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-52 w-52 rounded-full bg-[#DDF8FF]/70 blur-[70px]" />

              <div className="relative z-10">
                <Eyebrow tone="cyan">Our vision</Eyebrow>

                <h3 className="mt-6 text-3xl font-light leading-[1.15] tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  A future where every growing business can operate
                  intelligently.
                </h3>

                <p className="mt-6 max-w-xl text-base leading-7 text-slate-600">
                  We envision businesses where conversations, decisions, data,
                  and actions move seamlessly — giving teams more time for
                  customers, creativity, strategy, and growth.
                </p>
              </div>
            </motion.article>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          SYSTEM PHILOSOPHY
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid items-start gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <motion.div variants={fadeUp} className="lg:sticky lg:top-32">
              <Eyebrow tone="emerald">Our system philosophy</Eyebrow>

              <h2 className="mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-5xl">
                Conversations.
                <br />
                Logic.
                <br />
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  Data. Actions.
                </span>
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                These are the layers we connect to turn disconnected business
                processes into intelligent operating systems.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="space-y-4">
              {SYSTEM_LAYERS.map((layer, index) => {
                const t = TONES[layer.tone];
                return (
                  <motion.article
                    key={layer.title}
                    variants={fadeUp}
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className={`group relative overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-[0_20px_50px_-24px_rgba(15,27,61,0.2)] ${t.ring}`}
                  >
                    <div className="flex items-start gap-5">
                      {/* Number badge */}
                      <span
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${t.gradient} text-[12px] font-semibold text-white shadow-[0_10px_24px_-10px_rgba(79,107,255,0.5)]`}
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="min-w-0 flex-1">
                        <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                          {layer.title}
                        </h3>
                        <p className="mt-1.5 text-sm leading-6 text-slate-600">
                          {layer.description}
                        </p>

                        {/* Item chips */}
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {layer.items.map((item) => (
                            <span
                              key={item}
                              className={`rounded-full ${t.bg} ${t.text} px-2.5 py-1 text-[11px] font-medium`}
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          PRINCIPLES
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="How we think"
            title="Principles behind every system we build."
            description="Five ideas that guide how we design, build, and evolve every engagement."
          />

          <motion.div
            variants={stagger}
            className="mx-auto mt-16 max-w-4xl divide-y divide-slate-200"
          >
            {PRINCIPLES.map((item) => (
              <motion.article
                key={item.number}
                variants={fadeUp}
                className="group grid gap-3 py-7 transition-colors duration-200 sm:grid-cols-[80px_240px_1fr] sm:items-start sm:gap-8"
              >
                <span className="relative text-sm font-semibold text-[#4F6BFF]">
                  {item.number}
                  <span className="absolute -bottom-1 left-0 h-px w-6 bg-[#4F6BFF]/40 transition-all duration-300 group-hover:w-full group-hover:bg-[#4F6BFF]" />
                </span>

                <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                  {item.title}
                </h3>

                <p className="text-sm leading-6 text-slate-600">
                  {item.body}
                </p>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          TEAM
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="The team"
            title="The people building FlowFoundry."
            description="A distributed team combining engineering, automation, software, and business development capabilities."
            tone="cyan"
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {TEAM.map((member, index) => (
              <motion.article
                key={member.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3, ease: EASE }}
                className="group overflow-hidden rounded-[24px] border border-slate-200/70 bg-white transition-shadow duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)]"
              >
                <div className="relative aspect-[4/4.6] overflow-hidden bg-slate-100">
                  <Image
                    src={member.avatar}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A1330]/85 via-[#0A1330]/30 to-transparent" />

                  {/* Role chip */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="inline-flex rounded-full border border-white/25 bg-white/15 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
                      {member.role}
                    </span>
                  </div>

                  {/* Number watermark */}
                  <span className="absolute right-4 top-4 text-[11px] font-semibold tracking-widest text-white/70">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-[13px] font-medium text-[#4F6BFF]">
                    {member.role}
                  </p>

                  <div className="mt-4 flex items-center gap-2 text-[12.5px] text-slate-500">
                    <svg
                      className="h-3.5 w-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M17.657 16.657 13.414 20.9a2 2 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0Z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.8}
                        d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                      />
                    </svg>
                    {member.place}
                  </div>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          LEADPULZ CALLOUT
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-slate-50 py-20 sm:py-24"
      >
        <Container>
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-[32px] border border-slate-200/70 bg-white p-8 sm:p-10 lg:p-14"
          >
            {/* Ambient orbs */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#4F6BFF]/10 blur-[90px]" />
            <div className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-[#8B5CF6]/10 blur-[90px]" />

            <div className="relative grid items-center gap-8 lg:grid-cols-[1fr_auto]">
              <div>
                <Eyebrow tone="violet">What we&apos;re building</Eyebrow>

                <h2 className="mt-5 text-[28px] font-light leading-[1.15] tracking-[-0.03em] text-slate-900 sm:text-4xl">
                  LeadPulz — our{" "}
                  <span className="bg-gradient-to-r from-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                    AI Revenue Agent
                  </span>{" "}
                  platform.
                </h2>

                <p className="mt-4 max-w-3xl text-base leading-7 text-slate-600">
                  Alongside our client work, we are building LeadPulz, an
                  AI-powered voice automation platform designed for lead
                  qualification, conversations, appointment booking,
                  follow-ups, CRM integrations, and call intelligence.
                </p>
              </div>

              <div className="flex shrink-0">
                <Button href="/leadpulz" variant="primary">
                  Explore LeadPulz <Arrow />
                </Button>
              </div>
            </div>
          </motion.div>
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
          <div className="relative overflow-hidden rounded-[36px] bg-[#0A1330] px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-16 lg:py-28">
            {/* Background */}
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
              <Eyebrow tone="dark">Let&apos;s build</Eyebrow>

              <h2 className="mx-auto mt-6 max-w-4xl text-[34px] font-light leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                Have a process, bottleneck, or{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  system idea?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Tell us how your business works today. We&apos;ll help you
                explore how AI, automation, integrations, or custom software
                could make it work better.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/contact"
                  variant="onDark"
                  className="bg-white text-[#0A1330] hover:bg-white/95"
                >
                  Book a Free Consultation <Arrow />
                </Button>

                <Button href="/services" variant="outlineOnDark">
                  Explore Our Services
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}