"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "@phosphor-icons/react";
import { INTEGRATIONS, TEAM } from "@/lib/site";
import { Arrow, Button, Chip, Container, Eyebrow, Index, SectionHeading } from "@/components/ui";
import { Reveal, Spotlight, fadeUp, scaleIn } from "@/components/motion";
import { SyncOrbit } from "@/components/visuals";
import { CTA, PageHero, RowList, Split, StatStrip } from "@/components/sections";

/* =========================================================
   DATA
========================================================= */

const PRINCIPLES = [
  { index: "01", title: "Process before tools", body: "We begin with how the business actually works — the workflow, people, bottlenecks, decisions, and desired outcome." },
  { index: "02", title: "Outcome before features", body: "Technology should create measurable operational value, not simply add more software to the stack." },
  { index: "03", title: "Integration before isolation", body: "We design systems that work with your existing tools, data, and processes instead of creating another disconnected silo." },
  { index: "04", title: "Automation with human control", body: "AI and automation should remove repetitive work while keeping important decisions visible and controllable." },
  { index: "05", title: "Build for evolution", body: "The systems we create are designed to grow as your business, customers, and operational requirements change." },
];

const FOCUS = [
  { index: "01", title: "AI Engineering", body: "Intelligent agents and AI-enabled systems that understand context, access business knowledge, and take meaningful action." },
  { index: "02", title: "Automation", body: "Removing repetitive coordination across sales, support, operations, follow-ups, approvals, notifications, and data movement." },
  { index: "03", title: "Software", body: "Purpose-designed platforms, dashboards, portals, internal tools, websites, and applications built around real workflows." },
  { index: "04", title: "Integration", body: "Connecting business systems, APIs, CRMs, calendars, databases, and communication platforms into one operating flow." },
];

const CAPABILITIES = [
  "AI Agents", "Voice AI", "Workflow Automation", "Custom Software",
  "Web Applications", "eCommerce", "CRM Integrations", "API Integrations",
];

const LAYERS = [
  { title: "Conversations", body: "Calls, web chat, WhatsApp, email, and forms." },
  { title: "Business logic", body: "Qualification, routing, rules, and AI decisions." },
  { title: "Data", body: "CRMs, databases, knowledge bases, and analytics." },
  { title: "Actions", body: "Bookings, CRM updates, follow-ups, tasks, and workflows." },
];

/* =========================================================
   PAGE
========================================================= */

export default function AboutPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="About us"
        title="Building smarter ways for businesses to work."
        lede="FlowFoundry AI Solutions helps businesses turn ideas, manual processes, and disconnected tools into intelligent business systems."
        secondary="We combine AI engineering, automation, software development, and integrations to connect conversations, business logic, data, and actions around the way your business actually operates."
        primaryCta={{ label: "Book a free consultation", href: "/contact" }}
        secondaryCta={{ label: "Explore our services", href: "/services" }}
        image="/images/use-cases/services.png"
        strip={
          <StatStrip
            className="lg:grid-cols-1 lg:gap-y-8"
            items={[
              { value: "4", label: "Disciplines" },
              { value: "5", label: "People" },
              { value: "3", label: "Cities" },
            ]}
          />
        }
      />

      {/* WHO WE ARE */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <Split
            eyebrow="Who we are"
            title={
              <>
                We build systems,
                <br />
                not just software.
              </>
            }
            image="/images/mission.png"
            imageAlt="The FlowFoundry team working through an intelligent workflow"
            stat={{ value: "5", label: "People · three cities" }}
          >
            <p className="text-xl font-medium leading-snug tracking-[-0.015em] text-fg">
              FlowFoundry is a team of AI engineers, automation specialists, and
              software developers focused on helping businesses operate smarter,
              faster, and with greater clarity.
            </p>
            <p className="text-[16px] leading-relaxed">
              We go beyond standalone applications. Our work starts with the
              workflows, customer interactions, internal processes, business
              rules, data, and systems that keep an organization moving.
            </p>
            <p className="text-[16px] leading-relaxed">
              From there we design practical technology around those processes —
              reducing repetitive work, connecting disconnected systems,
              improving response times, and creating a stronger foundation for
              growth.
            </p>
          </Split>
        </Container>
      </section>

      {/* FOCUS AREAS */}
      <section className="w-full bg-paper py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="What we bring together"
                title="Four disciplines. One connected solution."
                lede="We combine everything required to move from a business problem to a complete, working system."
              />
            </motion.div>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <RowList items={FOCUS} />
          </div>
          <Reveal amount={0.4} className="mt-10 flex flex-wrap gap-2">
            {CAPABILITIES.map((c) => (
              <motion.div key={c} variants={fadeUp}>
                <Chip>{c}</Chip>
              </motion.div>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* MISSION + VISION */}
      <section className="w-full bg-ink py-24 lg:py-32">
        <Container>
          <Reveal amount={0.2} className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
            <motion.article
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-2 p-8 sm:p-10 lg:p-14"
            >
              <Eyebrow dark>Our mission</Eyebrow>
              <h3 className="mt-6 max-w-[18ch] text-[clamp(1.8rem,3.4vw,2.8rem)] font-medium leading-[1.05] tracking-[-0.03em] text-white text-balance">
                Turn complex business processes into intelligent, connected systems.
              </h3>
              <p className="mt-6 max-w-[48ch] text-[16px] leading-relaxed text-on-dark">
                Our mission is to help businesses remove operational friction,
                automate repetitive work, connect their systems, and use
                technology in ways that create practical business value.
              </p>
            </motion.article>

            <motion.article
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl bg-white p-8 sm:p-10 lg:p-14"
            >
              <Eyebrow>Our vision</Eyebrow>
              <h3 className="mt-6 max-w-[18ch] text-[clamp(1.6rem,2.8vw,2.3rem)] font-medium leading-[1.08] tracking-[-0.03em] text-fg text-balance">
                A future where every growing business can operate intelligently.
              </h3>
              <p className="mt-6 max-w-[42ch] text-[16px] leading-relaxed text-body">
                Businesses where conversations, decisions, data, and actions move
                without friction — giving teams more time for customers,
                creativity, strategy, and growth.
              </p>
            </motion.article>
          </Reveal>
        </Container>
      </section>

      {/* SYSTEM PHILOSOPHY */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal amount={0.3} className="lg:sticky lg:top-28">
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow="Our system philosophy"
                  title={
                    <>
                      Conversations.
                      <br />
                      Logic. Data.
                      <br />
                      Actions.
                    </>
                  }
                  lede="These are the layers we connect to turn disconnected business processes into intelligent operating systems."
                  size="lg"
                />
              </motion.div>
            </Reveal>

            <Reveal step={0.1} className="divide-y divide-line border-y border-line">
              {LAYERS.map((l, i) => (
                <motion.div key={l.title} variants={fadeUp} className="group grid gap-3 py-7 sm:grid-cols-[64px_1fr] sm:gap-8">
                  <Index className="pt-1.5">0{i + 1}</Index>
                  <div className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                    <h3 className="text-2xl font-medium tracking-[-0.02em] text-fg">{l.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{l.body}</p>
                  </div>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* INTEGRATION ORBIT */}
      <section className="w-full overflow-hidden bg-ink py-24 lg:py-32">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal amount={0.3}>
              <motion.div variants={fadeUp}>
                <SectionHeading
                  invert
                  eyebrow="Integration-first"
                  title="We work with the tools you already run."
                  lede="CRMs, calendars, messaging, payments, storefronts, spreadsheets, and custom APIs — connected into one operating flow, not another silo."
                />
              </motion.div>
              <motion.div variants={fadeUp} className="mt-8">
                <Button href="/services#integrations" variant="outlineOnDark">
                  Integration services
                  <Arrow />
                </Button>
              </motion.div>
            </Reveal>
            <Reveal amount={0.2}>
              <motion.div variants={scaleIn}>
                <SyncOrbit items={[...INTEGRATIONS]} />
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* PRINCIPLES */}
      <section className="w-full bg-paper py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="How we think"
                title="Principles behind every system we build."
                lede="Five ideas that guide how we design, build, and evolve every engagement."
              />
            </motion.div>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <RowList items={PRINCIPLES} />
          </div>
        </Container>
      </section>

      {/* TEAM */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="The team"
                title="The people building FlowFoundry."
                lede="A distributed team across Andhra Pradesh, Tamil Nadu, and Gujarat — engineering, automation, software, and business development."
              />
            </motion.div>
          </Reveal>

          <Reveal step={0.08} className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]">
            {TEAM.map((m, i) => (
              <motion.article
                key={m.name}
                variants={fadeUp}
                className={`group ${i === 0 ? "sm:col-span-2 lg:col-span-1 lg:row-span-2" : ""}`}
              >
                <Spotlight className="relative overflow-hidden rounded-2xl bg-ink">
                  <div className={`relative ${i === 0 ? "aspect-[4/5] lg:aspect-auto lg:h-full lg:min-h-[640px]" : "aspect-[4/4.4]"}`}>
                    <Image
                      src={m.avatar}
                      alt={`${m.name}, ${m.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-top saturate-[0.85] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0)_45%,rgba(10,13,20,0.92)_100%)]" />
                    <div className="absolute inset-x-0 bottom-0 p-6">
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-accent-dark">{m.role}</p>
                      <h3 className={`mt-2 font-medium tracking-[-0.02em] text-white ${i === 0 ? "text-3xl" : "text-xl"}`}>
                        {m.name}
                      </h3>
                      <p className="mt-2 flex items-center gap-1.5 text-xs text-on-dark">
                        <MapPin className="h-3.5 w-3.5" />
                        {m.place}
                      </p>
                    </div>
                  </div>
                </Spotlight>
              </motion.article>
            ))}
          </Reveal>
        </Container>
      </section>

      {/* LEADPULZ CALLOUT */}
      <section className="w-full bg-white pb-8">
        <Container>
          <Reveal amount={0.3}>
            <motion.div
              variants={fadeUp}
              className="grid items-center gap-8 rounded-2xl border border-line bg-paper p-8 sm:p-10 lg:grid-cols-[1fr_auto] lg:p-12"
            >
              <div>
                <Eyebrow>What we&apos;re building</Eyebrow>
                <h2 className="mt-4 text-[clamp(1.5rem,2.8vw,2.2rem)] font-medium leading-[1.08] tracking-[-0.025em] text-fg">
                  LeadPulz — our AI revenue agent platform.
                </h2>
                <p className="mt-4 max-w-[64ch] text-[15px] leading-relaxed text-body">
                  Alongside client work, we are building LeadPulz: an AI voice
                  automation platform for lead qualification, conversations,
                  appointment booking, follow-ups, CRM integrations, and call
                  intelligence.
                </p>
              </div>
              <Button href="/leadpulz" variant="primary">
                Explore LeadPulz
                <Arrow />
              </Button>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      <CTA
        eyebrow="Let's build"
        title="Have a process, bottleneck, or system idea?"
        lede="Tell us how your business works today. We'll help you explore how AI, automation, integrations, or custom software could make it work better."
        primary={{ label: "Book a free consultation", href: "/contact" }}
        secondary={{ label: "Explore our services", href: "/services" }}
        image="/images/contact.png"
      />
    </div>
  );
}
