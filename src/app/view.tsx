"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CaretRight } from "@phosphor-icons/react";
import { EXISTING_STACK, INTEGRATION_LOGOS, PROJECTS } from "@/lib/site";
import {
  Arrow,
  Button,
  Container,
  Eyebrow,
  Index,
  SectionHeading,
  Status,
} from "@/components/ui";
import { Magnetic, Marquee, Reveal, Words, fadeUp, scaleIn, stagger } from "@/components/motion";
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
    body: "Applications shaped around how your team works - portals, dashboards, internal tools, and platforms.",
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

/*
  Six use cases laid out as an asymmetric bento. `span` is the lg column
  count out of six, so each row closes exactly: 4+2, 2+2+2, 6. `media`
  marks the three cells that carry a photograph, which keeps the grid
  from reading as six identical text tiles.
*/
const USE_CASES = [
  {
    title: "Sales teams",
    body: "Respond to leads in seconds, qualify intelligently, and move prospects into booked meetings.",
    image: "/images/use-cases/sales.webp",
    flow: ["Lead", "Qualified", "Meeting"],
    span: 4,
    media: true,
  },
  {
    title: "Customer support",
    body: "Answer common questions from your knowledge base and escalate the rest to the right person.",
    image: "/images/use-cases/support.webp",
    flow: ["Customer", "AI", "Resolution"],
    span: 2,
    media: false,
  },
  {
    title: "Service businesses",
    body: "Collect requirements, check availability, and coordinate bookings without the admin.",
    image: "/images/use-cases/services.webp",
    flow: ["Enquiry", "Requirements", "Booking"],
    span: 2,
    media: false,
  },
  {
    title: "eCommerce",
    body: "Connect conversations, orders, support, and notifications into one operational flow.",
    image: "/images/use-cases/ecommerce.webp",
    flow: ["Customer", "Order", "Support"],
    span: 2,
    media: true,
  },
  {
    title: "Operations",
    body: "Automate approvals and updates between systems and remove the bottlenecks between teams.",
    image: "/images/use-cases/operations.webp",
    flow: ["Request", "Approval", "Action"],
    span: 2,
    media: false,
  },
  {
    title: "Custom workflows",
    body: "Your process doesn't have to fit a template. We design the system around how your team actually works.",
    image: "/images/use-cases/custom.webp",
    flow: ["Your process", "Your system"],
    span: 6,
    media: true,
  },
];

const WHY = [
  {
    index: "01",
    title: "Business-first architecture",
    body: "We start with the process, the bottleneck, and the outcome you want - then choose the technology.",
    image: "/images/why/architecture.webp",
    alt: "Connected business architecture diagram",
  },
  {
    index: "02",
    title: "End-to-end implementation",
    body: "AI, automation, software, integrations, and deployment designed and delivered as one connected system.",
    image: "/images/why/implementation.webp",
    alt: "Implementation workflow",
  },
  {
    index: "03",
    title: "Built for integration",
    body: "We work with the tools you already run instead of adding another isolated one to the stack.",
    image: "/images/why/integration.webp",
    alt: "Integration between business systems",
  },
  {
    index: "04",
    title: "Designed to scale",
    body: "Build the right foundation now and extend it as customers, operations, and requirements grow.",
    image: "/images/why/scale.webp",
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
      <SignalBand />
      <ExistingBusiness />
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
        lede="Tell us what's slowing your business down. We'll map the system that removes it - AI, automation, software, or all three."
        primary={{ label: "Book consultation", href: "/contact" }}
        secondary={{ label: "See our services", href: "/services" }}
        image="/images/mission.webp"
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
            src="/images/use-cases/sales.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 1023px) 100vw, 58vw"
            className="object-cover object-[65%_center] opacity-[0.28] saturate-[0.8]"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#0b1020_0%,#0b1020_30%,rgba(11,16,32,0.75)_60%,rgba(11,16,32,0.6)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,32,0.5)_0%,rgba(11,16,32,0)_35%,#0b1020_100%)]" />
      </div>

      <Container className="relative z-10">
        <div className="grid min-h-[calc(100dvh-72px)] items-center gap-14 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-20">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.1, 0.05)} className="min-w-0">
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <Eyebrow dark>For businesses with repetitive operations</Eyebrow>
            </motion.div>

            {/*
              The H1 answers what the visitor gets, not what we are.
              "Scale without scaling repetitive work" names the outcome;
              the sub-head names the capability and the constraint.
            */}
            <h1 className="mt-7 max-w-[26ch] text-[clamp(2.05rem,3.05vw,2.6rem)] font-medium leading-[1.04] tracking-[-0.03em] text-white text-balance">
              <Words
                text="Scale your business without scaling repetitive work."
                delay={0.2}
              />
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[54ch] text-base leading-relaxed text-on-dark sm:text-lg"
            >
              AI agents, automation and custom software, built around the
              tools your team already uses.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Magnetic>
                <Button href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
                  Book consultation
                  <Arrow />
                </Button>
              </Magnetic>
              <Button href="/solutions" variant="outlineOnDark" size="lg" className="w-full sm:w-auto">
                Explore our solutions
              </Button>
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
    <section className="w-full border-y border-white/[0.06] bg-ink py-7">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          {/*
            A single lead-in for the whole strip. Without it a logo row under
            a hero reads as "our customers", and these are systems we connect
            to, not clients. Per-logo captions stay off.
          */}
          <p className="shrink-0 font-mono text-2xs uppercase tracking-[0.18em] text-on-dark-muted">
            Connects with
          </p>

          {/*
            The set is rendered twice. Marquee loops by translating its track
            -50%, so ONE copy of the children has to be at least as wide as
            the visible strip or a gap cycles through the window. Ten marks
            run about 700px; the strip is ~990px at 1440 and wider still on
            a large display. The repeat is aria-hidden so each brand is
            announced once.
          */}
          <Marquee duration={54} className="min-w-0 flex-1">
            {[0, 1].map((copy) =>
              INTEGRATION_LOGOS.map((logo) => (
              <span
                key={`${copy}-${logo.slug}`}
                aria-hidden={copy === 1 ? "true" : undefined}
                className="flex shrink-0 items-center pr-12"
              >
                {/*
                  Plain <img>: these are tiny single-colour SVGs, so the
                  optimiser has nothing to do and next/image would only add
                  a request per mark.
                */}
                <img
                  src={`/images/logos/${logo.slug}.svg`}
                  alt={logo.name}
                  width={26}
                  height={26}
                  loading="lazy"
                  decoding="async"
                  style={
                    "scale" in logo
                      ? { transform: `scale(${logo.scale})` }
                      : undefined
                  }
                  className="h-[26px] w-auto opacity-60 transition-opacity duration-300 hover:opacity-100"
                />
              </span>
              ))
            )}
          </Marquee>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- SIGNALS ----------------
   The three figures that used to sit inside the hero. They are real
   operating facts, so they keep their place on the page - just not
   competing with the headline for the first impression.
------------------------------------------------ */

function SignalBand() {
  return (
    <section className="w-full bg-ink py-14 lg:py-18">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16">
          <motion.p
            variants={fadeUp}
            className="max-w-[34ch] text-lg leading-snug tracking-[-0.02em] text-white sm:text-xl"
          >
            Small team, working systems, and a reply before you have moved on
            to something else.
          </motion.p>

          <motion.div variants={fadeUp}>
            <StatStrip
              items={[
                { value: "4", label: "Platforms in build" },
                { value: "16+", label: "Integrations" },
                { value: "<24h", label: "Response time" },
              ]}
            />
          </motion.div>
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- BUILT AROUND YOUR EXISTING BUSINESS ----------------
   The core differentiator, stated immediately after the hero: we connect
   the stack you run rather than asking you to replace it. Ends on a
   concrete worked example so the claim is not abstract.
------------------------------------------------------------------- */

function ExistingBusiness() {
  return (
    <section className="w-full bg-surface py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              title="We don't ask you to replace what already works."
              lede="Most automation projects fail because they start with a migration. We start with the systems you already run and connect them."
            />
          </motion.div>
        </Reveal>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          {/* The stack we connect to */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
              What we connect and improve
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {EXISTING_STACK.map((s) => (
                <li
                  key={s}
                  className="rounded-full border border-line bg-surface px-3.5 py-2 text-xs font-medium text-body transition-colors duration-300 hover:border-accent/40 hover:text-accent-strong"
                >
                  {s}
                </li>
              ))}
            </ul>

            <p className="mt-8 max-w-[46ch] text-[15px] leading-relaxed text-body">
              If your CRM works, keep it. If your team lives in WhatsApp, we
              build there. Replacing a functioning system is a separate project,
              and it is rarely what the actual bottleneck requires.
            </p>

            <div className="mt-8">
              <Button href="/how-we-work" variant="secondary">
                How we scope this
                <Arrow />
              </Button>
            </div>
          </div>

          {/* Worked example — a real lead moving through the system */}
          <div>
            <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
              One lead, end to end
            </p>

            <Reveal
              as="ol"
              step={0.06}
              className="mt-6 border-l border-line-strong"
            >
              {[
                {
                  layer: "Conversations",
                  step: "A lead enquires on your website",
                  detail:
                    "Or calls, or messages WhatsApp. Every channel enters the same path.",
                },
                {
                  layer: "AI / business logic",
                  step: "An agent qualifies the enquiry",
                  detail:
                    "It asks your questions, in your order, and captures structured answers.",
                },
                {
                  layer: "Data",
                  step: "A CRM record is created",
                  detail:
                    "Deduplicated against existing contacts, with the source and captured fields attached.",
                },
                {
                  layer: "Actions",
                  step: "The right person is notified",
                  detail:
                    "Assigned by your rules, with a response clock running so nothing sits unowned.",
                },
                {
                  layer: "Actions",
                  step: "Follow-up is triggered",
                  detail:
                    "On your schedule, stopping the moment the prospect replies.",
                },
                {
                  layer: "Actions",
                  step: "An appointment is booked",
                  detail:
                    "Against live calendar availability, written back as a confirmed event.",
                },
              ].map((s, i) => (
                <motion.li
                  key={s.step}
                  variants={fadeUp}
                  className="relative pb-8 pl-7 last:pb-0"
                >
                  <span
                    aria-hidden="true"
                    className="absolute -left-[5.5px] top-[7px] h-[9px] w-[9px] rounded-full border-2 border-accent bg-surface"
                  />
                  <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-strong">
                    {s.layer}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-baseline gap-x-3">
                    <Index>{String(i + 1).padStart(2, "0")}</Index>
                    <h3 className="text-[17px] font-medium tracking-[-0.015em] text-fg">
                      {s.step}
                    </h3>
                  </div>
                  <p className="mt-1.5 max-w-[52ch] text-[15px] leading-relaxed text-body">
                    {s.detail}
                  </p>
                </motion.li>
              ))}
            </Reveal>

            <p className="mt-8 text-[14px] leading-relaxed text-muted">
              Six steps, none of which required a person to remember anything.
              The sales conversation still happens with a human.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- POSITIONING ---------------- */

function Positioning() {
  return (
    <section className="w-full bg-surface py-24 lg:py-32">
      <Container>
        <Split
          title={
            <>
              We build systems,
              <br />
              not just software.
            </>
          }
          image="/images/mission.webp"
          imageAlt="FlowFoundry team designing an intelligent workflow"
          stat={{ value: "4-in-1", label: "AI · Automation · Software · Integration" }}
          reverse
        >
          <p className="text-[17px] leading-relaxed">
            We start by understanding how your business actually works - the
            workflows, bottlenecks, customer interactions, and existing tools - 
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
    <section className="w-full bg-surface-2 py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
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
              title="Conversations, logic, data, actions - one route."
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
    <section id="leadpulz" className="w-full overflow-hidden bg-surface py-24 lg:py-32">
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
                Book consultation
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

/* ---------------- USE CASES - asymmetric bento ----------------
   Was a horizontal rail of 620px-tall photo cards: the title and body
   sat below the fold of each card, and the flow and index labels were
   overlaid directly on the photography. Rebuilt as a bento so the copy
   leads and the imagery supports it, and so the page carries a layout
   family other than the two-column split it uses five times elsewhere.
--------------------------------------------------------------- */

function UseCaseFlow({ steps, dark }: { steps: readonly string[]; dark: boolean }) {
  return (
    <ol
      className={`flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] uppercase tracking-[0.14em] ${
        dark ? "text-accent-dark" : "text-accent-strong"
      }`}
    >
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          {i > 0 ? (
            <CaretRight
              weight="bold"
              aria-hidden="true"
              className="h-2.5 w-2.5 opacity-50"
            />
          ) : null}
          {step}
        </li>
      ))}
    </ol>
  );
}

function UseCases() {
  return (
    <section className="w-full bg-surface-2 py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp} className="max-w-[46ch]">
            <SectionHeading
              title="Built around real business processes."
              lede="Different teams have different workflows. The system adapts to your operation, not the other way around."
            />
          </motion.div>
        </Reveal>

        <Reveal
          step={0.07}
          amount={0.15}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-18 lg:grid-cols-6 lg:gap-5"
        >
          {USE_CASES.map((u) => {
            const wide = u.span === 6;
            return (
              <motion.article
                key={u.title}
                variants={fadeUp}
                className={`group relative flex min-h-[260px] flex-col overflow-hidden rounded-2xl ${
                  wide ? "sm:col-span-2" : ""
                } ${
                  u.span === 4
                    ? "lg:col-span-4"
                    : u.span === 6
                      ? "lg:col-span-6"
                      : "lg:col-span-2"
                } ${
                  u.media
                    ? "bg-ink"
                    : "border border-line bg-surface"
                }`}
              >
                {u.media ? (
                  <>
                    <Image
                      src={u.image}
                      alt=""
                      fill
                      sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 60vw"
                      className="object-cover saturate-[0.85] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                    {/* Legible floor for the copy, not a decorative wash */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-[linear-gradient(180deg,rgba(11,16,32,0.35)_0%,rgba(11,16,32,0.55)_45%,rgba(11,16,32,0.94)_100%)]"
                    />
                  </>
                ) : null}

                <div
                  className={`relative flex h-full flex-col gap-4 p-7 lg:p-8 ${
                    // photo cards sit their copy on the dark floor of the
                    // gradient; text cards read top-down with the flow pinned
                    u.media ? "justify-end" : "justify-between"
                  }`}
                >
                  <div>
                    <h3
                      className={`text-xl font-medium tracking-[-0.02em] lg:text-2xl ${
                        u.media ? "text-white" : "text-fg"
                      }`}
                    >
                      {u.title}
                    </h3>
                    <p
                      className={`mt-3 max-w-[46ch] text-sm leading-relaxed ${
                        u.media ? "text-on-dark" : "text-body"
                      }`}
                    >
                      {u.body}
                    </p>
                  </div>
                  <UseCaseFlow steps={u.flow} dark={u.media} />
                </div>
              </motion.article>
            );
          })}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- PROJECTS - editorial index ----------------
   Was a 2-col card grid where the featured card carried lg:row-span-2
   and ran ~450px of dead white below its content. There are no product
   screenshots for these platforms, and dropping stock photography in
   would imply shipped UI that does not exist, so this leans typographic
   instead: rows size to their content, and the whole row is the target.
------------------------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="w-full bg-surface py-24 lg:py-32">
      <Container>
        <Reveal
          amount={0.3}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
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

        <Reveal
          step={0.07}
          amount={0.15}
          className="mt-14 border-t border-line lg:mt-18"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.slug}
              variants={fadeUp}
              className="border-b border-line"
            >
              <Link
                href={p.href ?? "/portfolio"}
                className="group grid gap-6 py-9 transition-colors duration-500 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)_auto] lg:gap-12 lg:py-11"
              >
                <div className="min-w-0">
                  <p className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">
                    {p.category}
                  </p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-fg transition-colors duration-500 group-hover:text-accent-strong lg:text-[2rem] lg:leading-[1.1]">
                    {p.name}
                  </h3>
                </div>

                <div className="min-w-0">
                  <p className="max-w-[58ch] text-[15px] leading-relaxed text-body">
                    {p.summary}
                  </p>
                  {/*
                    Chips rather than a dotted bullet list: four capabilities
                    scan faster side by side, and it drops a decorative dot
                    from every line.
                  */}
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {p.highlights.slice(0, 4).map((h) => (
                      <li
                        key={h}
                        className="rounded-full border border-line bg-surface-2 px-3 py-1 text-xs text-body"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end lg:justify-start lg:gap-6">
                  <Status>{p.status}</Status>
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-fg transition-all duration-500 group-hover:border-accent group-hover:bg-accent group-hover:text-white">
                    <ArrowUpRight weight="bold" className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </motion.article>
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
                  title="Technology built around the business - not the other way around."
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
    <section className="w-full bg-surface py-24 lg:py-32">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
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
