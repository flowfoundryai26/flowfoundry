"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { Arrow, Button, Chip, Container, Eyebrow, Index, SectionHeading } from "@/components/ui";
import { Reveal, Spotlight, fadeUp, scaleIn } from "@/components/motion";
import { CTA, PageHero, Process } from "@/components/sections";

/* =========================================================
   DATA
========================================================= */

const SOLUTIONS = [
  {
    id: "lead-generation",
    index: "01",
    title: "Lead Generation Automation",
    problem: "Leads arrive from multiple channels, but response and qualification often depend on manual follow-up.",
    solution: "Connect lead sources to AI agents, qualification logic, CRM workflows, and automated follow-ups so opportunities move forward without unnecessary delay.",
    outcome: "A more consistent lead-handling process with faster routing and better visibility.",
    workflow: ["Lead captured", "AI engagement", "Qualification", "CRM update", "Follow-up"],
    capabilities: ["Multi-channel lead capture", "Qualification workflows", "Lead scoring and routing", "Automated follow-ups", "CRM synchronization"],
    image: "/images/use-cases/sales.png",
  },
  {
    id: "sales",
    index: "02",
    title: "Sales Automation",
    problem: "Sales teams lose time switching between outreach, qualification, calendars, CRM updates, and follow-ups.",
    solution: "Create connected sales workflows that automate repetitive coordination while keeping the sales team involved where human judgment matters.",
    outcome: "A cleaner pipeline with fewer manual handoffs and more consistent follow-up.",
    workflow: ["Prospect", "Conversation", "Qualified", "Meeting", "Pipeline"],
    capabilities: ["Lead engagement", "Qualification", "Meeting scheduling", "Follow-up automation", "Pipeline workflows"],
    image: "/images/mission.png",
  },
  {
    id: "support",
    index: "03",
    title: "Customer Support Automation",
    problem: "Support teams repeatedly answer the same questions while complex requests need careful routing and context.",
    solution: "Use AI agents and knowledge systems to handle common conversations, retrieve relevant information, and route complex cases to the right person.",
    outcome: "More consistent support while preserving human escalation for important conversations.",
    workflow: ["Customer", "AI support", "Knowledge", "Resolution", "Escalation"],
    capabilities: ["AI support agents", "Knowledge base integration", "Conversation routing", "Human escalation", "Support workflow automation"],
    image: "/images/use-cases/support.png",
  },
  {
    id: "operations",
    index: "04",
    title: "Operations Automation",
    problem: "Approvals, notifications, data entry, task handoffs, and reporting create unnecessary administrative work.",
    solution: "Connect operational tools and business rules so information automatically triggers the next step in the process.",
    outcome: "Less repetitive coordination and clearer operational workflows across teams.",
    workflow: ["Request", "Rules", "Approval", "System update", "Notification"],
    capabilities: ["Approval workflows", "Task automation", "Notifications", "Data movement", "Internal process automation"],
    image: "/images/use-cases/operations.png",
  },
  {
    id: "crm",
    index: "05",
    title: "CRM Automation",
    problem: "CRM systems quickly lose value when updates, activity logs, lead stages, and customer data rely on manual entry.",
    solution: "Connect your CRM to conversations, lead sources, calendars, applications, and operational systems so records stay aligned with actual business activity.",
    outcome: "Cleaner customer data and fewer repetitive CRM updates for the team.",
    workflow: ["Activity", "Capture", "Sync", "CRM", "Next action"],
    capabilities: ["Automatic record updates", "Data synchronization", "Lead stage workflows", "Activity tracking", "System integrations"],
    image: "/images/why/integration.png",
  },
  {
    id: "appointments",
    index: "06",
    title: "Appointment Automation",
    problem: "Booking meetings manually creates delays, calendar conflicts, missed reminders, and unnecessary back-and-forth.",
    solution: "Connect lead conversations, qualification rules, calendars, confirmations, reminders, and CRM updates into one booking workflow.",
    outcome: "A smoother path from interested prospect to confirmed appointment.",
    workflow: ["Qualified lead", "Availability", "Booking", "Confirmation", "Reminder"],
    capabilities: ["Calendar integration", "Availability checks", "Automated booking", "Confirmations", "Reminder workflows"],
    image: "/images/use-cases/services.png",
  },
];

const LAYERS = [
  { index: "01", title: "Conversations", body: "Calls, forms, chat, email, lead enquiries, and customer interactions." },
  { index: "02", title: "Business logic", body: "Rules, qualification, routing, decisions, approvals, and automation logic." },
  { index: "03", title: "Data", body: "CRM records, databases, calendars, knowledge, analytics, and application data." },
  { index: "04", title: "Actions", body: "Book meetings, update systems, send follow-ups, create tasks, and trigger workflows." },
];

const PROCESS = [
  { number: "01", title: "Understand", body: "We map the existing process, tools, people, decisions, bottlenecks, and desired outcome." },
  { number: "02", title: "Design", body: "We define the automation logic, system architecture, integrations, and user experience." },
  { number: "03", title: "Build", body: "We develop, connect, and test the components as one complete business workflow." },
  { number: "04", title: "Improve", body: "We launch, monitor, refine, and extend the system as your business evolves." },
];

const INDUSTRIES = [
  "Professional Services", "Sales Teams", "Service Businesses", "eCommerce",
  "Customer Support", "Operations Teams", "SaaS", "Education",
];

/* =========================================================
   PAGE
========================================================= */

export default function SolutionsPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="Business solutions"
        title="Automate the process, not just the task."
        lede="FlowFoundry designs intelligent workflows around real business challenges — from lead handling and sales to support, operations, CRM, and appointment management."
        secondary="We connect conversations, business logic, data, and actions so your systems do more than store information — they move work forward."
        primaryCta={{ label: "Discuss your workflow", href: "/contact" }}
        secondaryCta={{ label: "Our services", href: "/services" }}
        image="/images/use-cases/support.png"
        strip={
          <ul className="grid gap-3 lg:justify-items-end">
            {SOLUTIONS.map((s) => (
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

      {/* INTRO */}
      <section className="w-full bg-white pt-24 lg:pt-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="Where we help"
                title="Solutions built around real business workflows."
                lede="We don't force every client into the same automation template. Each system is designed around the way the process actually works."
              />
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* SOLUTIONS — alternating */}
      <section className="w-full bg-white py-16 lg:py-24">
        <Container>
          <div className="space-y-8 lg:space-y-10">
            {SOLUTIONS.map((s, i) => {
              const flip = i % 2 === 1;
              return (
                <Reveal key={s.id} amount={0.2} id={s.id} className="scroll-mt-24">
                  <motion.article variants={fadeUp}>
                    <Spotlight className="overflow-hidden rounded-[24px] border border-line bg-white transition-colors duration-500 hover:border-line-strong">
                      <div className={`grid ${flip ? "lg:grid-cols-[0.85fr_1.15fr]" : "lg:grid-cols-[1.15fr_0.85fr]"}`}>
                        {/* Copy */}
                        <div className={`p-7 sm:p-10 lg:p-12 ${flip ? "lg:order-2" : ""}`}>
                          <div className="flex items-center gap-4">
                            <Index>{s.index}</Index>
                            <span className="h-px w-8 bg-line-strong" />
                            <span className="font-mono text-2xs uppercase tracking-[0.16em] text-accent-strong">Solution</span>
                          </div>
                          <h3 className="mt-6 text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-fg">
                            {s.title}
                          </h3>

                          <dl className="mt-8 grid gap-6 sm:grid-cols-[92px_1fr] sm:gap-x-8">
                            <dt className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">Problem</dt>
                            <dd className="text-[15px] leading-relaxed text-body">{s.problem}</dd>
                            <dt className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">Approach</dt>
                            <dd className="text-[15px] leading-relaxed text-body">{s.solution}</dd>
                            <dt className="font-mono text-2xs uppercase tracking-[0.16em] text-muted">Outcome</dt>
                            <dd className="text-[15px] font-medium leading-relaxed text-fg">{s.outcome}</dd>
                          </dl>

                          <Link
                            href={`/contact?solution=${s.id}`}
                            className="group/link mt-9 inline-flex items-center gap-2 text-sm font-medium text-fg"
                          >
                            Discuss this workflow
                            <ArrowUpRight
                              weight="bold"
                              className="h-4 w-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                            />
                          </Link>
                        </div>

                        {/* Visual */}
                        <div className={`relative flex flex-col justify-end bg-ink ${flip ? "lg:order-1" : ""}`}>
                          <div className="absolute inset-0">
                            <Image
                              src={s.image}
                              alt=""
                              fill
                              sizes="(max-width: 1023px) 100vw, 40vw"
                              className="object-cover opacity-40 saturate-[0.7]"
                            />
                            <div className="absolute inset-0 bg-[linear-gradient(0deg,#0a0d14_10%,rgba(10,13,20,0.45)_60%,rgba(10,13,20,0.7)_100%)]" />
                          </div>
                          <div className="relative p-7 sm:p-8">
                            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-on-dark-muted">
                              Workflow
                            </p>
                            <ol className="mt-4 flex flex-wrap items-center gap-2">
                              {s.workflow.map((w, j) => (
                                <li key={w} className="flex items-center gap-2">
                                  <motion.span
                                    className={`rounded-md border px-2.5 py-1.5 font-mono text-[10.5px] uppercase tracking-[0.1em] ${
                                      j === s.workflow.length - 1
                                        ? "border-live/30 bg-live/10 text-[#5fd39e]"
                                        : "border-white/10 bg-white/[0.04] text-on-dark"
                                    }`}
                                    animate={{ opacity: [0.6, 1, 0.6] }}
                                    transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: j * 0.35 }}
                                  >
                                    {w}
                                  </motion.span>
                                  {j < s.workflow.length - 1 ? (
                                    <ArrowRight className="h-3 w-3 text-on-dark-muted" aria-hidden="true" />
                                  ) : null}
                                </li>
                              ))}
                            </ol>
                            <ul className="mt-6 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                              {s.capabilities.map((c) => (
                                <li key={c} className="flex items-center gap-2 text-[13px] text-on-dark">
                                  <span className="h-1 w-1 rounded-full bg-accent-dark" />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </Spotlight>
                  </motion.article>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* SYSTEM THINKING */}
      <section className="w-full bg-paper py-24 lg:py-32">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal amount={0.3} className="lg:sticky lg:top-28">
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow="System thinking"
                  title="One process can touch many systems."
                  lede="Real automation usually spans more than one application. That's why we design around the full workflow instead of automating isolated clicks."
                />
              </motion.div>
            </Reveal>
            <Reveal step={0.1} className="grid gap-4 sm:grid-cols-2">
              {LAYERS.map((l) => (
                <motion.div
                  key={l.index}
                  variants={fadeUp}
                  className="rounded-2xl border border-line bg-white p-7 transition-colors duration-500 hover:border-line-strong"
                >
                  <Index>{l.index}</Index>
                  <h3 className="mt-6 text-xl font-medium tracking-[-0.02em] text-fg">{l.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-body">{l.body}</p>
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
                eyebrow="From idea to system"
                title="How we turn workflows into working systems."
                lede="A structured process keeps technology aligned with the outcome you're trying to create."
              />
            </motion.div>
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <Process steps={PROCESS} />
          </div>
        </Container>
      </section>

      {/* INDUSTRIES + LEADPULZ */}
      <section className="w-full bg-white pb-8">
        <Container>
          <Reveal amount={0.3} className="grid gap-5 lg:grid-cols-[1fr_1fr]">
            <motion.div
              variants={scaleIn}
              className="rounded-2xl border border-line bg-paper p-8 sm:p-10"
            >
              <Eyebrow>Where it applies</Eyebrow>
              <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-fg">
                Built for different business models.
              </h2>
              <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-body">
                The same system-thinking adapts to sales-led, service-led, and operations-heavy businesses.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {INDUSTRIES.map((i) => (
                  <Chip key={i}>{i}</Chip>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={scaleIn}
              className="relative overflow-hidden rounded-2xl bg-ink p-8 sm:p-10"
            >
              <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <Image src="/images/dashboard.jpeg" alt="" fill sizes="50vw" className="object-cover object-top opacity-[0.14] saturate-0" />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.5)_0%,#0a0d14_80%)]" />
              </div>
              <div className="relative">
                <Eyebrow dark>LeadPulz</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-white">
                  Looking for voice and revenue automation?
                </h2>
                <p className="mt-4 max-w-[46ch] text-[15px] leading-relaxed text-on-dark">
                  LeadPulz is our AI revenue agent platform for calls, lead
                  qualification, appointment booking, follow-ups, and
                  conversation intelligence.
                </p>
                <div className="mt-8">
                  <Button href="/leadpulz" variant="onDark">
                    Explore LeadPulz
                    <Arrow />
                  </Button>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      <CTA
        eyebrow="Your workflow"
        title="Which process should stop depending on manual follow-up?"
        lede="Tell us how it works today. We'll map the conversations, logic, data, and actions — and show you what an automated version looks like."
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "Our services", href: "/services" }}
        image="/images/use-cases/ecommerce.png"
      />
    </div>
  );
}
