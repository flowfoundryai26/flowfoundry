"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Phone,
  Funnel,
  CalendarCheck,
  ArrowsClockwise,
  Plugs,
  ChartLineUp,
  BookOpenText,
  FlowArrow,
  ArrowRight,
} from "@phosphor-icons/react";
import { Arrow, Button, Container, Eyebrow, Index, SectionHeading, Status } from "@/components/ui";
import { Reveal, Spotlight, Typewriter, fadeUp, scaleIn } from "@/components/motion";
import { Device, VoiceWave } from "@/components/visuals";
import { Bento, CTA, Checks, PageHero, Process } from "@/components/sections";

/* =========================================================
   DATA
========================================================= */

const CAPABILITIES = [
  { id: "conversations", index: "01", title: "Voice conversations", body: "Handle inbound and outbound business conversations using configurable AI voice agents.", icon: <Phone className="h-5 w-5" />, wide: true },
  { id: "qualification", index: "02", title: "Lead qualification", body: "Ask the right questions, capture requirements, and qualify prospects using your business criteria.", icon: <Funnel className="h-5 w-5" /> },
  { id: "booking", index: "03", title: "Appointment booking", body: "Connect conversations with calendar availability and automate the path to a confirmed appointment.", icon: <CalendarCheck className="h-5 w-5" /> },
  { id: "follow-up", index: "04", title: "Follow-up automation", body: "Trigger structured prospect follow-ups based on call outcomes, qualification status, and workflow rules.", icon: <ArrowsClockwise className="h-5 w-5" />, wide: true },
  { id: "integration", index: "05", title: "CRM & calendar integration", body: "Connect conversations to your existing CRM, calendars, databases, and business workflows.", icon: <Plugs className="h-5 w-5" /> },
  { id: "insights", index: "06", title: "Conversation insights", body: "Review call outcomes, transcripts, qualification details, activity, and operational conversation data.", icon: <ChartLineUp className="h-5 w-5" />, wide: true },
  { id: "knowledge", index: "07", title: "Custom knowledge", body: "Give agents access to the business information they need to answer questions accurately.", icon: <BookOpenText className="h-5 w-5" /> },
  { id: "flows", index: "08", title: "Custom conversation flows", body: "Design qualification, routing, escalation, booking, and follow-up logic around your own process.", icon: <FlowArrow className="h-5 w-5" />, wide: true },
];

const HOW = [
  { number: "01", title: "Connect", body: "Configure your phone workflow, business knowledge, CRM, calendar, and qualification criteria." },
  { number: "02", title: "Converse", body: "LeadPulz engages prospects using natural voice conversations tailored to your business context." },
  { number: "03", title: "Understand", body: "The agent captures intent, requirements, qualification details, and conversation outcomes." },
  { number: "04", title: "Take action", body: "Based on the conversation, LeadPulz triggers bookings, CRM updates, follow-ups, and other workflows." },
];

const FLOW = [
  { name: "Conversation", meta: "AI voice agent engages" },
  { name: "Qualification", meta: "Intent and requirements captured" },
  { name: "Business logic", meta: "Rules determine the next action" },
  { name: "Integration", meta: "CRM and calendar connected" },
  { name: "Action", meta: "Book, update, or follow up" },
];

const USE_CASES = [
  { index: "01", title: "Inbound lead response", body: "Handle new enquiries when your sales team is busy, offline, or on other calls." },
  { index: "02", title: "Outbound qualification", body: "Engage selected prospects, gather information, and identify which opportunities need human attention." },
  { index: "03", title: "Appointment scheduling", body: "Move qualified prospects from conversation to available meeting slots without back-and-forth." },
  { index: "04", title: "Lead follow-up", body: "Re-engage prospects based on defined workflows and previous conversation outcomes." },
  { index: "05", title: "Customer enquiries", body: "Answer common questions using business knowledge and route conversations when a human is needed." },
  { index: "06", title: "Conversation intelligence", body: "Give teams visibility into what happened during calls and what should happen next." },
];

const CUSTOMIZATION = [
  "Custom qualification criteria",
  "Business-specific knowledge",
  "CRM and calendar connections",
  "Custom actions and workflows",
  "Human handoff when required",
] as const;

/* =========================================================
   PAGE
========================================================= */

export default function LeadPulzPage() {
  return (
    <div className="w-full overflow-x-clip">
      <PageHero
        eyebrow="LeadPulz · AI revenue agent"
        title="Turn business calls into measurable action."
        lede="LeadPulz is an AI voice automation platform that manages calls, qualifies leads, schedules appointments, automates follow-ups, and connects every conversation to your business workflows."
        secondary="Give every conversation a structured next step — without your team manually managing every interaction."
        primaryCta={{ label: "Book a demo", href: "/contact?interest=leadpulz" }}
        secondaryCta={{ label: "See the product", href: "#product" }}
        aside={<CallCard />}
      />

      {/* PRODUCT */}
      <section id="product" className="w-full scroll-mt-20 bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="The product"
                title="One workspace for every conversation."
                lede="Visibility into calls, qualification results, appointments, agent activity, and conversation outcomes from one interface."
              />
            </motion.div>
          </Reveal>
          <Reveal amount={0.2} className="mt-14">
            <motion.div variants={scaleIn} className="relative">
              <Device src="/images/dashboard.jpeg" alt="LeadPulz dashboard with calls, qualification results, and bookings" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -right-3 top-12 hidden items-center gap-3 rounded-xl border border-line bg-white px-4 py-3 shadow-lift md:flex"
              >
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-live/10 text-live">
                  <CalendarCheck weight="fill" className="h-4 w-4" />
                </span>
                <span>
                  <span className="block text-xs font-semibold text-fg">Next action triggered</span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Booking · CRM synced</span>
                </span>
              </motion.div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      {/* CAPABILITIES */}
      <section id="capabilities" className="w-full scroll-mt-20 bg-paper py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="Capabilities"
                title="More than an AI phone call."
                lede="LeadPulz connects the conversation to the business process that needs to happen next."
              />
            </motion.div>
          </Reveal>
          <div className="mt-14 lg:mt-20">
            <Bento items={CAPABILITIES} />
          </div>
        </Container>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="w-full scroll-mt-20 bg-white py-24 lg:py-32">
        <Container>
          <Reveal amount={0.3}>
            <motion.div variants={fadeUp}>
              <SectionHeading
                align="split"
                eyebrow="How it works"
                title="Conversation to action."
                lede="LeadPulz is designed around the complete workflow, not only the call itself."
              />
            </motion.div>
          </Reveal>
          <div className="mt-16 lg:mt-20">
            <Process steps={HOW} />
          </div>
        </Container>
      </section>

      {/* PRODUCT FLOW — dark */}
      <section className="w-full bg-ink py-24 lg:py-32">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <Reveal amount={0.3}>
              <motion.div variants={fadeUp}>
                <SectionHeading
                  invert
                  eyebrow="Intelligent workflow"
                  title="What happens after the call matters."
                  lede="LeadPulz connects conversations to business logic, data, and actions so your team knows what happened and what should happen next."
                />
              </motion.div>
            </Reveal>
            <Reveal as="ol" step={0.12} className="relative">
              <div className="absolute bottom-6 left-[19px] top-6 w-px bg-white/10" aria-hidden="true" />
              {FLOW.map((f, i) => (
                <motion.li key={f.name} variants={fadeUp} className="relative flex items-start gap-6 py-4">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-ink font-mono text-2xs text-accent-dark">
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-0 rounded-full border border-accent-dark/40"
                      animate={{ scale: [1, 1.5], opacity: [0.6, 0] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut", delay: i * 0.45 }}
                    />
                    0{i + 1}
                  </span>
                  <div className="pt-2">
                    <h3 className="text-lg font-medium text-white">{f.name}</h3>
                    <p className="mt-1 text-sm text-on-dark">{f.meta}</p>
                  </div>
                </motion.li>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* USE CASES */}
      <section className="w-full bg-white py-24 lg:py-32">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal amount={0.3} className="lg:sticky lg:top-28">
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow="Use cases"
                  title="Built for conversations that drive revenue."
                  lede="Configure LeadPulz around the conversations, qualification logic, and follow-up processes your business actually uses."
                />
              </motion.div>
            </Reveal>
            <Reveal step={0.07} className="grid gap-4 sm:grid-cols-2">
              {USE_CASES.map((u) => (
                <motion.div key={u.index} variants={fadeUp}>
                  <Spotlight className="h-full rounded-2xl border border-line bg-white p-7 transition-colors duration-500 hover:border-line-strong">
                    <Index>{u.index}</Index>
                    <h3 className="mt-6 text-lg font-medium tracking-[-0.015em] text-fg">{u.title}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-body">{u.body}</p>
                  </Spotlight>
                </motion.div>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>

      {/* CUSTOMIZATION */}
      <section className="w-full bg-white pb-8">
        <Container>
          <Reveal amount={0.3}>
            <motion.div
              variants={scaleIn}
              className="relative grid gap-10 overflow-hidden rounded-2xl border border-line bg-paper p-8 sm:p-10 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:p-14"
            >
              <div>
                <Eyebrow>Built around your business</Eyebrow>
                <h2 className="mt-5 text-[clamp(1.6rem,3vw,2.4rem)] font-medium leading-[1.06] tracking-[-0.03em] text-fg text-balance">
                  Your agent should understand your process — not read a generic script.
                </h2>
                <p className="mt-5 max-w-[56ch] text-[15px] leading-relaxed text-body">
                  Configure conversation logic, qualification criteria, business
                  knowledge, integrations, routing, booking behaviour, and
                  follow-up workflows around your operation.
                </p>
              </div>
              <div>
                <Checks items={CUSTOMIZATION} cols={1} />
                <div className="mt-8">
                  <Button href="/contact?interest=leadpulz" variant="primary">
                    Book a demo
                    <Arrow />
                  </Button>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </Container>
      </section>

      <CTA
        eyebrow="See LeadPulz in action"
        title="What could your team do if every lead got the right next step?"
        lede="Tell us how your business handles calls and leads today. We'll show you how LeadPulz fits into the workflow."
        primary={{ label: "Book a demo", href: "/contact?interest=leadpulz" }}
        secondary={{ label: "Contact us", href: "/contact" }}
        image="/images/contact.webp"
      />
    </div>
  );
}

/* =========================================================
   CALL CARD — hero aside with live voice wave
========================================================= */

function CallCard() {
  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-ink-2/80 shadow-dark backdrop-blur-md">
        <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]" />
        <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-4">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white">
              <Phone weight="fill" className="h-4 w-4" />
            </span>
            <div>
              <p className="text-sm font-medium text-white">LeadPulz agent</p>
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-muted">Outbound · qualification</p>
            </div>
          </div>
          <Status dark>Live</Status>
        </div>

        <div className="px-5 py-6">
          <VoiceWave />
          <p className="mt-6 min-h-[48px] text-[15px] leading-relaxed text-white">
            <Typewriter
              phrases={[
                "Hi Meera, this is the FlowFoundry assistant. Do you have two minutes to talk about your booking enquiry?",
                "Perfect. Would Thursday at 10:30 or Friday at 2:00 suit you better?",
                "Booked. I've sent a confirmation and added it to your calendar.",
              ]}
            />
          </p>
        </div>

        <div className="border-t border-white/[0.06] px-5 py-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-on-dark-muted">Captured</p>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            {["Clinic · 12 staff", "Budget confirmed", "Decision maker", "Thu 10:30"].map((t, i) => (
              <span key={t} className="flex items-center gap-2">
                <motion.span
                  className="rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-[0.1em] text-on-dark"
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                >
                  {t}
                </motion.span>
                {i < 3 ? <ArrowRight className="h-3 w-3 text-on-dark-muted" aria-hidden="true" /> : null}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-10 -left-8 -z-10 hidden h-48 w-64 overflow-hidden rounded-2xl opacity-60 lg:block" aria-hidden="true">
        <Image src="/images/dashboard.jpeg" alt="" fill sizes="256px" className="object-cover object-top saturate-0" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.3),#0a0d14)]" />
      </div>
    </div>
  );
}
