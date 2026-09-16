"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { INTEGRATIONS } from "@/lib/site";
import { Arrow, Button, Chip } from "@/components/ui";
import { ArchitectureStack } from "@/components/visuals";

/* =========================================================
   MOTION TOKENS
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: EASE } },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

/* =========================================================
   DATA
========================================================= */

const CAPABILITIES = [
  {
    index: "01",
    title: "AI Agents",
    body: "Intelligent agents that understand conversations, access business knowledge, make decisions, and take action across your systems.",
    accent: "from-violet-500 to-blue-600",
    span: "lg:col-span-2",
    tall: false,
  },
  {
    index: "02",
    title: "Workflow Automation",
    body: "Automate repetitive workflows, approvals, notifications, routing, follow-ups, and data movement across your operations.",
    accent: "from-emerald-500 to-cyan-500",
    span: "",
    tall: true,
  },
  {
    index: "03",
    title: "Custom Software",
    body: "Purpose-built applications designed around your workflows instead of forcing your team into generic software.",
    accent: "from-cyan-500 to-blue-600",
    span: "",
    tall: true,
  },
  {
    index: "04",
    title: "Integrations",
    body: "Connect CRMs, calendars, databases, communication platforms, APIs, and internal systems into one workflow.",
    accent: "from-pink-500 to-violet-500",
    span: "lg:col-span-2",
    tall: false,
  },
];

const ABOUT_POINTS = [
  "Business-first system design",
  "AI, automation, software, and integrations under one team",
  "Built around your existing processes",
  "Integration-ready architecture",
  "Designed to evolve as your business scales",
];

const USE_CASES = [
  {
    title: "Sales Teams",
    body: "Respond to leads faster, qualify opportunities intelligently, automate follow-ups, and move qualified prospects into meetings.",
    image: "/images/use-cases/sales.png",
    tag: "Lead → Qualified → Meeting",
  },
  {
    title: "Customer Support",
    body: "Handle common questions automatically, use your business knowledge, and escalate complex conversations to the right person.",
    image: "/images/use-cases/support.png",
    tag: "Customer → AI → Resolution",
  },
  {
    title: "Service Businesses",
    body: "Automate enquiries, collect requirements, check availability, and coordinate appointment booking without repetitive admin.",
    image: "/images/use-cases/services.png",
    tag: "Enquiry → Requirements → Booking",
  },
  {
    title: "eCommerce",
    body: "Connect customer conversations, order information, support processes, notifications, and operational workflows.",
    image: "/images/use-cases/ecommerce.png",
    tag: "Customer → Order → Support",
  },
  {
    title: "Operations",
    body: "Connect internal systems, automate approvals and updates, and eliminate administrative bottlenecks between teams.",
    image: "/images/use-cases/operations.png",
    tag: "Request → Approval → Action",
  },
  {
    title: "Custom Workflows",
    body: "Your business process doesn't have to fit a template. We design the automation and software around how your team actually works.",
    image: "/images/use-cases/custom.png",
    tag: "Your Process → Your System",
  },
];

const WHY_FLOWFOUNDRY = [
  {
    title: "Business-first architecture",
    body: "We start with the process, bottleneck, and desired outcome before choosing the technology.",
  },
  {
    title: "End-to-end implementation",
    body: "AI, automation, software development, integrations, and deployment are designed as one connected system.",
  },
  {
    title: "Built for integration",
    body: "We work with your existing technology stack instead of creating another isolated tool.",
  },
  {
    title: "Designed to scale",
    body: "Build the right foundation now and extend it as your operations, customers, and requirements grow.",
  },
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Discover",
    body: "Understand your workflows, systems, bottlenecks, customer journeys, and desired business outcomes.",
  },
  {
    n: "02",
    title: "Design",
    body: "Map the conversations, business logic, data, integrations, automations, and actions required.",
  },
  {
    n: "03",
    title: "Build",
    body: "Develop, integrate, and test your AI, automation, or custom software as one complete system.",
  },
  {
    n: "04",
    title: "Launch & Improve",
    body: "Deploy, monitor, measure, and continuously refine the system as your business evolves.",
  },
];

const LEADPULZ_POINTS = [
  "Answer inbound calls intelligently",
  "Call and qualify new leads",
  "Automate appointment booking",
  "Follow up with prospects",
  "CRM & calendar integrations",
  "Conversation insights and analytics",
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
  const tones = {
    indigo: "border-blue-500/20 bg-blue-500/5 text-blue-600",
    cyan: "border-cyan-500/20 bg-cyan-500/5 text-cyan-600",
    violet: "border-violet-500/20 bg-violet-500/5 text-violet-600",
    emerald: "border-emerald-500/20 bg-emerald-500/5 text-emerald-600",
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
          } ${invert ? "text-white/70" : "text-slate-600"}`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
}

/* =========================================================
   HERO SYSTEM VISUAL
========================================================= */

function HeroSystemVisual() {
  const flow = [
    { label: "New Lead", meta: "Website enquiry", tone: "neutral" },
    { label: "AI Agent", meta: "Engage & understand", tone: "primary" },
    { label: "Business Logic", meta: "Qualify & route", tone: "neutral" },
    { label: "CRM + Calendar", meta: "Sync business data", tone: "neutral" },
    { label: "Action", meta: "Book & follow up", tone: "success" },
  ];

  return (
    <div className="relative">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="pointer-events-none absolute -right-16 bottom-8 h-64 w-64 rounded-full bg-violet-500/20 blur-[110px]" />

      <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03] p-5 shadow-[0_40px_100px_-40px_rgba(0,0,0,0.7)] backdrop-blur-md sm:p-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
              Intelligent Workflow
            </p>
            <p className="mt-1 text-sm text-white/80">
              FlowFoundry automation architecture
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            Active
          </div>
        </div>

        {/* Flow */}
        <div className="mt-6 space-y-2.5">
          {flow.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.5 + index * 0.12,
                duration: 0.5,
                ease: EASE,
              }}
              className="relative"
            >
              <div
                className={`flex items-center gap-4 rounded-2xl border p-4 transition-colors ${
                  item.tone === "primary"
                    ? "border-blue-500/30 bg-blue-500/10"
                    : item.tone === "success"
                    ? "border-emerald-400/20 bg-emerald-400/5"
                    : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <div
                  className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-semibold ${
                    item.tone === "primary"
                      ? "bg-gradient-to-br from-blue-500 to-violet-500 text-white shadow-[0_8px_24px_-8px_rgba(79,107,255,.7)]"
                      : item.tone === "success"
                      ? "bg-emerald-400/15 text-emerald-300"
                      : "bg-white/5 text-white/70"
                  }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white">
                    {item.label}
                  </p>
                  <p className="mt-0.5 text-xs text-white/50">{item.meta}</p>
                </div>

                <svg
                  className="h-4 w-4 text-white/30"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.7}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </div>

              {index < flow.length - 1 && (
                <div className="ml-[36px] h-2.5 w-px bg-gradient-to-b from-blue-500/40 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>

        {/* Outcomes */}
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {["Lead qualified", "CRM updated", "Meeting booked"].map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-xl border border-emerald-400/15 bg-emerald-400/5 p-3"
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

      {/* Floating badges */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-4 top-[30%] hidden rounded-2xl border border-white/10 bg-[#0F1B3D]/90 px-4 py-3 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md lg:block"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
          Automation
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          Follow-up scheduled
        </p>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-4 bottom-[18%] hidden rounded-2xl border border-white/10 bg-[#0F1B3D]/90 px-4 py-3 shadow-[0_20px_50px_-16px_rgba(0,0,0,0.7)] backdrop-blur-md lg:block"
      >
        <p className="text-[10px] font-semibold uppercase tracking-wider text-white/40">
          AI Agent
        </p>
        <p className="mt-1 text-xs font-semibold text-white">
          Qualification complete
        </p>
      </motion.div>
    </div>
  );
}

/* =========================================================
   HOME
========================================================= */

export default function HomePage() {
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
          <div className="absolute -right-40 top-0 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-blue-500/30 to-transparent blur-[130px]" />
          <div className="absolute -left-40 top-[40%] h-[520px] w-[520px] rounded-full bg-gradient-to-tr from-violet-500/25 to-transparent blur-[130px]" />
          <div className="absolute bottom-0 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-500/10 blur-[120px]" />
        </div>

        <Container className="relative z-10">
          <div className="grid min-h-[calc(100vh-72px)] items-center gap-12 py-20 lg:grid-cols-[1.02fr_.98fr] lg:gap-16 lg:py-24">
            {/* Left: Copy */}
            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}>
                <Eyebrow tone="dark">AI • Automation • Software</Eyebrow>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="mt-6 max-w-[760px] text-[42px] font-light leading-[1.05] tracking-[-0.04em] text-white sm:text-[54px] lg:text-[68px]"
              >
                Build intelligent systems around the way your{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  business works.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-[610px] text-[17px] leading-8 text-white/65 sm:text-lg"
              >
                FlowFoundry combines AI agents, automation, custom software,
                and integrations to connect conversations, business logic,
                data, and actions — helping teams move faster, reduce manual
                work, and scale efficiently.
              </motion.p>

              <motion.div
                variants={fadeUp}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Button
                  href="/contact"
                  variant="onDark"
                  className="bg-white text-[#0A1330] hover:bg-white/95"
                >
                  Book a Free Consultation <Arrow />
                </Button>
                <Button href="/leadpulz" variant="outlineOnDark">
                  Explore LeadPulz
                </Button>
              </motion.div>

              <motion.div
                variants={fadeIn}
                className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/50"
              >
                {[
                  "AI Agents",
                  "Automation",
                  "Custom Software",
                  "Integrations",
                ].map((item, index) => (
                  <div key={item} className="flex items-center gap-3">
                    {index > 0 && (
                      <span className="hidden h-1 w-1 rounded-full bg-white/20 sm:block" />
                    )}
                    <span>{item}</span>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: Visual */}
            <motion.div variants={scaleIn}>
              <HeroSystemVisual />
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          ABOUT
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
            <motion.div variants={scaleIn} className="relative">
              <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-slate-50 p-3 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.2)]">
                <Image
                  src="/images/flowfoundry-system.png"
                  alt="FlowFoundry intelligent business system architecture"
                  width={1000}
                  height={800}
                  className="h-auto w-full rounded-[20px] object-cover"
                />
              </div>
              {/* Floating stat */}
              <div className="absolute -bottom-5 -right-5 hidden rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xl sm:block">
                <p className="text-3xl font-light tracking-tight text-slate-900">
                  4-in-1
                </p>
                <p className="mt-1 text-xs uppercase tracking-wider text-slate-500">
                  Unified stack
                </p>
              </div>
            </motion.div>

            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}>
                <Eyebrow tone="violet">About FlowFoundry</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-5 text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-5xl"
              >
                We build systems,
                <br />
                not just software.
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
              >
                FlowFoundry AI Solutions brings together AI engineering,
                automation, software development, and system integration to
                help businesses operate more intelligently.
              </motion.p>

              <motion.p
                variants={fadeUp}
                className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
              >
                We start by understanding how your business actually works —
                your workflows, bottlenecks, customer interactions, and
                existing tools — then design technology around those processes.
              </motion.p>

              <motion.div variants={stagger} className="mt-8 space-y-3">
                {ABOUT_POINTS.map((point) => (
                  <motion.div
                    key={point}
                    variants={fadeUp}
                    className="flex items-start gap-3"
                  >
                    <div className="mt-1 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-violet-500/10">
                      <svg
                        className="h-3 w-3 text-violet-500"
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
                    </div>
                    <span className="text-sm leading-6 text-slate-700 sm:text-base">
                      {point}
                    </span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeUp} className="mt-9">
                <Button href="/about" variant="secondary">
                  Learn About FlowFoundry <Arrow />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          CAPABILITIES — BENTO
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
            eyebrow="What we do"
            title={
              <>
                From disconnected tools to
                <br />
                <span className="bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  one intelligent system.
                </span>
              </>
            }
            description="Instead of adding more software to your stack, we design systems around the way your business actually operates."
            tone="indigo"
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          >
            {CAPABILITIES.map((cap, i) => (
              <motion.article
                key={cap.index}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className={`group relative overflow-hidden rounded-[24px] border border-slate-200/70 bg-white p-7 transition-shadow duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)] ${cap.span} ${
                  cap.tall ? "lg:row-span-1" : ""
                }`}
              >
                {/* Gradient number watermark */}
                <span
                  className={`pointer-events-none absolute -right-2 -top-6 text-[88px] font-bold leading-none tracking-tighter opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1] bg-gradient-to-br ${cap.accent} bg-clip-text text-transparent`}
                >
                  {cap.index}
                </span>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${cap.accent} text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.5)]`}
                >
                  {i === 0 && <AgentIcon />}
                  {i === 1 && <AutomationIcon />}
                  {i === 2 && <CodeIcon />}
                  {i === 3 && <PlugIcon />}
                </div>

                <h3 className="mt-8 text-xl font-semibold tracking-tight text-slate-900">
                  {cap.title}
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {cap.body}
                </p>

                {/* Bottom accent line */}
                <div
                  className={`mt-6 h-px w-12 bg-gradient-to-r ${cap.accent} transition-all duration-500 group-hover:w-full`}
                />
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          ARCHITECTURE
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
            className="absolute inset-0 opacity-[0.05]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          <div className="absolute -left-40 top-1/4 h-96 w-96 rounded-full bg-blue-500/20 blur-[130px]" />
          <div className="absolute -right-40 bottom-1/4 h-96 w-96 rounded-full bg-violet-500/20 blur-[130px]" />
        </div>

        <Container className="relative z-10">
          <SectionHeading
            eyebrow="How it connects"
            title={
              <>
                Conversations → Logic → Data → Actions
              </>
            }
            description="We connect every layer so your business doesn't stop at collecting information — it acts on it."
            tone="dark"
            invert
          />

          <motion.div variants={scaleIn} className="mt-14">
            <ArchitectureStack />
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          LEADPULZ
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={stagger}
        id="leadpulz"
        className="relative overflow-hidden bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
            <motion.div variants={stagger}>
              <motion.div variants={fadeUp}>
                <Eyebrow tone="indigo">LeadPulz · AI Revenue Agent</Eyebrow>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="mt-6 text-[34px] font-light leading-[1.08] tracking-[-0.035em] text-slate-900 sm:text-5xl"
              >
                Turn every conversation into an{" "}
                <span className="bg-gradient-to-r from-blue-500 to-violet-500 bg-clip-text text-transparent">
                  opportunity.
                </span>
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 max-w-xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
              >
                LeadPulz is our AI-powered voice automation platform for
                managing calls, qualifying leads, scheduling appointments,
                automating follow-ups, and connecting conversations to your
                business systems.
              </motion.p>

              <motion.div
                variants={stagger}
                className="mt-8 grid gap-3 sm:grid-cols-2"
              >
                {LEADPULZ_POINTS.map((point) => (
                  <motion.div
                    key={point}
                    variants={fadeUp}
                    className="flex items-center gap-3 text-sm text-slate-700"
                  >
                    <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-blue-500/10">
                      <svg
                        className="h-3 w-3 text-blue-500"
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
                    </span>
                    {point}
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                variants={fadeUp}
                className="mt-9 flex flex-col gap-3 sm:flex-row"
              >
                <Button href="/leadpulz" variant="primary">
                  Explore LeadPulz <Arrow />
                </Button>
                <Button href="/contact?interest=leadpulz" variant="secondary">
                  Book a Demo
                </Button>
              </motion.div>
            </motion.div>

            {/* Dashboard mockup */}
            <motion.div variants={scaleIn} className="relative">
              <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-blue-500/10 via-violet-500/10 to-transparent blur-2xl" />

              <div className="relative overflow-hidden rounded-[28px] border border-slate-200/70 bg-white p-3 shadow-[0_40px_100px_-40px_rgba(15,27,61,0.4)]">
                <div className="flex items-center gap-1.5 px-2 pb-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </div>
                <div className="overflow-hidden rounded-[18px] bg-slate-100">
                  <Image
                    src="/images/dashboard.jpeg"
                    alt="LeadPulz AI Revenue Agent dashboard"
                    width={1200}
                    height={900}
                    className="h-auto w-full"
                  />
                </div>
              </div>

              {/* Floating cards */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-xl sm:block"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  AI Agent
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-emerald-500" />
                  <p className="text-xs font-semibold text-slate-800">
                    Lead qualified
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-5 -top-5 hidden rounded-2xl border border-slate-200/70 bg-white px-4 py-3 shadow-xl sm:block"
              >
                <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                  Action
                </p>
                <p className="mt-1.5 text-xs font-semibold text-slate-800">
                  Meeting booked ✓
                </p>
              </motion.div>
            </motion.div>
          </div>
        </Container>
      </motion.section>

      {/* =====================================================
          USE CASES
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={stagger}
        className="bg-slate-50 py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <SectionHeading
            eyebrow="Use cases"
            title="Built around real business processes."
            description="Different industries have different workflows. The system should adapt to your operation — not the other way around."
            tone="emerald"
          />

          <motion.div
            variants={stagger}
            className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
          >
            {USE_CASES.map((useCase) => (
              <motion.article
                key={useCase.title}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="group overflow-hidden rounded-[24px] border border-slate-200/70 bg-white transition-shadow duration-300 hover:shadow-[0_28px_70px_-28px_rgba(60,64,100,0.25)]"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <Image
                    src={useCase.image}
                    alt={`${useCase.title} automation workflow`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    sizes="(max-width:768px) 100vw, (max-width:1024px) 50vw, 33vw"
                  />
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  <span className="absolute bottom-3 left-3 rounded-full border border-white/40 bg-white/90 px-3 py-1.5 text-[11px] font-medium text-slate-700 backdrop-blur">
                    {useCase.tag}
                  </span>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-slate-900">
                    {useCase.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {useCase.body}
                  </p>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </Container>
      </motion.section>

      {/* =====================================================
          WHY FLOWFOUNDRY
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
        className="bg-white py-24 sm:py-28 lg:py-32"
      >
        <Container>
          <div className="grid gap-16 lg:grid-cols-[.85fr_1.15fr] lg:gap-20">
            <motion.div variants={fadeUp}>
              <Eyebrow tone="violet">Why FlowFoundry</Eyebrow>

              <h2 className="mt-5 max-w-xl text-[34px] font-light leading-[1.1] tracking-[-0.035em] text-slate-900 sm:text-5xl">
                Technology built around the business — not the other way around.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-7 text-slate-600 sm:text-lg">
                Good automation is not about connecting random tools. It is
                about understanding the process first, then designing the right
                system around it.
              </p>
            </motion.div>

            <motion.div variants={stagger} className="grid gap-4 sm:grid-cols-2">
              {WHY_FLOWFOUNDRY.map((item, index) => (
                <motion.article
                  key={item.title}
                  variants={fadeUp}
                  whileHover={{ y: -4 }}
                  transition={{ duration: 0.25, ease: EASE }}
                  className="group rounded-[24px] border border-slate-200/70 bg-white p-6 transition-all duration-300 hover:border-slate-300 hover:shadow-[0_24px_60px_-28px_rgba(65,70,105,0.22)]"
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-violet-500/10 text-xs font-semibold text-violet-500">
                    0{index + 1}
                  </span>

                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {item.body}
                  </p>
                </motion.article>
              ))}
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
            title="From process to production."
            description="Start with the business problem. Design the system. Build, integrate, launch, and improve."
            tone="cyan"
          />

          <motion.div
            variants={stagger}
            className="relative mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Connecting line */}
            <div className="absolute left-[12.5%] right-[12.5%] top-5 hidden h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent lg:block" />

            {PROCESS_STEPS.map((step) => (
              <motion.article key={step.n} variants={fadeUp} className="relative">
                <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-violet-500 text-xs font-semibold text-white shadow-[0_12px_30px_-10px_rgba(79,107,255,.6)]">
                  {step.n}
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
          INTEGRATIONS
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
            eyebrow="Integrations"
            title="Connect the tools your business already depends on."
            description="FlowFoundry can integrate with platforms such as CRMs, calendars, messaging tools, eCommerce systems, databases, and custom APIs."
            tone="cyan"
          />

          <motion.div
            variants={stagger}
            className="mx-auto mt-14 flex max-w-4xl flex-wrap justify-center gap-3"
          >
            {INTEGRATIONS.map((integration) => (
              <motion.div
                key={integration}
                variants={fadeUp}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.2 }}
              >
                <Chip className="border-slate-200 bg-slate-50 px-5 py-3 text-slate-700 transition-all hover:border-blue-500/30 hover:bg-blue-500/5 hover:text-blue-600">
                  {integration}
                </Chip>
              </motion.div>
            ))}
          </motion.div>

          <motion.p
            variants={fadeIn}
            className="mt-8 text-center text-xs text-slate-400"
          >
            Product names are shown as examples of platforms that can be
            integrated. They do not imply formal partnerships.
          </motion.p>
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
        className="bg-white px-5 pb-24 sm:px-6 sm:pb-28 lg:px-8 lg:pb-32"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[36px] bg-[#0A1330] px-6 py-20 text-center sm:px-12 sm:py-24 lg:px-16 lg:py-28">
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-blue-500/30 blur-[120px]" />
              <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-violet-500/30 blur-[130px]" />
              <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-cyan-500/20 blur-[110px]" />
            </div>

            <div className="relative z-10">
              <Eyebrow tone="dark">Start a conversation</Eyebrow>

              <h2 className="mx-auto mt-6 max-w-4xl text-[34px] font-light leading-[1.06] tracking-[-0.035em] text-white sm:text-5xl lg:text-6xl">
                What would you automate if your team had{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 bg-clip-text text-transparent">
                  more time?
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-white/70 sm:text-lg">
                Tell us what's slowing your business down. We'll help you
                explore a smarter way to run it.
              </p>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <Button
                  href="/contact"
                  variant="onDark"
                  className="bg-white text-[#0A1330] hover:bg-white/95"
                >
                  Book a Free Consultation <Arrow />
                </Button>
                <Button href="/contact" variant="outlineOnDark">
                  Tell Us What You Want to Automate
                </Button>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}

/* =========================================================
   INLINE ICONS
========================================================= */

function AgentIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M9.663 17h4.673M12 3v1m6.364 1.636-.707.707M21 12h-1M4 12H3m3.343-5.657-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
      />
    </svg>
  );
}

function AutomationIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  );
}

function PlugIcon() {
  return (
    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.6}
        d="M13 10V3L4 14h7v7l9-11h-7z"
      />
    </svg>
  );
}