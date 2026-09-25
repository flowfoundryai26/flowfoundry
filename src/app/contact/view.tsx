"use client";

import Image from "next/image";
import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  EnvelopeSimple,
  MapPin,
  Phone,
  WhatsappLogo,
  ArrowRight,
  CaretDown,
  Check,
} from "@phosphor-icons/react";
import Link from "next/link";
import { SITE } from "@/lib/site";
import { EVENTS, track } from "@/lib/analytics";
import { buttonClass, Container, Eyebrow, LiveDot, SectionHeading } from "@/components/ui";
import { Magnetic, Reveal, Words, fadeUp, scaleIn, stagger } from "@/components/motion";

const WHATSAPP = SITE.whatsapp.replace(/[^0-9]/g, "");
const waLink = (text: string) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const CHANNELS = [
  {
    icon: WhatsappLogo,
    label: "WhatsApp",
    value: "+91 73309 37354",
    hint: "Fastest — usually within minutes",
    href: waLink("Hi FlowFoundry, I'd like to know more about your services."),
    external: true,
  },
  {
    icon: EnvelopeSimple,
    label: "Email",
    value: SITE.email,
    hint: "Within one business day",
    href: `mailto:${SITE.email}`,
  },
  {
    icon: Phone,
    label: "Call",
    value: "+91 73309 37354",
    hint: "Business hours, IST",
    href: "tel:+917330937354",
  },
  {
    icon: MapPin,
    label: "Where we are",
    value: "Distributed across India",
    hint: "Andhra Pradesh, Tamil Nadu and Gujarat — remote-first",
  },
];

const INTEREST_LABELS: Record<string, string> = {
  leadpulz: "LeadPulz demo",
  "lead-generation": "Lead generation automation",
  sales: "Sales automation",
  support: "Customer support automation",
  operations: "Operations automation",
  crm: "CRM automation",
  appointments: "Appointment automation",
};

/* =========================================================
   PAGE
========================================================= */

export default function ContactPage() {
  return (
    <div className="w-full overflow-x-clip">
      {/* HERO */}
      <section className="relative w-full overflow-hidden bg-ink">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute inset-y-0 right-0 w-full lg:w-[60%]">
            <Image
              src="/images/contact.webp"
              alt=""
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 60vw"
              className="object-cover object-[70%_center] opacity-40 saturate-[0.8]"
            />
          </div>
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#0a0d14_0%,#0a0d14_32%,rgba(10,13,20,0.65)_65%,rgba(10,13,20,0.5)_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,13,20,0.5)_0%,rgba(10,13,20,0)_40%,#0a0d14_100%)]" />
        </div>

        <Container className="relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger(0.1, 0.05)}
            className="py-20 lg:py-28"
          >
            <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4">
              <Eyebrow dark>Contact</Eyebrow>
              <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark">
                <LiveDot />
                Taking new projects
              </span>
            </motion.div>
            <h1 className="mt-6 max-w-[18ch] text-[clamp(2.2rem,4.6vw,4rem)] font-medium leading-[1] tracking-[-0.035em] text-white text-balance">
              <Words text="Tell us how your business works today." delay={0.15} />
            </h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-[50ch] text-base leading-relaxed text-on-dark sm:text-lg">
              Share the workflow, bottleneck, or system idea. We&apos;ll come
              back within one business day with a clear next step — no
              generic pitch.
            </motion.p>
          </motion.div>
        </Container>
      </section>

      {/* FORM + CHANNELS */}
      <section className="w-full bg-white py-20 lg:py-28">
        <Container>
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            {/* Channels */}
            <Reveal amount={0.2} className="lg:sticky lg:top-28 lg:self-start">
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow="Reach us"
                  title="Pick whichever channel is easiest."
                  lede="WhatsApp gets the fastest reply. Email works if you'd rather send a brief."
                />
              </motion.div>
              <motion.ul variants={fadeUp} className="mt-10 divide-y divide-line border-y border-line">
                {CHANNELS.map((c) => {
                  const Icon = c.icon;
                  const inner = (
                    <div className="group flex items-center gap-4 py-5 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-paper text-fg">
                        <Icon className="h-4.5 w-4.5" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">{c.label}</span>
                        <span className="mt-0.5 block truncate text-[15px] font-medium text-fg">{c.value}</span>
                        <span className="block text-xs text-muted">{c.hint}</span>
                      </span>
                      {c.href ? (
                        <ArrowRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-fg" />
                      ) : null}
                    </div>
                  );
                  return (
                    <li key={c.label} className="group">
                      {c.href ? (
                        <a
                          href={c.href}
                          target={c.external ? "_blank" : undefined}
                          rel={c.external ? "noopener noreferrer" : undefined}
                          className="block"
                        >
                          {inner}
                        </a>
                      ) : (
                        inner
                      )}
                    </li>
                  );
                })}
              </motion.ul>
            </Reveal>

            {/* Form */}
            <Reveal amount={0.15}>
              <motion.div
                variants={scaleIn}
                className="rounded-[24px] border border-line bg-paper p-6 sm:p-9 lg:p-11"
              >
                <Suspense fallback={<FormSkeleton />}>
                  <ContactForm />
                </Suspense>
              </motion.div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/*
        WHAT HAPPENS NEXT
        Replaces the previous map + head-office section. We are a remote-first
        distributed team, so presenting a pinned office address was a claim we
        would rather not make. Setting response expectations converts better
        than a map on a B2B contact page anyway.
      */}
      <section className="w-full bg-paper py-20 lg:py-28">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
            <Reveal amount={0.3}>
              <motion.div variants={fadeUp}>
                <SectionHeading
                  eyebrow="What happens next"
                  title="No pitch deck, no obligation."
                  lede="A consultation is a working conversation about how your process runs today. Here is the sequence."
                />
              </motion.div>
            </Reveal>

            <Reveal as="ol" step={0.06} className="divide-y divide-line border-y border-line">
              {[
                {
                  title: "We reply within one business day",
                  body: "Usually sooner on WhatsApp. You get a person, not an autoresponder sequence.",
                },
                {
                  title: "A short call to understand the process",
                  body: "What the workflow is, which tools are involved, and where it actually breaks. Around 30 minutes.",
                },
                {
                  title: "We tell you what we would and would not automate",
                  body: "Including when the answer is that an off-the-shelf product would serve you better, or that you do not need us yet.",
                },
                {
                  title: "You get a written summary",
                  body: "The workflow as we understood it, the options, and an indicative scope. Yours to keep either way.",
                },
              ].map((s, i) => (
                <motion.li
                  key={s.title}
                  variants={fadeUp}
                  className="flex items-baseline gap-5 py-6"
                >
                  <span className="font-mono text-xs tabular-nums tracking-[0.1em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[17px] font-medium tracking-[-0.015em] text-fg">
                      {s.title}
                    </span>
                    <span className="mt-1.5 block max-w-[54ch] text-[15px] leading-relaxed text-body">
                      {s.body}
                    </span>
                  </span>
                </motion.li>
              ))}
            </Reveal>
          </div>
        </Container>
      </section>
    </div>
  );
}

/* =========================================================
   FORM
========================================================= */

type FormState = {
  name: string;
  company: string;
  website: string;
  phone: string;
  email: string;
  /** "What do you want to improve?" — the single most useful qualifying field. */
  goal: string;
  industry: string;
  tools: string;
  subject: string;
  message: string;
};

/** Kept short deliberately. Every extra required field costs completions. */
const GOALS = [
  "Lead generation",
  "Lead follow-up",
  "Customer support",
  "Voice calling",
  "WhatsApp automation",
  "CRM automation",
  "Business operations",
  "Custom software",
  "Shopify automation",
  "Other",
];

const INDUSTRIES_LIST = [
  "Dental clinic",
  "Healthcare clinic",
  "Real estate",
  "eCommerce",
  "Local service business",
  "Education",
  "Professional services",
  "Other",
];

type Errors = Partial<Record<keyof FormState, string>>;

function ContactForm() {
  const params = useSearchParams();
  const interest = params.get("interest") ?? params.get("solution") ?? "";
  const presetSubject = INTEREST_LABELS[interest] ?? "";

  const [form, setForm] = useState<FormState>({
    name: "",
    company: "",
    website: "",
    phone: "",
    email: "",
    goal: "",
    industry: "",
    tools: "",
    subject: presetSubject,
    message: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  /** The composed enquiry, kept so the fallback links work if the popup is blocked. */
  const [composed, setComposed] = useState("");
  /** Fires contact_form_start once, on first interaction rather than on render. */
  const [started, setStarted] = useState(false);

  const set =
    (k: keyof FormState) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      if (!started) {
        setStarted(true);
        track(EVENTS.contactFormStart);
      }
      setForm((f) => ({ ...f, [k]: e.target.value }));
      if (errors[k]) setErrors((er) => ({ ...er, [k]: undefined }));
    };

  const validate = (): Errors => {
    const er: Errors = {};
    if (form.name.trim().length < 2) er.name = "Please enter your name.";
    if (!/^[+\d][\d\s()-]{6,}$/.test(form.phone.trim())) er.phone = "Enter a valid phone number.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) er.email = "Enter a valid email address.";
    if (form.message.trim().length < 12) er.message = "Give us a little more detail (12+ characters).";
    return er;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const er = validate();
    setErrors(er);
    if (Object.keys(er).length) return;

    setStatus("sending");
    track(EVENTS.contactFormSubmit, {
      goal: form.goal || "unspecified",
      industry: form.industry || "unspecified",
    });

    const lines = [
      "Hello FlowFoundry,",
      "",
      "I'd like to book an automation consultation. My details:",
      "",
      `*Name:* ${form.name}`,
      `*Company:* ${form.company || "—"}`,
      `*Website:* ${form.website || "—"}`,
      `*Phone:* ${form.phone}`,
      `*Email:* ${form.email}`,
      `*Industry:* ${form.industry || "—"}`,
      `*Wants to improve:* ${form.goal || form.subject || "—"}`,
      `*Current tools:* ${form.tools || "—"}`,
      "",
      "*What's happening now:*",
      form.message,
      "",
      "— Sent from the FlowFoundry website",
    ];
    const body = lines.join("\n");
    setComposed(body);

    // A popup blocker returns null here. We still advance to the sent state,
    // which surfaces the WhatsApp and email fallbacks, so the enquiry the
    // visitor just typed is never simply lost.
    window.open(waLink(body), "_blank", "noopener,noreferrer");
    setTimeout(() => setStatus("sent"), 600);
  };

  if (status === "sent") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[420px] flex-col items-start justify-center"
      >
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-live/10 text-live">
          <Check weight="bold" className="h-5 w-5" />
        </span>
        <h2 className="mt-6 text-2xl font-medium tracking-[-0.02em] text-fg">
          WhatsApp is open with your message.
        </h2>
        <p className="mt-3 max-w-[48ch] text-[15px] leading-relaxed text-body">
          Hit send in WhatsApp and we&apos;ll reply there, usually within a few
          hours. Didn&apos;t open? Your message is still here — use either option
          below and nothing is lost.
        </p>

        {/*
          Recovery paths. The WhatsApp link re-opens the same prefilled thread
          (works even if the programmatic popup was blocked, because this is a
          direct user click). The mailto carries the identical body.
        */}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a
            href={waLink(composed)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track(EVENTS.whatsappClick, { source: "form_fallback" })}
            className={buttonClass({ variant: "primary" })}
          >
            <WhatsappLogo weight="fill" className="h-4 w-4 text-[#5fd39e]" />
            Open WhatsApp again
          </a>
          <a
            href={`mailto:${SITE.email}?subject=${encodeURIComponent(
              "Automation consultation enquiry"
            )}&body=${encodeURIComponent(composed)}`}
            onClick={() => track(EVENTS.emailClick, { source: "form_fallback" })}
            className={buttonClass({ variant: "secondary" })}
          >
            Send it by email instead
          </a>
        </div>

        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 text-sm font-medium text-fg underline decoration-line-strong underline-offset-4"
        >
          Send another message
        </button>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <h2 className="text-2xl font-medium tracking-[-0.02em] text-fg">Send a message</h2>
        <p className="mt-2 text-sm text-body">
          Fill this in and we&apos;ll open WhatsApp with your message ready to send.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" value={form.name} onChange={set("name")} error={errors.name} placeholder="Your full name" autoComplete="name" required />
        <Field label="Company" name="company" value={form.company} onChange={set("company")} placeholder="Company name" helper="Optional" autoComplete="organization" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone / WhatsApp" name="phone" type="tel" value={form.phone} onChange={set("phone")} error={errors.phone} placeholder="+91 98765 43210" autoComplete="tel" required />
        <Field label="Work email" name="email" type="email" value={form.email} onChange={set("email")} error={errors.email} placeholder="you@company.com" autoComplete="email" required />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Select
          label="What do you want to improve?"
          name="goal"
          value={form.goal}
          onChange={set("goal")}
          options={GOALS}
          placeholder="Choose the closest"
        />
        <Select
          label="Industry"
          name="industry"
          value={form.industry}
          onChange={set("industry")}
          options={INDUSTRIES_LIST}
          placeholder="Choose the closest"
          helper="Optional"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Website" name="website" value={form.website} onChange={set("website")} placeholder="yourcompany.com" helper="Optional" autoComplete="url" />
        <Field label="Current tools" name="tools" value={form.tools} onChange={set("tools")} placeholder="e.g. Zoho, Google Calendar, Shopify" helper="Optional — helps us scope integrations" />
      </div>

      <Field
        label="What's happening now?"
        name="message"
        value={form.message}
        onChange={set("message")}
        error={errors.message}
        placeholder="Describe the process, where it breaks, and what you'd like it to do instead."
        textarea
        required
      />

      <div className="flex flex-col gap-5 pt-2">
        <Magnetic strength={0.2} className="shrink-0 self-start">
          <button
            type="submit"
            disabled={status === "sending"}
            className="group/btn inline-flex h-13 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full bg-fg px-7 text-[15px] font-medium text-white shadow-[0_1px_0_rgba(255,255,255,0.08)_inset,0_10px_24px_-12px_rgba(14,17,24,0.5)] transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-ink-3 active:translate-y-px active:scale-[0.98] disabled:opacity-60 sm:w-auto"
          >
            <WhatsappLogo weight="fill" className="h-4.5 w-4.5 text-[#5fd39e]" />
            {status === "sending" ? "Opening WhatsApp…" : "Send via WhatsApp"}
            <ArrowRight weight="bold" className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-0.5" />
          </button>
        </Magnetic>

        {/* Privacy note — states plainly where the data goes. */}
        <p className="max-w-[62ch] text-xs leading-relaxed text-muted">
          Submitting opens WhatsApp with your message ready to send — nothing is
          stored on our servers until you send it. We use what you share only to
          respond to this enquiry, and we don&apos;t sell or pass it to anyone.
          See our{" "}
          <Link
            href="/privacy"
            className="font-medium text-body underline decoration-line-strong underline-offset-2 transition-colors hover:text-fg"
          >
            privacy policy
          </Link>
          . Prefer email?{" "}
          <a
            href={`mailto:${SITE.email}`}
            onClick={() => track(EVENTS.emailClick, { source: "form_note" })}
            className="font-medium text-body underline decoration-line-strong underline-offset-2 transition-colors hover:text-fg"
          >
            {SITE.email}
          </a>
        </p>
      </div>
    </form>
  );
}

/* =========================================================
   SELECT — same visual language as Field
========================================================= */

function Select({
  label,
  name,
  value,
  onChange,
  options,
  placeholder = "Select",
  helper,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  placeholder?: string;
  helper?: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-fg">{label}</span>
      </label>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          aria-describedby={helper ? `${name}-helper` : undefined}
          className="w-full appearance-none rounded-xl border border-line-strong bg-white px-4 py-3.5 pr-10 text-[15px] text-fg transition-[border-color,box-shadow] duration-300 focus:border-accent focus:outline-none focus:ring-4 focus:ring-accent/10"
        >
          <option value="">{placeholder}</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <CaretDown
          weight="bold"
          aria-hidden="true"
          className="pointer-events-none absolute right-4 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted"
        />
      </div>
      {helper ? (
        <p id={`${name}-helper`} className="text-xs text-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  error,
  helper,
  placeholder,
  type = "text",
  textarea = false,
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  error?: string;
  helper?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
  required?: boolean;
  autoComplete?: string;
}) {
  const base =
    "w-full rounded-xl border bg-white px-4 py-3.5 text-[15px] text-fg placeholder:text-muted/70 transition-[border-color,box-shadow] duration-300 focus:outline-none focus:ring-4 " +
    (error
      ? "border-danger/60 focus:border-danger focus:ring-danger/10"
      : "border-line-strong focus:border-accent focus:ring-accent/10");

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-baseline justify-between">
        <span className="text-[13px] font-medium text-fg">{label}</span>
        {required ? (
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">Required</span>
        ) : null}
      </label>
      {textarea ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : helper ? `${name}-helper` : undefined}
          className={`${base} resize-y`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : helper ? `${name}-helper` : undefined}
          className={base}
        />
      )}
      {error ? (
        <p id={`${name}-error`} className="text-xs text-danger">
          {error}
        </p>
      ) : helper ? (
        <p id={`${name}-helper`} className="text-xs text-muted">
          {helper}
        </p>
      ) : null}
    </div>
  );
}

function FormSkeleton() {
  return (
    <div className="space-y-6" aria-hidden="true">
      <div className="space-y-2">
        <div className="shimmer h-7 w-48 rounded-md bg-line" />
        <div className="shimmer h-4 w-72 rounded-md bg-line" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="shimmer h-[76px] rounded-xl bg-line" />
        <div className="shimmer h-[76px] rounded-xl bg-line" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="shimmer h-[76px] rounded-xl bg-line" />
        <div className="shimmer h-[76px] rounded-xl bg-line" />
      </div>
      <div className="shimmer h-[76px] rounded-xl bg-line" />
      <div className="shimmer h-[160px] rounded-xl bg-line" />
      <div className="shimmer h-13 w-56 rounded-full bg-line" />
    </div>
  );
}
