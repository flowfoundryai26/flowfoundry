"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Robot,
  FlowArrow,
  Code,
  Browser,
  ShoppingCartSimple,
  Plugs,
} from "@phosphor-icons/react";
import { Arrow, Button, Container, Eyebrow, Index, SectionHeading } from "@/components/ui";
import { Reveal, fadeUp, scaleIn } from "@/components/motion";
import { Bento, CTA, PageHero, Process } from "@/components/sections";

/* =========================================================
   DATA
========================================================= */

const SERVICES = [
  {
    id: "ai-agents",
    index: "01",
    title: "AI Agents",
    body: "Intelligent agents that understand conversations, access business knowledge, make decisions, and take action across your systems.",
    icon: <Robot className="h-5 w-5" />,
    tags: ["Voice & chat agents", "Lead qualification", "Support automation", "Knowledge assistants", "Action execution"],
    wide: true,
  },
  {
    id: "workflow-automation",
    index: "02",
    title: "Workflow Automation",
    body: "Turn repetitive, manual processes into connected workflows that move information and trigger the right action automatically.",
    icon: <FlowArrow className="h-5 w-5" />,
    tags: ["Lead routing", "Follow-ups", "Approvals", "Data sync"],
  },
  {
    id: "custom-software",
    index: "03",
    title: "Custom Software",
    body: "Purpose-built applications designed around your business workflows rather than forcing your team into generic software.",
    icon: <Code className="h-5 w-5" />,
    tags: ["Internal tools", "SaaS platforms", "Dashboards", "Portals"],
  },
  {
    id: "web-development",
    index: "04",
    title: "Web Development",
    body: "Websites and web applications designed for performance, clarity, conversion, and integration with your business systems.",
    icon: <Browser className="h-5 w-5" />,
    tags: ["Corporate sites", "Landing pages", "Web apps", "Performance"],
    wide: true,
  },
  {
    id: "ecommerce",
    index: "05",
    title: "eCommerce",
    body: "Connected commerce that combines storefronts, payments, customer journeys, operational automation, and integrations.",
    icon: <ShoppingCartSimple className="h-5 w-5" />,
    tags: ["Online stores", "Payments", "Order automation", "Inventory"],
  },
  {
    id: "integrations",
    index: "06",
    title: "Integrations",
    body: "Connect the tools your business already uses and keep data moving between systems without repetitive manual work.",
    icon: <Plugs className="h-5 w-5" />,
    tags: ["CRM", "Calendar", "REST APIs", "Databases", "Messaging"],
    wide: true,
  },
];

const ENGINEERING = [
  { index: "01", title: "Process", body: "Understand what happens today and where friction exists." },
  { index: "02", title: "Logic", body: "Define decisions, rules, routing, and automation behaviour." },
  { index: "03", title: "Data", body: "Identify the systems and information needed to make it work." },
  { index: "04", title: "Action", body: "Make the system update, notify, book, route, or execute automatically." },
];

const PROCESS = [
  { number: "01", title: "Discover", body: "We map your existing workflow, people, tools, bottlenecks, business rules, and desired outcomes." },
  { number: "02", title: "Design", body: "We define the architecture, user experience, integrations, automation logic, data flow, and plan." },
  { number: "03", title: "Build", body: "We develop the software, AI, workflows, and integrations, then test them together as one system." },
  { number: "04", title: "Launch", body: "We deploy, monitor how it performs, and refine it as requirements and operations evolve." },
];

const TECHNOLOGY = [
  { title: "AI & language systems", body: "LLMs, conversational AI, voice systems, retrieval, knowledge bases, and agent workflows." },
  { title: "Application engineering", body: "Modern frontend and backend architectures for reliable web applications, SaaS products, and business tools." },
  { title: "Automation & APIs", body: "Event-driven workflows, API integrations, webhooks, business rules, data synchronization, and orchestration." },
  { title: "Cloud & infrastructure", body: "Deployments designed for maintainability, security, observability, reliability, and future scale." },
];

const PROJECT_GROUPS = [
  {
    label: "Automation & AI agents",
    items: ["Lead & sales automation", "Customer support systems", "AI voice agents", "CRM automation", "Operations automation"],
  },
  {
    label: "Custom software",
    items: ["Internal business tools", "SaaS platforms", "Web applications", "Customer portals", "eCommerce systems"],
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function ServicesPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="Services"
        title="Technology built around your business."
        lede="FlowFoundry designs AI agents, automation, custom software, websites, eCommerce systems, and integrations around the processes that actually run your business."
        secondary="Start with the workflow, bottleneck, or opportunity. We design the technology around it — not the other way around."
        primaryCta={{ label: "Discuss your project", href: "/contact" }}
        secondaryCta={{ label: "Explore solutions", href: "/solutions" }}
        image="/images/use-cases/operations.webp"
        strip={
          <ul className="grid gap-3 lg:justify-items-end">
            {SERVICES.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.14em] text-on-dark-muted transition-colors hover:text-white"
                >
                  <span className="text-[10px]">{s.index}</span>
                  <span className="relative">
                    {s.title}
                    <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-accent-dark transition-transform duration-500 group-hover:scale-x-100" />
                  </span>
                </a>
              </li>
            ))}
          </ul>
        }
      />

      {/* SERVICES BENTO */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="Our services"
                title="One team for the systems your business runs on."
                lede="Combine AI, automation, software, and integrations into a solution designed around your operation."
              />
            </motion.div>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <Bento items={SERVICES} />
          </div>
        </Container>
      </section>

      {/* ENGINEERING */}
      <section className="w-full bg-paper py-24 lg:py-32">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal amount={0.3} className="lg:sticky lg:top-28">
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow="Business-first engineering"
                  title={
                    <>
                      We don&apos;t start with the tool.
                      <br />
                      We start with the workflow.
                    </>
                  }
                  lede="The right solution might be an AI agent, automation, a custom application, an integration, or all four. The architecture should follow the business problem."
                />
              </motion.div>
            </Reveal>

            <Reveal step={0.1} className="grid gap-4 sm:grid-cols-2">
              {ENGINEERING.map((e) => (
                <motion.div
                  key={e.index}
                  variants={fadeUp}
                  className="rounded-2xl border border-line bg-white p-7 transition-colors duration-500 hover:border-line-strong"
                >
                  <Index>{e.index}</Index>
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] text-fg">{e.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{e.body}</p>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PROCESS */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="How we work"
                title="From business problem to working system."
                lede="A structured process keeps technology aligned with the outcome you're trying to create."
              />
            </motion.div>
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <Process steps={PROCESS} />
          </div>
        </Container>
      </section>

      {/* TECHNOLOGY */}
      <section className="relative w-full overflow-hidden bg-ink py-24 lg:py-32">
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[42%] lg:block" aria-hidden="true">
          <Image
            src="/images/why/architecture.webp"
            alt=""
            fill
            sizes="42vw"
            className="object-cover opacity-[0.12] saturate-0"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0d14_0%,rgba(10,13,20,0.4)_60%,rgba(10,13,20,0.7)_100%)]" />
        </div>
        <Container className="relative">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal amount={0.3}>
              <motion.div variants={fadeUp}>
                <SectionHeading
                  invert
                  eyebrow="Technology"
                  title="Modern technology. Chosen for the problem."
                  lede="We avoid forcing every project into the same stack. Tools, platforms, and architecture are selected according to the requirements of the system."
                />
              </motion.div>
            </Reveal>
            <Reveal as="ol" step={0.1} className="divide-y divide-white/[0.07] border-y border-white/[0.07]">
              {TECHNOLOGY.map((t, i) => (
                <motion.li key={t.title} variants={fadeUp} className="group grid gap-3 py-6 sm:grid-cols-[56px_1fr] sm:gap-6">
                  <Index dark className="pt-1">0{i + 1}</Index>
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    <h3 className="text-lg font-medium tracking-[-0.01em] text-white">{t.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-on-dark">{t.body}</p>
                  </div>
                </motion.li>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* COMMON PROJECTS */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div
              variants={scaleIn}
              className="grid gap-10 rounded-2xl border border-line bg-paper p-8 sm:p-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:p-14"
            >
              <div>
                <Eyebrow>Common projects</Eyebrow>
                <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-fg">
                  What can we help you build?
                </h2>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-body">
                  These are the systems we build most often. If your project
                  doesn&apos;t fit neatly into one of them, that&apos;s usually
                  where the interesting work is.
                </p>
                <div className="mt-8">
                  <Button href="/contact" variant="primary">
                    Start a project
                    <Arrow />
                  </Button>
                </div>
              </div>
              <div className="grid gap-8 sm:grid-cols-2">
                {PROJECT_GROUPS.map((g) => (
                  <div key={g.label}>
                    <h3 className="font-mono text-2xs uppercase tracking-[0.16em] text-accent-strong">{g.label}</h3>
                    <ul className="mt-4 divide-y divide-line">
                      {g.items.map((it) => (
                        <li key={it} className="py-2.5 text-[15px] text-fg">{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      <CTA
        eyebrow="Start a project"
        title="Tell us what your business needs to do better."
        lede="Share the workflow, bottleneck, or system you're working on. We'll help you explore the right combination of AI, automation, software, and integrations."
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "Explore solutions", href: "/solutions" }}
        image="/images/use-cases/custom.webp"
      />
    </div>
  );
}
