"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUp, EnvelopeSimple, WhatsappLogo, Clock } from "@phosphor-icons/react";
import { SITE, SOCIALS } from "@/lib/site";
import { Arrow, Button, buttonClass, LiveDot } from "./ui";
import { Reveal, fadeUp, Magnetic } from "./motion";
import { Logo } from "./Header";

/**
 * Footer navigation. Mirrors the real site architecture so every indexable
 * page is reachable from every page — the cheapest possible guard against
 * orphan pages, and it distributes internal link equity site-wide.
 */
const COLUMNS = [
  {
    title: "Solutions",
    links: [
      { label: "AI Voice Agents", href: "/solutions/ai-voice-agents" },
      { label: "WhatsApp Automation", href: "/solutions/whatsapp-automation" },
      { label: "Workflow Automation", href: "/solutions/workflow-automation" },
      { label: "CRM Automation", href: "/solutions/crm-automation" },
      { label: "Business Portals", href: "/solutions/custom-business-portals" },
      { label: "Shopify Automation", href: "/solutions/shopify-automation" },
    ],
  },
  {
    title: "Industries",
    links: [
      { label: "Dental Clinics", href: "/industries/dental-clinics" },
      { label: "Healthcare Clinics", href: "/industries/healthcare-clinics" },
      { label: "Real Estate", href: "/industries/real-estate" },
      { label: "eCommerce", href: "/industries/ecommerce" },
      { label: "Service Businesses", href: "/industries/local-service-businesses" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "How We Work", href: "/how-we-work" },
      { label: "Case Studies", href: "/case-studies" },
      { label: "Insights", href: "/insights" },
      { label: "Responsible Automation", href: "/responsible-automation" },
      { label: "LeadPulz AI", href: "/leadpulz" },
    ],
  },
];

const LEGAL = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
  { label: "Sitemap", href: "/sitemap.xml" },
];

const getWhatsAppUrl = () => {
  const phone = SITE.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${phone}?text=${message}`;
};

export default function Footer() {
  const year = new Date().getFullYear();
  const whatsappUrl = getWhatsAppUrl();

  return (
    <footer className="relative w-full overflow-hidden bg-ink text-white">
      <div className="mx-auto w-full max-w-[1400px] px-5 sm:px-8 lg:px-12">
        {/* CTA strip — left headline, right actions */}
        <Reveal
          amount={0.3}
          className="grid gap-8 border-b border-white/[0.06] py-14 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:py-20"
        >
          <motion.div variants={fadeUp}>
            <p className="font-mono text-2xs uppercase tracking-[0.18em] text-on-dark-muted">
              Ready when you are
            </p>
            <h2 className="mt-4 max-w-xl text-[clamp(1.9rem,4vw,3.2rem)] font-medium leading-[1.04] tracking-[-0.03em] text-balance">
              Have a process that should run itself?
            </h2>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="flex flex-col gap-3 sm:flex-row lg:justify-end"
          >
            <Magnetic>
              <Button href="/contact" variant="onDark" size="lg" className="w-full sm:w-auto">
                Book a consultation
                <Arrow />
              </Button>
            </Magnetic>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${buttonClass({ variant: "outlineOnDark", size: "lg" })} w-full sm:w-auto`}
            >
              <WhatsappLogo weight="fill" className="h-4 w-4 text-[#5fd39e]" />
              WhatsApp
            </a>
          </motion.div>
        </Reveal>

        {/* Main grid */}
        <Reveal
          amount={0.1}
          className="grid grid-cols-2 gap-x-6 gap-y-10 py-14 lg:grid-cols-[1.6fr_1fr_1fr_1fr_1.3fr] lg:gap-x-10 lg:py-16"
        >
          <motion.div variants={fadeUp} className="col-span-2 lg:col-span-1">
            <Logo />
            <p className="mt-5 max-w-[36ch] text-sm leading-relaxed text-on-dark">
              AI agents, automation, and custom software built around the way
              your business actually works.
            </p>
            <div className="mt-5 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5">
              <LiveDot />
              <span className="font-mono text-2xs uppercase tracking-[0.12em] text-on-dark">
                Taking new projects
              </span>
            </div>
          </motion.div>

          {COLUMNS.map((col) => (
            <motion.nav key={col.title} variants={fadeUp} aria-label={col.title}>
              <h3 className="font-mono text-2xs uppercase tracking-[0.18em] text-on-dark-muted">
                {col.title}
              </h3>
              <ul className="mt-5 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l.href + l.label}>
                    <Link
                      href={l.href}
                      className="group/link inline-flex items-center gap-2 text-sm text-on-dark transition-colors duration-300 hover:text-white"
                    >
                      <span className="h-px w-0 bg-accent-dark transition-all duration-300 group-hover/link:w-3" />
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.nav>
          ))}

          <motion.div variants={fadeUp} className="min-w-0">
            <h3 className="font-mono text-2xs uppercase tracking-[0.18em] text-on-dark-muted">
              Get in touch
            </h3>
            <ul className="mt-5 divide-y divide-white/[0.06]">
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  className="group flex items-center gap-3 py-3 transition-colors"
                >
                  <EnvelopeSimple className="h-4 w-4 shrink-0 text-on-dark-muted transition-colors group-hover:text-white" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-muted">
                      Email
                    </span>
                    <span className="mt-0.5 block break-all text-[13px] text-white sm:text-sm">
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
                  className="group flex items-center gap-3 py-3"
                >
                  <WhatsappLogo className="h-4 w-4 shrink-0 text-on-dark-muted transition-colors group-hover:text-[#5fd39e]" />
                  <span className="min-w-0">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-muted">
                      WhatsApp
                    </span>
                    <span className="mt-0.5 block text-sm text-white">
                      +91 73309 37354
                    </span>
                  </span>
                </a>
              </li>
              <li className="flex items-center gap-3 py-3">
                <Clock className="h-4 w-4 shrink-0 text-on-dark-muted" />
                <span className="min-w-0">
                  <span className="block font-mono text-[10px] uppercase tracking-[0.14em] text-on-dark-muted">
                    Response time
                  </span>
                  <span className="mt-0.5 block text-sm text-white">
                    Within one business day
                  </span>
                </span>
              </li>
            </ul>

            {SOCIALS.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {SOCIALS.map((s) => (
                  <a
                    key={s.href}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full border border-white/10 px-3 py-1.5 text-xs text-on-dark transition-colors hover:border-white/30 hover:text-white"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            )}
          </motion.div>
        </Reveal>

        {/* Giant wordmark */}
        <div className="relative select-none overflow-hidden border-t border-white/[0.06] pt-10" aria-hidden="true">
          <motion.p
            initial={{ y: "30%", opacity: 0 }}
            whileInView={{ y: "0%", opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="whitespace-nowrap text-center text-[clamp(3.5rem,12.5vw,12rem)] font-semibold leading-[0.85] tracking-[-0.05em] text-white/[0.05]"
          >
            FlowFoundry
          </motion.p>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-start gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-2xs text-on-dark-muted">
            &copy; {year} {SITE.name}. Built in India, working remotely.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {LEGAL.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-mono text-2xs uppercase tracking-[0.12em] text-on-dark-muted transition-colors hover:text-white"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="#main"
              className="group inline-flex items-center gap-1.5 font-mono text-2xs uppercase tracking-[0.12em] text-on-dark-muted transition-colors hover:text-white"
            >
              Top
              <ArrowUp className="h-3 w-3 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
