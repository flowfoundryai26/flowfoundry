"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NAV, SITE } from "@/lib/site";

/* =========================================================
   HELPERS
========================================================= */

const getWhatsAppUrl = () => {
  const phone = SITE.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${phone}?text=${message}`;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/* =========================================================
   ICONS
========================================================= */

function Arrow({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`h-4 w-4 transition-transform duration-200 group-hover/btn:translate-x-0.5 ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
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

function ChevronDown({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="10"
      height="10"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="m6 9 6 6 6-6"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   LOGO
========================================================= */

export function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name}, home`}
      className="group flex shrink-0 items-center gap-3"
    >
      <div className="relative h-9 w-9 sm:h-10 sm:w-10">
        <div className="absolute inset-0 rounded-md bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] opacity-0 blur-md transition-opacity duration-300 group-hover:opacity-40" />
        <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-md border border-slate-200/70 bg-white shadow-sm transition-transform duration-300 group-hover:-rotate-3 group-hover:scale-105">
          <Image
            src="/logo.png"
            alt={`${SITE.short} logo`}
            width={60}
            height={60}
            className="rounded-full object-cover"
            priority
            unoptimized
          />
        </div>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`text-base font-semibold tracking-[-0.02em] sm:text-lg ${
            dark ? "text-white" : "text-ink"
          }`}
        >
          FlowFoundry
        </span>
        <span
          className={`mt-0.5 text-2xs font-medium uppercase tracking-[0.18em] ${
            dark ? "text-on-dark-quiet" : "text-muted"
          }`}
        >
          AI Solutions
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   HEADER
========================================================= */

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const whatsappUrl = getWhatsAppUrl();

  // Scroll sentinel
  useEffect(() => {
    const sentinel = document.createElement("div");
    sentinel.style.cssText =
      "position:absolute;top:0;height:1px;width:1px;pointer-events:none";
    document.body.prepend(sentinel);
    const io = new IntersectionObserver(
      ([e]) => setScrolled(!e.isIntersecting),
      { threshold: 0 }
    );
    io.observe(sentinel);
    return () => {
      io.disconnect();
      sentinel.remove();
    };
  }, []);

  // Close drawer on route change
  useEffect(() => setOpen(false), [pathname]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Active route
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${
        scrolled
          ? "border-b border-slate-200/60 bg-white/85 shadow-[0_8px_30px_-12px_rgba(15,27,61,0.08)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto w-full max-w-[1400px] px-4 sm:px-6 md:px-8 lg:px-10">
        <div
          className={`flex items-center justify-between gap-4 transition-all duration-300 ${
            scrolled ? "h-[64px] sm:h-[68px]" : "h-[72px] sm:h-[80px]"
          }`}
        >
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-0.5 lg:flex"
            aria-label="Primary"
          >
            {NAV.map((item) => {
              const active = isActive(item.href);
              return (
                <div key={item.href} className="group relative">
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative flex items-center gap-1.5 rounded-md px-3.5 py-2 text-sm font-medium transition-colors duration-200 ${
                      active
                        ? "text-ink"
                        : "text-slate hover:text-ink"
                    }`}
                  >
                    <span className="relative">
                      {item.label}
                      {item.badge && (
                        <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6] align-middle" />
                      )}
                    </span>

                    {item.children && (
                      <ChevronDown className="transition-transform duration-200 group-hover:rotate-180" />
                    )}

                    {/* Active underline */}
                    {active && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-gradient-to-r from-[#4F6BFF] to-[#8B5CF6]"
                        transition={{ duration: 0.3, ease: EASE }}
                      />
                    )}

                    {/* Hover underline */}
                    {!active && (
                      <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center scale-x-0 rounded-full bg-slate-300 transition-transform duration-300 group-hover:scale-x-100" />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && (
                    <div className="invisible absolute left-0 top-full z-10 w-[300px] translate-y-2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="overflow-hidden rounded-lg border border-slate-200/70 bg-white/95 p-1.5 shadow-[0_20px_50px_-20px_rgba(15,27,61,0.2)] backdrop-blur-xl">
                        {item.children.map((child: any) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item block rounded-md px-3.5 py-2.5 transition-colors duration-150 hover:bg-slate-50"
                          >
                            <div className="flex items-center justify-between gap-3">
                              <div>
                                <p className="text-xs font-medium text-slate group-hover/item:text-[#4F6BFF]">
                                  {child.label}
                                </p>
                                {child.description && (
                                  <p className="mt-0.5 text-2xs leading-5 text-muted">
                                    {child.description}
                                  </p>
                                )}
                              </div>
                              <Arrow className="h-3.5 w-3.5 shrink-0 text-muted opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:text-[#4F6BFF] group-hover/item:opacity-100" />
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className="group/wa inline-flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-medium text-slate transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
            >
              <WhatsAppIcon className="h-4 w-4 text-emerald-600" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>

            <Link
              href="/contact"
              className="group/btn inline-flex items-center gap-1.5 rounded-md bg-[#0A1330] px-5 py-2.5 text-xs font-medium text-white shadow-[0_10px_30px_-12px_rgba(10,19,48,0.5)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#0F1B3D] hover:shadow-[0_16px_40px_-12px_rgba(10,19,48,0.55)] active:translate-y-0 active:scale-[0.98]"
            >
              Get Started
              <Arrow />
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="relative flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 bg-white transition-all duration-200 hover:bg-slate-50 active:scale-95 lg:hidden"
          >
            <span className="relative block h-[1.5px] w-[18px] bg-slate-800">
              <span
                className={`absolute left-0 block h-[1.5px] w-[18px] bg-slate-800 transition-all duration-300 ${
                  open ? "top-0 rotate-45" : "-top-[6px]"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-[18px] bg-slate-800 transition-all duration-300 ${
                  open ? "top-0 -rotate-45" : "top-[6px]"
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="max-h-[calc(100dvh-72px)] w-full overflow-y-auto border-t border-slate-200/70 bg-white/98 px-5 pb-8 pt-4 backdrop-blur-xl lg:hidden"
          >
            {/* Nav items */}
            <nav className="space-y-1">
              {NAV.map((item) => {
                const active = isActive(item.href);
                const isExpanded = expanded === item.label;

                return (
                  <div key={item.href}>
                    <div className="flex items-center gap-1">
                      <Link
                        href={item.href}
                        className={`flex-1 rounded-md px-3 py-3 text-sm font-medium transition-colors duration-200 ${
                          active
                            ? "bg-slate-50 text-ink"
                            : "text-slate hover:bg-slate-50"
                        }`}
                      >
                        <span className="flex items-center gap-2">
                          {item.label}
                          {item.badge && (
                            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gradient-to-br from-[#4F6BFF] to-[#8B5CF6]" />
                          )}
                        </span>
                      </Link>

                      {item.children && (
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((v) =>
                              v === item.label ? null : item.label
                            )
                          }
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="flex h-10 w-10 items-center justify-center rounded-md text-muted transition-all duration-200 hover:bg-slate-50 hover:text-slate"
                        >
                          <ChevronDown
                            className={`transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Submenu */}
                    {item.children && (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="ml-3 mt-1 space-y-0.5 border-l border-slate-200 pl-3">
                              {item.children.map((child: any) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block rounded-md px-3 py-2.5 text-sm text-slate transition-colors duration-150 hover:bg-slate-50 hover:text-[#4F6BFF]"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Mobile actions */}
            <div className="mt-6 grid gap-2.5 border-t border-slate-100 pt-6">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm font-medium text-emerald-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-emerald-100 active:translate-y-0"
              >
                <WhatsAppIcon className="h-4.5 w-4.5" />
                Chat on WhatsApp
              </a>
              <Link
                href="/contact"
                className="group/btn inline-flex w-full items-center justify-center gap-1.5 rounded-md bg-[#0A1330] px-4 py-3.5 text-sm font-medium text-white shadow-[0_10px_30px_-12px_rgba(10,19,48,0.5)] transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0"
              >
                Book a Free Consultation
                <Arrow />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}