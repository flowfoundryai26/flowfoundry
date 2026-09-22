"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { INTEGRATIONS, PROJECTS } from "@/lib/site";
import {
  Arrow,
  Button,
  Container,
  Eyebrow,
  Index,
  SectionHeading,
  Status,
} from "@/components/ui";
import {
  Magnetic,
  Marquee,
  Reveal,
  Spotlight,
  Words,
  fadeUp,
  scaleIn,
  stagger,
} from "@/components/motion";
import { AgentConsole, Device, SystemFlow } from "@/components/visuals";
import {
  CTA,
  Checks,
  Process,
  RowList,
  Split,
  StatStrip,
  StickyStack,
} from "@/components/sections";

/* =========================================================
   DATA
========================================================= */

const CAPABILITIES = [
  {
    id: "ai-agents",
    index: "01",
    title: "AI Agents",
    body: "Agents that understand conversations, pull from your business knowledge, make decisions, and take action across your systems.",
    meta: ["Voice", "Chat", "Qualification", "Support"],
  },
  {
    id: "workflow-automation",
    index: "02",
    title: "Workflow Automation",
    body: "Approvals, notifications, routing, follow-ups, and data movement that run themselves instead of waiting on a person.",
    meta: ["Routing", "Approvals", "Follow-ups", "Sync"],
  },
  {
    id: "custom-software",
    index: "03",
    title: "Custom Software",
    body: "Applications shaped around how your team works — portals, dashboards, internal tools, and platforms.",
    meta: ["Portals", "Dashboards", "SaaS", "Internal tools"],
  },
  {
    id: "integrations",
    index: "04",
    title: "Integrations",
    body: "CRMs, calendars, databases, messaging, payments, and APIs connected into one working system.",
    meta: ["CRM", "Calendar", "Payments", "APIs"],
  },
];

const ABOUT_POINTS = [
  "Business-first system design",
  "AI, automation, software, and integrations under one team",
  "Built around your existing processes",
  "Integration-ready architecture",
  "Designed to evolve as your business scales",
] as const;

const USE_CASES = [
  {
    title: "Sales teams",
    body: "Respond to leads in seconds, qualify intelligently, and move prospects into booked meetings.",
    image: "/images/use-cases/sales.png",
    flow: "Lead → Qualified → Meeting",
  },
  {
    title: "Customer support",
    body: "Answer common questions from your knowledge base and escalate the rest to the right person.",
    image: "/images/use-cases/support.png",
    flow: "Customer → AI → Resolution",
  },
  {
    title: "Service businesses",
    body: "Collect requirements, check availability, and coordinate bookings without the admin.",
    image: "/images/use-cases/services.png",
    flow: "Enquiry → Requirements → Booking",
  },
  {
    title: "eCommerce",
    body: "Connect conversations, orders, support, and notifications into one operational flow.",
    image: "/images/use-cases/ecommerce.png",
    flow: "Customer → Order → Support",
  },
  {
    title: "Operations",
    body: "Automate approvals and updates between systems and remove the bottlenecks between teams.",
    image: "/images/use-cases/operations.png",
    flow: "Request → Approval → Action",
  },
  {
    title: "Custom workflows",
    body: "Your process doesn't have to fit a template. We design the system around how your team actually works.",
    image: "/images/use-cases/custom.png",
    flow: "Your process → Your system",
  },
];

const WHY = [
  {
    index: "01",
    title: "Business-first architecture",
    body: "We start with the process, the bottleneck, and the outcome you want — then choose the technology.",
    image: "/images/why/architecture.png",
    alt: "Connected business architecture diagram",
  },
  {
    index: "02",
    title: "End-to-end implementation",
    body: "AI, automation, software, integrations, and deployment designed and delivered as one connected system.",
    image: "/images/why/implementation.png",
    alt: "Implementation workflow",
  },
  {
    index: "03",
    title: "Built for integration",
    body: "We work with the tools you already run instead of adding another isolated one to the stack.",
    image: "/images/why/integration.png",
    alt: "Integration between business systems",
  },
  {
    index: "04",
    title: "Designed to scale",
    body: "Build the right foundation now and extend it as customers, operations, and requirements grow.",
    image: "/images/why/scale.png",
    alt: "Scaling business operations",
  },
];

const PROCESS = [
  { number: "01", title: "Discover", body: "Understand your workflows, systems, bottlenecks, customer journeys, and desired outcomes." },
  { number: "02", title: "Design", body: "Map the conversations, business logic, data, integrations, automations, and actions required." },
  { number: "03", title: "Build", body: "Develop, integrate, and test your AI, automation, or software as one complete system." },
  { number: "04", title: "Launch & improve", body: "Deploy, monitor, measure, and refine the system as your business evolves." },
];

const LEADPULZ_POINTS = [
  "Answer inbound calls intelligently",
  "Call and qualify new leads",
  "Automate appointment booking",
  "Follow up with prospects",
  "CRM and calendar integrations",
  "Conversation insights and analytics",
] as const;

/* =========================================================
   PAGE
========================================================= */

export default function HomePage() {
  return (
    <div className="w-full overflow-x-clip">
      <Hero />
      <IntegrationBand />
      <Positioning />
      <Capabilities />
      <System />
      <LeadPulz />
      <UseCases />
      <Projects />
      <Why />
      <ProcessSection />
      <CTA
        title="What would you automate if your team had more time?"
        lede="Tell us what's slowing your business down. We'll map the system that removes it — AI, automation, software, or all three."
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
        image="/images/mission.png"
      />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-ink">
      {/* Photo, faded into the surface on the right */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[58%]">
          <Image
            src="/images/use-cases/sales.png"
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-[65%_center] opacity-[0.28] saturate-[0.8]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0d14_0%,#0a0d14_30%,rgba(10,13,20,0.75)_60%,rgba(10,13,20,0.6)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.5)_0%,rgba(10,13,20,0)_35%,#0a0d14_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100dvh-72px)] items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.1, 0.05)} className="min-w-0">
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <Eyebrow dark>AI · Automation · Software</Eyebrow>
            </motion.div>

            <h1 className="mt-7 max-w-[20ch] text-[clamp(2.3rem,4.8vw,4.2rem)] font-medium leading-[1] tracking-[-0.035em] text-white text-balance">
              <Words text="Systems built around the way your business works." delay={0.2} />
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[52ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              FlowFoundry combines AI agents, automation, custom software, and
              integrations so conversations, business logic, data, and actions
              run as one connected system.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Button href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
                  Book a free consultation
                  <Arrow />
                </Button>
              </Magnetic>
              <Button href="/leadpulz" variant="outlineOnDark" size="lg" className="w-full sm:w-auto">
                Explore LeadPulz
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-14">
              <StatStrip
                items={[
                  { value: "4", label: "Platforms in build" },
                  { value: "16+", label: "Integrations" },
                  { value: "<24h", label: "Response time" },
                ]}
              />
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="relative min-w-0 lg:pl-4"
          >
            <AgentConsole />
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- INTEGRATIONS MARQUEE ---------------- */

function IntegrationBand() {
  return (
    <section className="w-full border-y border-white/[0.06] bg-ink py-6">
      <Marquee duration={48}>
        {INTEGRATIONS.map((name) => (
          <span
            key={name}
            className="flex items-center gap-8 pr-8 font-mono text-xs uppercase tracking-[0.18em] text-on-dark-muted"
          >
            {name}
            <span className="h-1 w-1 rounded-full bg-white/20" aria-hidden="true" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------------- POSITIONING ---------------- */

function Positioning() {
  return (
    <section className="w-full bg-white py-24 lg:py-32">
      <Container>
        <Split
          eyebrow="About FlowFoundry"
          title={
            <>
              We build systems,
              <br />
              not just software.
            </>
          }
          image="/images/mission.png"
          imageAlt="FlowFoundry team designing an intelligent workflow"
          stat={{ value: "4-in-1", label: "AI · Automation · Software · Integration" }}
          reverse
        >
          <p className="text-[17px] leading-relaxed">
            We start by understanding how your business actually works — the
            workflows, bottlenecks, customer interactions, and existing tools —
            then design technology around those processes.
          </p>
          <div className="pt-4">
            <Checks items={ABOUT_POINTS} cols={1} />
          </div>
          <div className="pt-6">
            <Button href="/about" variant="secondary">
              About FlowFoundry
              <Arrow />
            </Button>
          </div>
        </Split>
      </Container>
    </section>
  );
}

/* ---------------- CAPABILITIES ---------------- */

function Capabilities() {
  return (
    <section className="w-full bg-paper py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              eyebrow="What we do"
              title="From disconnected tools to one intelligent system."
              lede="Instead of adding more software to your stack, we design a system around the way your business actually operates."
            />
          </motion.div>
        </Reveal>

        <div className="mt-14 lg:mt-20">
          <RowList items={CAPABILITIES} hrefBase="/services" />
        </div>

        <Reveal amount={0.5} className="mt-10 flex justify-end">
          <motion.div variants={fadeUp}>
            <Link
              href="/services"
              className="group inline-flex items-center gap-2 text-sm font-medium text-fg"
            >
              All services
              <ArrowUpRight
                weight="bold"
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- SYSTEM ---------------- */

function System() {
  return (
    <section className="relative w-full overflow-hidden bg-ink py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              invert
              align="split"
              eyebrow="How it connects"
              title="Conversations, logic, data, actions — one route."
              lede="We connect every layer so your business doesn't stop at collecting information. It acts on it."
            />
          </motion.div>
        </Reveal>

        <div className="mt-16 lg:mt-24">
          <SystemFlow />
        </div>
      </Container>
    </section>
  );
}

/* ---------------- LEADPULZ ---------------- */

function LeadPulz() {
  return (
    <section id="leadpulz" className="w-full overflow-hidden bg-white py-24 lg:py-32">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal amount={0.3} className="min-w-0">
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <Eyebrow>LeadPulz</Eyebrow>
              <Status>In build</Status>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-5 text-[clamp(1.9rem,3.8vw,3rem)] font-medium leading-[1.04] tracking-[-0.03em] text-fg text-balance"
            >
              Turn every phone call into a next step.
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-[50ch] text-[17px] leading-relaxed text-body">
              LeadPulz is our AI voice platform for handling calls, qualifying
              leads, booking appointments, following up, and connecting every
              conversation to your CRM.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Checks items={LEADPULZ_POINTS} />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="/leadpulz" variant="primary">
                Explore LeadPulz
                <Arrow />
              </Button>
              <Button href="/contact?interest=leadpulz" variant="secondary">
                Book a demo
              </Button>
            </motion.div>
          </Reveal>

          <Reveal amount={0.2} className="relative min-w-0">
            <motion.div variants={scaleIn} className="relative">
              <Device src="/images/dashboard.jpeg" alt="LeadPulz dashboard showing calls, qualification and bookings" />
            </motion.div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- USE CASES — horizontal rail ---------------- */

function UseCases() {
  const railRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const w = card ? card.offsetWidth + 20 : 360;
    el.scrollBy({ left: dir * w, behavior: "smooth" });
  };

  return (
    <section className="w-full overflow-hidden bg-paper py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3} className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Use cases"
              title="Built around real business processes."
              lede="Different teams have different workflows. The system adapts to your operation — not the other way around."
            />
          </motion.div>
          <motion.div variants={fadeUp} className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              aria-label="Previous"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-fg transition-all duration-300 hover:border-fg/40 active:scale-95"
            >
              <ArrowLeft weight="bold" className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              aria-label="Next"
              className="flex h-11 w-11 items-center justify-center rounded-full border border-line-strong bg-white text-fg transition-all duration-300 hover:border-fg/40 active:scale-95"
            >
              <ArrowRight weight="bold" className="h-4 w-4" />
            </button>
          </motion.div>
        </Reveal>
      </Container>

      <div
        ref={railRef}
        className="rail mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style={{ paddingInline: "max(1.25rem, calc((100vw - 1240px) / 2 + 3rem))" }}
      >
        {USE_CASES.map((u, i) => (
          <motion.article
            key={u.title}
            data-card
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: (i % 3) * 0.08 }}
            className={`group relative shrink-0 snap-start overflow-hidden rounded-2xl bg-ink ${
              i % 3 === 0 ? "w-[86vw] sm:w-[520px]" : "w-[78vw] sm:w-[400px]"
            } aspect-[4/5] sm:aspect-[5/6]`}
          >
            <Image
              src={u.image}
              alt={`${u.title} automation`}
              fill
              sizes="(max-width: 640px) 86vw, 520px"
              className="object-cover saturate-[0.85] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.15)_0%,rgba(10,13,20,0.2)_45%,rgba(10,13,20,0.92)_100%)]" />
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
              <Index dark>0{i + 1}</Index>
              <span className="rounded-full border border-white/15 bg-ink/50 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-white backdrop-blur-sm">
                {u.flow}
              </span>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-6">
              <h3 className="text-2xl font-medium tracking-[-0.02em] text-white">{u.title}</h3>
              <p className="mt-2 max-w-[40ch] text-sm leading-relaxed text-on-dark">{u.body}</p>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROJECTS ---------------- */

function Projects() {
  return (
    <section id="projects" className="w-full bg-white py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3} className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Work in progress"
              title="What we're building right now."
              lede="Client platforms alongside the systems we run FlowFoundry on."
            />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Button href="/portfolio" variant="secondary">
              All projects
              <Arrow />
            </Button>
          </motion.div>
        </Reveal>

        <Reveal step={0.08} className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr] lg:gap-5">
          {PROJECTS.map((p, i) => (
            <motion.div key={p.slug} variants={fadeUp} className={i === 0 ? "lg:row-span-2" : ""}>
              <Spotlight className="flex h-full flex-col rounded-2xl border border-line bg-white p-7 transition-colors duration-500 hover:border-line-strong sm:p-8">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                    {p.category}
                  </span>
                  <Status>{p.status}</Status>
                </div>
                <h3 className={`mt-8 font-medium tracking-[-0.025em] text-fg ${i === 0 ? "text-3xl sm:text-4xl" : "text-2xl"}`}>
                  {p.name}
                </h3>
                <p className="mt-3 max-w-[52ch] text-[15px] leading-relaxed text-body">{p.summary}</p>
                <ul className={`mt-6 grid gap-x-6 gap-y-2 ${i === 0 ? "sm:grid-cols-2" : ""}`}>
                  {(i === 0 ? p.highlights : p.highlights.slice(0, 3)).map((h) => (
                    <li key={h} className="flex items-center gap-2.5 text-sm text-body">
                      <span className="h-1 w-1 rounded-full bg-accent" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto flex items-center justify-between pt-8">
                  <p className="font-mono text-[10.5px] uppercase tracking-[0.12em] text-muted">
                    {p.services.join(" · ")}
                  </p>
                  {p.href ? (
                    <Link
                      href={p.href}
                      className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-fg"
                    >
                      Explore
                      <ArrowUpRight weight="bold" className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
                    </Link>
                  ) : null}
                </div>
              </Spotlight>
            </motion.div>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- WHY — sticky stack ---------------- */

function Why() {
  return (
    <section className="w-full bg-ink py-24 lg:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal amount={0.4}>
              <motion.div variants={fadeUp}>
                <SectionHeading
                  invert
                  eyebrow="Why FlowFoundry"
                  title="Technology built around the business — not the other way around."
                  lede="Good automation isn't about connecting random tools. It's about understanding the process first, then designing the right system around it."
                />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8">
                <Button href="/about" variant="outlineOnDark">
                  How we think
                  <Arrow />
                </Button>
              </motion.div>
            </Reveal>
          </div>
          <StickyStack items={WHY} />
        </div>
      </Container>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */

function ProcessSection() {
  return (
    <section className="w-full bg-white py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              eyebrow="How we work"
              title="From process to production."
              lede="Start with the business problem. Design the system. Build, integrate, launch, and improve."
            />
          </motion.div>
        </Reveal>
        <div className="mt-16 lg:mt-20">
          <Process steps={PROCESS} />
        </div>
      </Container>
    </section>
  );
}
