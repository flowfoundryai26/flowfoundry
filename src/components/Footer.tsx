"use client";

import Image from "next/image";
import Link from "next/link";
import { SITE, SOCIALS } from "@/lib/site";
import { Arrow, Button, buttonClass } from "./ui";
import { motion, Variants } from "framer-motion";

/* =========================================================
   MOTION
========================================================= */

const EASE = [0.22, 1, 0.36, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: EASE },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

/* =========================================================
   DATA
========================================================= */

const COLUMNS = [
  {
    title: "Company",
    links: [
      { label: "Home", href: "/" },
      { label: "About Us", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Solutions", href: "/solutions" },
      { label: "Portfolio", href: "/portfolio" },
      { label: "LeadPulz", href: "/leadpulz" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "AI Agents", href: "/services#ai-agents" },
      { label: "Workflow Automation", href: "/services#workflow-automation" },
      { label: "Custom Software", href: "/services#custom-software" },
      { label: "Web Development", href: "/services#web-development" },
      { label: "eCommerce", href: "/services#ecommerce" },
      { label: "Integrations", href: "/services#integrations" },
    ],
  },
  {
    title: "Product",
    links: [
      { label: "LeadPulz", href: "/leadpulz" },
      { label: "AI Voice Agents", href: "/leadpulz#conversations" },
      { label: "Lead Qualification", href: "/leadpulz#qualification" },
      { label: "Appointment Automation", href: "/leadpulz#booking" },
    ],
  },
];

const LEGAL_LINKS = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

/* =========================================================
   HELPERS
========================================================= */

const getWhatsAppUrl = () => {
  const phone = SITE.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${phone}?text=${message}`;
};

/* =========================================================
   ICONS
========================================================= */

function MailIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.7}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function ClockIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" strokeWidth={1.7} />
      <path d="M12 7v5l3 2" strokeWidth={1.7} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowUpIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
      <path
        d="M12 19V5M5 12l7-7 7 7"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function SocialIcon({ label, className = "h-4 w-4" }: { label: string; className?: string }) {
  const key = label.toLowerCase();

  if (key.includes("linkedin")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }

  if (key.includes("twitter") || key === "x") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }

  if (key.includes("facebook")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    );
  }

  if (key.includes("instagram")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className} aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth={1.7} />
        <circle cx="12" cy="12" r="4" strokeWidth={1.7} />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  }

  if (key.includes("youtube")) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }

  return (
    <span className={`text-2xs font-semibold ${className}`}>
      {label.charAt(0).toUpperCase()}
    </span>
  );
}

/* =========================================================
   FOOTER
========================================================= */

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="relative w-full overflow-hidden bg-[#0A1330] text-white">
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.6) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
        <div className="absolute -left-40 top-0 h-72 w-72 rounded-full bg-[#4F6BFF]/20 blur-[130px] sm:h-96 sm:w-96" />
        <div className="absolute -right-40 bottom-0 h-72 w-72 rounded-full bg-[#8B5CF6]/20 blur-[130px] sm:h-96 sm:w-96" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10">
        {/* =====================================================
            TOP CTA STRIP
            Mobile  : centered
            sm+     : left-aligned headline, right-aligned buttons
        ===================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="relative border-b border-white/10 py-8 sm:py-10 lg:py-12"
        >
          <div className="flex flex-col gap-5 text-center lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:text-left">
            <div className="min-w-0">
              <p className="text-xs font-medium text-on-dark-quiet">
                Ready when you are
              </p>
              <h2 className="mx-auto mt-2.5 max-w-xl text-xl font-light leading-[1.2] tracking-[-0.02em] text-white sm:mt-3 sm:text-2xl lg:mx-0 lg:text-4xl">
                Have a project in mind?{" "}
                <span className="bg-gradient-to-r from-[#06B6D4] via-[#4F6BFF] to-[#8B5CF6] bg-clip-text text-transparent">
                  Let&apos;s talk.
                </span>
              </h2>
            </div>

            <div className="flex flex-col items-center gap-2.5 sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-3 lg:justify-end lg:shrink-0">
              <Button
                href="/contact"
                variant="onDark"
                size="sm"
                className="w-full sm:w-auto"
              >
                Book a Consultation
                <Arrow />
              </Button>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass({ variant: "outlineOnDark", size: "sm" })} w-full sm:w-auto`}
              >
                <WhatsAppIcon className="h-4 w-4 text-emerald-400" />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </motion.div>

        {/* =====================================================
            MAIN GRID
            Mobile  : 2 cols
              Row 1 — Brand (full width, centered)
              Row 2 — Company | Services
              Row 3 — Product | Get in touch
            lg      : 5-col layout [brand, col, col, col, connect]
        ===================================================== */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={stagger}
          className="grid grid-cols-2 gap-x-6 gap-y-9 py-11 sm:gap-x-8 sm:gap-y-11 lg:grid-cols-[1.3fr_repeat(3,1fr)_1.4fr] lg:gap-x-8 lg:gap-y-0 lg:py-16 xl:gap-x-10"
        >
          {/* Brand — spans both mobile columns, centered on mobile */}
          <motion.div
            variants={fadeUp}
            className="col-span-2 flex flex-col items-center text-center lg:col-span-1 lg:items-start lg:text-left"
          >
            <Link href="/" className="group inline-flex items-center gap-3">
              <div className="relative h-10 w-10 shrink-0 sm:h-11 sm:w-11">
                <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] opacity-30 blur-md transition-opacity duration-300 group-hover:opacity-50" />
                <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 group-hover:-rotate-3">
                  <Image
                    src="/logo.png"
                    alt="FlowFoundry Logo"
                    width={60}
                    height={60}
                    className="rounded-full object-cover"
                    unoptimized
                  />
                </div>
              </div>
              <div className="flex flex-col leading-none text-left">
                <span className="text-base font-semibold tracking-[-0.02em] text-white">
                  FlowFoundry
                </span>
                <span className="mt-1 text-2xs font-medium uppercase tracking-[0.18em] text-on-dark-quiet">
                  AI Solutions
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-[42ch] text-xs leading-6 text-on-dark-muted sm:mt-5 sm:text-sm">
              AI agents, automation, and custom software built around the way
              your business works.
            </p>

            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1.5 sm:mt-5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-2xs font-medium text-emerald-400">
                Available for new projects
              </span>
            </div>
          </motion.div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <motion.nav
              key={col.title}
              variants={fadeUp}
              aria-label={col.title}
              className="min-w-0"
            >
              <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-on-dark-quiet">
                {col.title}
              </h3>
              <ul className="mt-3.5 space-y-2.5 sm:mt-5 sm:space-y-3">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="group/link inline-flex items-center gap-1.5 text-xs text-on-dark-muted transition-colors duration-200 hover:text-white sm:text-sm"
                    >
                      <span className="relative">
                        {l.label}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white/40 transition-transform duration-300 group-hover/link:scale-x-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          {/* Connect rail — beside Product on mobile, 5th column on lg */}
          <motion.div
            variants={fadeUp}
            className="min-w-0"
          >
            <h3 className="text-2xs font-semibold uppercase tracking-[0.18em] text-on-dark-quiet">
              Get in touch
            </h3>

            <ul className="mt-3.5 space-y-1 sm:mt-5">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-on-dark-muted transition-colors duration-200 group-hover:border-white/20 group-hover:text-white">
                    <MailIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-2xs font-medium uppercase tracking-wider text-on-dark-quiet">
                      Email
                    </span>
                    <span className="mt-1 block truncate text-xs font-medium text-white">
                      {SITE.email}
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group -mx-2 flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors duration-200 hover:bg-white/[0.04]"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-emerald-400/20 bg-emerald-400/5 text-emerald-400 transition-colors duration-200 group-hover:border-emerald-400/40">
                    <WhatsAppIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-2xs font-medium uppercase tracking-wider text-on-dark-quiet">
                      WhatsApp
                    </span>
                    <span className="mt-1 block text-xs font-medium text-white">
                      Chat with us
                    </span>
                  </span>
                </a>
              </li>

              <li>
                <div className="-mx-2 flex items-center gap-3 px-2 py-1.5">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-white/10 bg-white/5 text-on-dark-muted">
                    <ClockIcon className="h-4 w-4" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-2xs font-medium uppercase tracking-wider text-on-dark-quiet">
                      Response time
                    </span>
                    <span className="mt-1 block text-xs font-medium text-white">
                      Within 24 hours
                    </span>
                  </span>
                </div>
              </li>
            </ul>

            {/* Socials */}
            {SOCIALS.length > 0 && (
              <div className="mt-5 sm:mt-6">
                <p className="mb-3 text-2xs font-semibold uppercase tracking-[0.18em] text-on-dark-quiet">
                  Follow
                </p>
                <div className="flex flex-wrap gap-2">
                  {SOCIALS.map((s) => (
                    <a
                      key={s.href}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 text-on-dark-muted transition-all duration-200 hover:-translate-y-0.5 hover:border-white/25 hover:bg-white/10 hover:text-white"
                    >
                      <SocialIcon label={s.label} className="h-4 w-4" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* =====================================================
            BOTTOM BAR
        ===================================================== */}
        <div className="flex flex-col items-center gap-3.5 border-t border-white/10 py-6 sm:flex-row sm:items-center sm:justify-between sm:gap-5 sm:py-7">
          <p className="text-center text-2xs text-on-dark-quiet sm:text-left sm:text-xs">
            &copy; {currentYear} {SITE.name}. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:justify-end sm:gap-x-6">
            {LEGAL_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-2xs text-on-dark-quiet transition-colors duration-200 hover:text-white sm:text-xs"
              >
                {l.label}
              </Link>
            ))}

            <a
              href="#top"
              className="group inline-flex items-center gap-1.5 text-2xs text-on-dark-quiet transition-colors duration-200 hover:text-white sm:text-xs"
            >
              Back to top
              <ArrowUpIcon className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}