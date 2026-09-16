"use client";

import { useState } from "react";
import { motion, Variants } from "framer-motion";
import { SITE } from "@/lib/site";

/* =========================================================
   ANIMATION VARIANTS
========================================================= */

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.9, ease: "easeOut" } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.15 },
  },
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.97, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

/* =========================================================
   ICONS
========================================================= */

function LocationIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M12 21s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="12" cy="9" r="2.5" strokeWidth="1.7" />
    </svg>
  );
}

function MailIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M4 6h16v12H4V6Z" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="m4 7 8 6 8-6" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  );
}

function ArrowIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path d="M5 12h14M14 7l5 5-5 5" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function SparkIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2l1.6 5.6L19 9l-5.4 1.4L12 16l-1.6-5.6L5 9l5.4-1.4L12 2z" />
    </svg>
  );
}

/* =========================================================
   CONFIG
========================================================= */

const WHATSAPP_NUMBER = SITE.whatsapp.replace(/[^0-9]/g, "");

const CONTACT_INFO = [
  {
    icon: LocationIcon,
    label: "Head Office",
    value: "Currency Nagar\nVijayawada, Andhra Pradesh, India",
    gradient: "from-[#4F6BFF] to-[#8B5CF6]",
    accent: "shadow-[0_8px_24px_-8px_rgba(79,107,255,.5)]",
  },
  {
    icon: MailIcon,
    label: "Email Us",
    value: SITE.email,
    href: `mailto:${SITE.email}`,
    gradient: "from-[#06B6D4] to-[#4F6BFF]",
    accent: "shadow-[0_8px_24px_-8px_rgba(6,182,212,.5)]",
  },
  {
    icon: PhoneIcon,
    label: "Call Us",
    value: "+91 73309 37354",
    href: "tel:+917330937354",
    gradient: "from-[#F472B6] to-[#8B5CF6]",
    accent: "shadow-[0_8px_24px_-8px_rgba(244,114,182,.5)]",
  },
  {
    icon: WhatsAppIcon,
    label: "WhatsApp",
    value: "Chat with us instantly",
    href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
      "Hi FlowFoundry! 👋 I'd like to know more about your services."
    )}`,
    external: true,
    gradient: "from-[#25D366] to-[#128C7E]",
    accent: "shadow-[0_8px_24px_-8px_rgba(37,211,102,.5)]",
  },
];

/* =========================================================
   REUSABLE FIELD COMPONENTS
========================================================= */

function Field({
  label,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#64708B]"
      >
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-[#E3E8F1] bg-[#FAFBFD] px-4 py-3 text-sm text-[#0F1B3D] placeholder:text-[#A8B0C2] transition-all duration-200 focus:border-[#4F6BFF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F6BFF]/10"
      />
    </div>
  );
}

function TextArea({
  label,
  name,
  placeholder,
  value,
  onChange,
  required,
}: {
  label: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}) {
  return (
    <div className="group">
      <label
        htmlFor={name}
        className="mb-1.5 block text-[11px] font-semibold uppercase tracking-wider text-[#64708B]"
      >
        {label}
      </label>
      <textarea
        id={name}
        name={name}
        rows={5}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full resize-y rounded-xl border border-[#E3E8F1] bg-[#FAFBFD] px-4 py-3 text-sm text-[#0F1B3D] placeholder:text-[#A8B0C2] transition-all duration-200 focus:border-[#4F6BFF] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#4F6BFF]/10"
      />
    </div>
  );
}

/* =========================================================
   CONTACT PAGE
========================================================= */

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const messageLines = [
      "Hello FlowFoundry! 👋",
      "",
      "I'd like to get in touch. Here are my details:",
      "",
      `*Name:* ${formData.name || "—"}`,
      `*Company:* ${formData.company || "—"}`,
      `*Phone:* ${formData.phone || "—"}`,
      `*Email:* ${formData.email || "—"}`,
      `*Subject:* ${formData.subject || "—"}`,
      "",
      "*Message:*",
      formData.message || "—",
      "",
      "— Sent from the FlowFoundry website",
    ];

    const message = messageLines.join("\n");
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      {/* =====================================================
          HERO
      ===================================================== */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative w-full overflow-hidden bg-[#0A1330]"
      >
        {/* Background layers */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-25"
            style={{ backgroundImage: "url('/images/contact.png')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#0A1330]/85 via-[#0A1330]/75 to-[#0A1330]/95" />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
          {/* Ambient orbs */}
          <div className="absolute -left-32 top-10 h-80 w-80 rounded-full bg-[#4F6BFF]/25 blur-[120px]" />
          <div className="absolute -right-24 bottom-0 h-96 w-96 rounded-full bg-[#8B5CF6]/25 blur-[130px]" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 pb-32 pt-20 sm:px-6 sm:pb-40 sm:pt-28 lg:px-8 lg:pb-48 lg:pt-32">
          <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            {/* Left: Copy */}
            <div>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm"
              >
                <SparkIcon className="h-3.5 w-3.5 text-[#8B5CF6]" />
                <span className="text-xs font-medium text-white/85">
                  Let&apos;s talk
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="mt-6 text-4xl font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-5xl lg:text-[64px]"
              >
                Let&apos;s build something
                <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#4F6BFF] to-[#06B6D4] bg-clip-text text-transparent">
                  remarkable together.
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="mt-6 max-w-[540px] text-base leading-7 text-white/70 sm:text-lg"
              >
                FlowFoundry is ready to provide the right solution according
                to your needs. Tell us about your project and we&apos;ll get
                back within one business day.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap items-center gap-3"
              >
                <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                  </span>
                  <span className="text-xs font-medium text-white/80">
                    Available for new projects
                  </span>
                </div>

                {/* WhatsApp quick action */}
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi FlowFoundry! 👋 I'd like to discuss a project."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2.5 rounded-full border border-[#25D366]/30 bg-[#25D366]/10 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/20"
                >
                  <WhatsAppIcon className="h-3.5 w-3.5 text-[#25D366]" />
                  <span className="text-xs font-semibold text-[#25D366]">
                    Chat on WhatsApp
                  </span>
                  <ArrowIcon className="h-3 w-3 text-[#25D366] transition-transform duration-300 group-hover:translate-x-0.5" />
                </a>
              </motion.div>
            </div>

            {/* Right: Quick contact cards */}
            <motion.div
              variants={staggerContainer}
              className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1"
            >
              {[
                {
                  icon: MailIcon,
                  label: "Email",
                  value: SITE.email,
                  href: `mailto:${SITE.email}`,
                  gradient: "from-[#4F6BFF] to-[#8B5CF6]",
                  shadow: "shadow-[0_8px_24px_-8px_rgba(79,107,255,.6)]",
                },
                {
                  icon: PhoneIcon,
                  label: "Phone",
                  value: "+91 73309 37354",
                  href: "tel:+917330937354",
                  gradient: "from-[#F472B6] to-[#8B5CF6]",
                  shadow: "shadow-[0_8px_24px_-8px_rgba(244,114,182,.6)]",
                },
                {
                  icon: WhatsAppIcon,
                  label: "WhatsApp",
                  value: "Instant reply",
                  href: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi FlowFoundry! 👋"
                  )}`,
                  external: true,
                  gradient: "from-[#25D366] to-[#128C7E]",
                  shadow: "shadow-[0_8px_24px_-8px_rgba(37,211,102,.6)]",
                },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target={item.external ? "_blank" : undefined}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  variants={fadeInUp}
                  whileHover={{ y: -3 }}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.04] p-4 backdrop-blur-md transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07]"
                >
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white ${item.shadow}`}
                  >
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-medium uppercase tracking-wider text-white/50">
                      {item.label}
                    </p>
                    <p className="truncate text-sm font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                  <ArrowIcon className="h-4 w-4 text-white/40 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-white" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Curved divider */}
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-[#F0F4FA] to-transparent" />
      </motion.section>

      {/* =====================================================
          CONTACT FORM + INFO
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        variants={staggerContainer}
        className="relative bg-[#F0F4FA] pb-16 sm:pb-20"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            className="-mt-24 overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-20px_rgba(15,27,61,.18)] ring-1 ring-black/[0.03] sm:-mt-28 lg:-mt-32"
          >
            <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
              {/* LEFT: Info panel */}
              <div className="relative overflow-hidden border-b border-[#EDF0F6] bg-gradient-to-br from-[#0F1B3D] to-[#1A2340] p-8 sm:p-10 lg:border-b-0 lg:border-r lg:p-12">
                {/* Ambient orbs */}
                <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#4F6BFF]/25 blur-[90px]" />
                <div className="pointer-events-none absolute -bottom-24 -left-16 h-72 w-72 rounded-full bg-[#8B5CF6]/20 blur-[100px]" />

                <div className="relative">
                  <h2 className="text-2xl font-bold text-white sm:text-3xl">
                    Get in touch
                  </h2>
                  <p className="mt-3 max-w-[380px] text-sm leading-6 text-white/60">
                    We&apos;re here to answer your questions and help you
                    explore how AI, automation, and custom software can
                    transform your business.
                  </p>

                  <div className="mt-10 space-y-5">
                    {CONTACT_INFO.map((item, i) => (
                      <motion.div
                        key={i}
                        variants={fadeInUp}
                        className="flex items-start gap-4"
                      >
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${item.gradient} text-white ${item.accent}`}
                        >
                          <item.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
                            {item.label}
                          </p>
                          {item.href ? (
                            <a
                              href={item.href}
                              target={item.external ? "_blank" : undefined}
                              rel={item.external ? "noopener noreferrer" : undefined}
                              className={`mt-0.5 block text-sm font-medium text-white/90 transition-colors ${
                                item.label === "WhatsApp"
                                  ? "hover:text-[#25D366]"
                                  : "hover:text-[#8B5CF6]"
                              }`}
                            >
                              {item.value}
                            </a>
                          ) : (
                            <p className="mt-0.5 whitespace-pre-line text-sm font-medium text-white/90">
                              {item.value}
                            </p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Divider */}
                  <div className="my-8 h-px bg-white/10" />

                  {/* WhatsApp CTA card */}
                  <motion.a
                    variants={fadeInUp}
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      "Hi FlowFoundry! 👋 I'd like to get in touch."
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -3 }}
                    className="group flex items-center gap-3 rounded-2xl border border-[#25D366]/30 bg-[#25D366]/10 p-4 transition-all duration-300 hover:border-[#25D366]/50 hover:bg-[#25D366]/20"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#25D366] to-[#128C7E] text-white shadow-[0_8px_24px_-8px_rgba(37,211,102,.6)]">
                      <WhatsAppIcon className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-white">
                        Prefer WhatsApp?
                      </p>
                      <p className="text-xs text-white/60">
                        Get a reply within minutes
                      </p>
                    </div>
                    <ArrowIcon className="h-4 w-4 text-[#25D366] transition-transform duration-300 group-hover:translate-x-1" />
                  </motion.a>

                  {/* Trust note */}
                  <p className="mt-6 text-xs leading-6 text-white/50">
                    <span className="font-semibold text-white/80">
                      Typical response time:
                    </span>{" "}
                    Under 1 business day via email. Immediate on WhatsApp.
                  </p>
                </div>
              </div>

              {/* RIGHT: Form */}
              <div className="p-8 sm:p-10 lg:p-12">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#0F1B3D] sm:text-3xl">
                      Send us a message
                    </h2>
                    <p className="mt-2 text-sm leading-6 text-[#64708B]">
                      Fill in the form and we&apos;ll open WhatsApp with your
                      details ready to send.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      name="name"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Company"
                      name="company"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 00000 00000"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                    <Field
                      label="Email"
                      name="email"
                      type="email"
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <Field
                    label="Subject"
                    name="subject"
                    placeholder="What is this about?"
                    value={formData.subject}
                    onChange={handleChange}
                  />

                  <TextArea
                    label="Message"
                    name="message"
                    placeholder="Tell us about your project, goals, or questions..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                  />

                  {/* Submit buttons */}
                  <div className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
                    <button
                      type="submit"
                      className="group relative flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gradient-to-r from-[#25D366] to-[#1EBE5A] px-6 py-4 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(37,211,102,.7)]"
                    >
                      <WhatsAppIcon className="h-5 w-5" />
                      Send via WhatsApp
                      <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>

                    <a
                      href={`mailto:${SITE.email}?subject=${encodeURIComponent(
                        formData.subject || "Enquiry from FlowFoundry website"
                      )}&body=${encodeURIComponent(
                        `Name: ${formData.name}\nCompany: ${formData.company}\nPhone: ${formData.phone}\nEmail: ${formData.email}\n\n${formData.message}`
                      )}`}
                      className="group flex w-full items-center justify-center gap-2 rounded-xl border border-[#E3E8F1] bg-[#FAFBFD] px-6 py-4 text-sm font-semibold text-[#0F1B3D] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#4F6BFF]/30 hover:bg-white hover:shadow-[0_10px_30px_-10px_rgba(79,107,255,.35)]"
                    >
                      <MailIcon className="h-4 w-4" />
                      Email Instead
                    </a>
                  </div>

                  <p className="text-center text-xs text-[#8A92A6]">
                    WhatsApp opens with your message ready to send. No data is
                    stored on our servers.
                  </p>
                </form>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          MAP
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn}
        className="w-full bg-[#F0F4FA] pb-16 sm:pb-20"
      >
        <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
          <motion.div
            variants={scaleIn}
            className="relative overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_-20px_rgba(15,27,61,.15)] ring-1 ring-black/[0.03]"
          >
            <div className="h-[380px] w-full sm:h-[440px] lg:h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7650.282550480341!2d80.68470445!3d16.5189639!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35e4d58eddf989%3A0xc59ca086dfcafab8!2scurrency%20nagar%2C%20Vijayawada%2C%20Andhra%20Pradesh!5e0!3m2!1sen!2sin!4v1789016728504!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title="FlowFoundry AI Solutions location in Currency Nagar, Vijayawada"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeInUp}
        className="bg-[#F0F4FA] px-5 pb-20 sm:px-6 sm:pb-24 lg:px-8"
      >
        <div className="mx-auto max-w-[1200px]">
          <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#0F1B3D] via-[#1A2340] to-[#0F1B3D] px-6 py-16 text-center sm:px-10 sm:py-20">
            {/* Background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[#4F6BFF]/25 blur-[110px]" />
              <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-[#8B5CF6]/25 blur-[120px]" />
              <div className="absolute -bottom-20 right-1/4 h-72 w-72 rounded-full bg-[#25D366]/15 blur-[110px]" />
              <div
                className="absolute inset-0 opacity-[0.06]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
                  backgroundSize: "48px 48px",
                }}
              />
            </div>

            <div className="relative z-10">
              <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur-sm">
                <SparkIcon className="h-3.5 w-3.5 text-[#8B5CF6]" />
                <span className="text-xs font-medium text-white/85">
                  Start a conversation
                </span>
              </div>

              <h2 className="mx-auto mt-6 max-w-3xl text-3xl font-light leading-[1.15] tracking-[-0.02em] text-white sm:text-4xl lg:text-[44px]">
                Start with the business problem.
                <br />
                <span className="bg-gradient-to-r from-[#8B5CF6] via-[#4F6BFF] to-[#06B6D4] bg-clip-text font-semibold text-transparent">
                  We&apos;ll help design the system.
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                AI agents, automation, custom software, and integrations are
                tools. The goal is building a better way for your business to
                work.
              </p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                    "Hi FlowFoundry! 👋 I'd like to discuss how AI and automation can help my business."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-[#25D366] to-[#1EBE5A] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_30px_-10px_rgba(37,211,102,.55)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-12px_rgba(37,211,102,.75)]"
                >
                  <WhatsAppIcon className="h-4 w-4" />
                  Chat on WhatsApp
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </a>

                <a
                  href={`mailto:${SITE.email}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/10"
                >
                  <MailIcon className="h-4 w-4" />
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    </>
  );
}