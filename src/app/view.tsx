"use client";

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
import { Marquee, Reveal, Words, fadeUp, scaleIn, stagger } from "@/components/motion";
import { AgentConsole, Device, SystemFlow } from "@/components/visuals";
import {
  CTA,
  Checks,
  Process,
  RowList,
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
  The four disciplines, as the four things we actually put our hands
  on. This replaced a "4-in-1" stat card floating over a generated
  stock photograph: the photograph was AI-made and carried invented
  figures baked into its pixels, and the card said less than the list
  it was sitting on.
*/
const DISCIPLINES = [
  { index: "01", title: "AI", body: "Agents that converse, decide, and act." },
  { index: "02", title: "Automation", body: "Work that runs without being chased." },
  { index: "03", title: "Software", body: "Tools shaped around your process." },
  { index: "04", title: "Integration", body: "The systems you already run, connected." },
];

/*
  Six use cases as an asymmetric bento. `span` is the lg column count
  out of six, so each row closes exactly: 4+2, 2+2+2, 6.

  The photography is gone. All six cells carried images from one
  generated batch - the same invented office, a fake FlowFoundry
  logo, and fabricated metrics ("1,248 leads processed", "76%
  conversion rate") painted into the screens behind the people. The
  copy was always the point; now it leads, and the grid gets its
  rhythm from size instead of from pictures.
*/
const USE_CASES = [
  {
    title: "Sales teams",
    body: "Respond to leads in seconds, qualify intelligently, and move prospects into booked meetings.",
    flow: ["Lead", "Qualified", "Meeting"],
    span: 4,
  },
  {
    title: "Customer support",
    body: "Answer common questions from your knowledge base and escalate the rest to the right person.",
    flow: ["Customer", "AI", "Resolution"],
    span: 2,
  },
  {
    title: "Service businesses",
    body: "Collect requirements, check availability, and coordinate bookings without the admin.",
    flow: ["Enquiry", "Requirements", "Booking"],
    span: 2,
  },
  {
    title: "eCommerce",
    body: "Connect conversations, orders, support, and notifications into one operational flow.",
    flow: ["Customer", "Order", "Support"],
    span: 2,
  },
  {
    title: "Operations",
    body: "Automate approvals and updates between systems and remove the bottlenecks between teams.",
    flow: ["Request", "Approval", "Action"],
    span: 2,
  },
  {
    title: "Custom workflows",
    body: "Your process doesn't have to fit a template. We design the system around how your team actually works.",
    flow: ["Your process", "Your system"],
    span: 6,
  },
];

const WHY = [
  {
    index: "01",
    title: "Business-first architecture",
    body: "We start with the process, the bottleneck, and the outcome you want - then choose the technology.",
  },
  {
    index: "02",
    title: "End-to-end implementation",
    body: "AI, automation, software, integrations, and deployment designed and delivered as one connected system.",
  },
  {
    index: "03",
    title: "Built for integration",
    body: "We work with the tools you already run instead of adding another isolated one to the stack.",
  },
  {
    index: "04",
    title: "Designed to scale",
    body: "Build the right foundation now and extend it as customers, operations, and requirements grow.",
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
      />
    </div>
  );
}

/* ---------------- HERO ----------------

   No photograph behind the text any more. The one that was there was
   a generated conference room at 28% opacity with "Smarter
   Conversations Bigger Opportunities" painted into the wall, which
   read as grey mush and claimed nothing true. The console on the
   right is the visual: it is the product, it is built in code, and
   it is the only saturated thing on the page.
--------------------------------------- */

function Hero() {
  return (
    <section className="w-full bg-ink">
      <Container>
        <div className="grid items-center gap-14 pb-20 pt-24 lg:grid-cols-[1fr_1.05fr] lg:gap-16 lg:pb-28 lg:pt-32">
          <motion.div initial="hidden" animate="visible" variants={stagger(0.05, 0.04)} className="min-w-0">
            <motion.div variants={fadeUp}>
              <Eyebrow>For businesses with repetitive operations</Eyebrow>
            </motion.div>

            {/*
              The H1 answers what the visitor gets, not what we are.
              "Scale without scaling repetitive work" names the outcome;
              the sub-head names the capability and the constraint.
            */}
            <h1 className="mt-7 max-w-[19ch] text-[clamp(2.25rem,4vw,3.25rem)] font-medium leading-[1.06] tracking-[-0.03em] text-fg text-balance">
              <Words
                text="Scale your business without scaling repetitive work"
                delay={0.12}
              />
            </h1>

            <motion.p
              variants={fadeUp}
              className="mt-7 max-w-[46ch] text-[17px] leading-relaxed text-body sm:text-lg"
            >
              AI agents, automation and custom software, built around the
              tools your team already uses.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
                Book consultation
                <Arrow />
              </Button>
              <Button href="/solutions" variant="outlineOnDark" size="lg" className="w-full sm:w-auto">
                Explore our solutions
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={scaleIn}
            className="relative min-w-0"
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
    <section className="w-full border-y border-line bg-ink py-7">
      <Container>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:gap-10">
          {/*
            A single lead-in for the whole strip. Without it a logo row under
            a hero reads as "our customers", and these are systems we connect
            to, not clients. Per-logo captions stay off.
          */}
          <p className="shrink-0 text-[13px] text-muted">Connects with</p>

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
                    width={24}
                    height={24}
                    loading="lazy"
                    decoding="async"
                    style={
                      "scale" in logo
                        ? { transform: `scale(${logo.scale})` }
                        : undefined
                    }
                    className="h-6 w-auto opacity-55 transition-opacity duration-200 hover:opacity-100"
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
    <section className="w-full bg-ink py-16 lg:py-20">
      <Container>
        <Reveal className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end lg:gap-16">
          <motion.p
            variants={fadeUp}
            className="max-w-[34ch] text-lg leading-snug tracking-[-0.02em] text-fg sm:text-xl"
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

   The left column is sticky now. It is much shorter than the six-step
   route beside it, and side by side they left a 350px dead band at the
   bottom of the section.
------------------------------------------------------------------- */

function ExistingBusiness() {
  return (
    <section className="w-full bg-surface py-20 lg:py-24">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              title="We don't ask you to replace what already works"
              lede="Most automation projects fail because they start with a migration. We start with the systems you already run and connect them."
            />
          </motion.div>
        </Reveal>

        <div className="mt-14 grid items-start gap-14 lg:mt-20 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          {/* The stack we connect to */}
          <div className="lg:sticky lg:top-28">
            <p className="text-[13px] text-muted">What we connect and improve</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {EXISTING_STACK.map((s) => (
                <li
                  key={s}
                  className="rounded-md border border-line bg-ink-2 px-3 py-1.5 text-[13px] text-body transition-colors duration-200 hover:border-line-strong hover:text-fg"
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
            <p className="text-[13px] text-muted">One lead, end to end</p>

            <Reveal
              as="ol"
              step={0.05}
              className="relative mt-5 border-l border-line-strong"
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
                    className="absolute -left-[4px] top-[9px] h-[7px] w-[7px] rounded-full bg-accent"
                  />
                  <p className="text-[13px] text-muted">{s.layer}</p>
                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3">
                    <Index>{String(i + 1).padStart(2, "0")}</Index>
                    <h3 className="text-[17px] font-medium tracking-[-0.015em] text-fg">
                      {s.step}
                    </h3>
                  </div>
                  <p className="mt-2 max-w-[52ch] text-[15px] leading-relaxed text-body">
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

/* ---------------- POSITIONING ----------------
   Was a two-column split against a generated photograph with a
   "4-in-1" card floating over its corner. The photo invented its own
   statistics, and "4-in-1" was a number standing in for four nouns.
   The four nouns are now simply on the page.
------------------------------------------------ */

function Positioning() {
  return (
    <section className="w-full bg-surface pb-20 lg:pb-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[1.05fr_1fr] lg:gap-20">
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                title={
                  <>
                    We build systems,
                    <br />
                    not just software
                  </>
                }
              />
            </motion.div>
            <motion.p variants={fadeUp} className="mt-7 max-w-[52ch] text-[17px] leading-relaxed text-body">
              We start by understanding how your business actually works - the
              workflows, bottlenecks, customer interactions, and existing tools
              - then design technology around those processes.
            </motion.p>
            <motion.div variants={fadeUp} className="mt-8">
              <Checks items={ABOUT_POINTS} cols={1} />
            </motion.div>
            <motion.div variants={fadeUp} className="mt-9">
              <Button href="/about" variant="secondary">
                About FlowFoundry
                <Arrow />
              </Button>
            </motion.div>
          </Reveal>

          <Reveal amount={0.2} step={0.05} as="ul" className="grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2">
            {DISCIPLINES.map((d) => (
              <motion.li key={d.index} variants={fadeUp} className="bg-ink-2 p-7 sm:p-8">
                <Index>{d.index}</Index>
                <h3 className="mt-4 text-xl font-medium tracking-[-0.02em] text-fg">
                  {d.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-body">
                  {d.body}
                </p>
              </motion.li>
            ))}
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

/* ---------------- CAPABILITIES ---------------- */

function Capabilities() {
  return (
    <section className="w-full bg-surface-2 py-20 lg:py-24">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              title="From disconnected tools to one intelligent system"
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
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5"
                aria-hidden="true"
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
    <section className="w-full bg-ink py-20 lg:py-24">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              title="Conversations, logic, data, actions - one route"
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
    <section id="leadpulz" className="w-full overflow-hidden bg-surface py-20 lg:py-24">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal amount={0.3} className="min-w-0">
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Eyebrow>LeadPulz</Eyebrow>
              <Status>In build</Status>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              className="mt-6 max-w-[16ch] text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.06] tracking-[-0.03em] text-fg text-balance"
            >
              Turn every phone call into a next step
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-body">
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
   Copy leads. The grid gets its rhythm from cell size, which is what
   the bento was for in the first place - the photographs were doing
   the work of making six cells look different from each other, and
   they were generated pictures of a company that does not exist.
--------------------------------------------------------------- */

function UseCaseFlow({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-muted">
      {steps.map((step, i) => (
        <li key={step} className="flex items-center gap-2">
          {i > 0 ? (
            <CaretRight
              aria-hidden="true"
              className="h-3 w-3 shrink-0 text-muted"
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
    <section className="w-full bg-surface-2 py-20 lg:py-24">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp} className="max-w-[46ch]">
            <SectionHeading
              title="Built around real business processes"
              lede="Different teams have different workflows. The system adapts to your operation, not the other way around."
            />
          </motion.div>
        </Reveal>

        <Reveal
          step={0.05}
          amount={0.15}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:mt-20 lg:grid-cols-6 lg:gap-5"
        >
          {USE_CASES.map((u) => (
            <motion.article
              key={u.title}
              variants={fadeUp}
              className={`group flex min-h-[220px] flex-col justify-between gap-6 rounded-xl border border-line bg-ink-2 p-7 transition-colors duration-200 hover:border-line-strong lg:p-8 ${
                u.span === 6 ? "sm:col-span-2" : ""
              } ${
                u.span === 4
                  ? "lg:col-span-4"
                  : u.span === 6
                    ? "lg:col-span-6"
                    : "lg:col-span-2"
              }`}
            >
              <div>
                <h3 className="text-xl font-medium tracking-[-0.02em] text-fg lg:text-2xl">
                  {u.title}
                </h3>
                <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-body">
                  {u.body}
                </p>
              </div>
              <UseCaseFlow steps={u.flow} />
            </motion.article>
          ))}
        </Reveal>
      </Container>
    </section>
  );
}

/* ---------------- PROJECTS - editorial index ----------------
   Rows size to their content and the whole row is the target. There
   are no product screenshots for these platforms, and stock imagery
   would imply shipped UI that does not exist.
------------------------------------------------------------- */

function Projects() {
  return (
    <section id="projects" className="w-full bg-surface py-20 lg:py-24">
      <Container>
        <Reveal
          amount={0.3}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <motion.div variants={fadeUp}>
            <SectionHeading
              eyebrow="Work in progress"
              title="What we're building right now"
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
          step={0.05}
          amount={0.15}
          className="mt-14 border-t border-line lg:mt-20"
        >
          {PROJECTS.map((p) => (
            <motion.article
              key={p.slug}
              variants={fadeUp}
              className="border-b border-line"
            >
              <Link
                href={p.href ?? "/portfolio"}
                className="group grid gap-6 py-9 transition-colors duration-200 lg:grid-cols-[minmax(0,0.38fr)_minmax(0,1fr)_auto] lg:gap-12 lg:py-11"
              >
                <div className="min-w-0">
                  <p className="text-[13px] text-muted">{p.category}</p>
                  <h3 className="mt-3 text-2xl font-medium tracking-[-0.025em] text-fg lg:text-[2rem] lg:leading-[1.1]">
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
                        className="rounded-md border border-line bg-surface-2 px-3 py-1.5 text-[13px] text-muted"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between gap-5 lg:flex-col lg:items-end lg:justify-start lg:gap-6">
                  <Status>{p.status}</Status>
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-line text-muted transition-colors duration-200 group-hover:border-line-strong group-hover:bg-ink-2 group-hover:text-fg">
                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
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
    <section className="w-full bg-ink py-20 lg:py-24">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal amount={0.4}>
              <motion.div variants={fadeUp}>
                <SectionHeading
                  title="Technology built around the business - not the other way around"
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
    <section className="w-full bg-surface py-20 lg:py-24">
      <Container>
        <Reveal amount={0.3}>
          <motion.div variants={fadeUp}>
            <SectionHeading
              align="split"
              title="From process to production"
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
