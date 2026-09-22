"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CaretDown, WhatsappLogo } from "@phosphor-icons/react";
import { NAV, SITE } from "@/lib/site";
import { Arrow, buttonClass } from "./ui";
import { EASE, SPRING_SNAPPY } from "./motion";

const getWhatsAppUrl = () => {
  const phone = SITE.whatsapp.replace(/[^0-9]/g, "");
  const message = encodeURIComponent(SITE.whatsappMessage);
  return `https://wa.me/${phone}?text=${message}`;
};

/* =========================================================
   LOGO
========================================================= */

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${SITE.name}, home`}
      className={`group flex shrink-0 items-center gap-3 ${className}`}
    >
      <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-md border border-white/10 bg-ink-2 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6">
        <Image
          src="/logo.png"
          alt=""
          width={36}
          height={36}
          className="h-full w-full object-cover"
          priority
          unoptimized
        />
      </span>
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-[-0.02em] text-white">
          FlowFoundry
        </span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-on-dark-muted">
          AI Solutions
        </span>
      </span>
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
  const [hover, setHover] = useState<string | null>(null);
  const [expanded, setExpanded] = useState<string | null>(null);
  const whatsappUrl = getWhatsAppUrl();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => {
    const base = href.split("#")[0];
    if (base === "/") return pathname === "/";
    return pathname === base || pathname.startsWith(base + "/");
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-[background-color,border-color,backdrop-filter] duration-500 ${
          scrolled
            ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] w-full max-w-[1400px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
          <Logo />

          {/* Desktop nav */}
          <nav
            aria-label="Primary"
            className="hidden items-center lg:flex"
            onMouseLeave={() => setHover(null)}
          >
            {NAV.map((item) => {
              const active = isActive(item.href);
              const hovered = hover === item.href;
              return (
                <div
                  key={item.href}
                  className="group relative"
                  onMouseEnter={() => setHover(item.href)}
                >
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative z-10 flex items-center gap-1.5 rounded-full px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300 ${
                      active || hovered ? "text-white" : "text-on-dark"
                    }`}
                  >
                    {item.label}
                    {item.children ? (
                      <CaretDown
                        weight="bold"
                        className="h-3 w-3 opacity-60 transition-transform duration-300 group-hover:rotate-180"
                        aria-hidden="true"
                      />
                    ) : null}
                  </Link>

                  {(hovered || (!hover && active)) && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={SPRING_SNAPPY}
                      className="absolute inset-0 rounded-full bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
                    />
                  )}

                  {/* Dropdown */}
                  {item.children ? (
                    <div className="invisible absolute left-0 top-full z-20 w-[280px] translate-y-1 pt-3 opacity-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="overflow-hidden rounded-xl border border-white/10 bg-ink-2/95 p-1.5 shadow-dark backdrop-blur-xl">
                        {item.children.map((child, i) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="group/item flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-[13px] text-on-dark transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                          >
                            <span className="flex items-center gap-3">
                              <span className="font-mono text-2xs text-on-dark-muted">
                                {String(i + 1).padStart(2, "0")}
                              </span>
                              {child.label}
                            </span>
                            <Arrow className="h-3.5 w-3.5 -translate-x-1 opacity-0 transition-all duration-300 group-hover/item:translate-x-0 group-hover/item:opacity-100" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 lg:flex">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat on WhatsApp"
              className={`${buttonClass({ variant: "outlineOnDark", size: "sm" })} px-3.5`}
            >
              <WhatsappLogo weight="fill" className="h-4 w-4 text-[#5fd39e]" />
              <span className="hidden xl:inline">WhatsApp</span>
            </a>
            <Link
              href="/contact"
              className={buttonClass({ variant: "onDark", size: "sm" })}
            >
              Start a project
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
            className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] transition-colors duration-300 hover:bg-white/[0.08] active:scale-95 lg:hidden"
          >
            <span className="relative block h-[14px] w-[18px]">
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "top-[6px] rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-[6px] block h-[1.5px] w-full bg-white transition-all duration-300 ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 block h-[1.5px] w-full bg-white transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                  open ? "top-[6px] -rotate-45" : "top-[12px]"
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="fixed inset-0 z-40 flex flex-col bg-ink pt-[72px] lg:hidden"
          >
            <motion.nav
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
              }}
              className="flex-1 overflow-y-auto px-6 py-6"
            >
              {NAV.map((item, i) => {
                const active = isActive(item.href);
                const isExpanded = expanded === item.label;
                return (
                  <motion.div
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 16 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
                    }}
                    className="border-b border-white/[0.06]"
                  >
                    <div className="flex items-center">
                      <Link
                        href={item.href}
                        className={`flex flex-1 items-baseline gap-4 py-4 text-2xl font-medium tracking-[-0.02em] ${
                          active ? "text-white" : "text-on-dark"
                        }`}
                      >
                        <span className="font-mono text-2xs text-on-dark-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                      </Link>
                      {item.children ? (
                        <button
                          type="button"
                          onClick={() =>
                            setExpanded((v) => (v === item.label ? null : item.label))
                          }
                          aria-expanded={isExpanded}
                          aria-label={`Toggle ${item.label} submenu`}
                          className="flex h-10 w-10 items-center justify-center rounded-full text-on-dark-muted transition-colors hover:bg-white/[0.06] hover:text-white"
                        >
                          <CaretDown
                            weight="bold"
                            className={`h-3.5 w-3.5 transition-transform duration-300 ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                      ) : null}
                    </div>

                    {item.children ? (
                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden"
                          >
                            <div className="mb-4 ml-9 space-y-1 border-l border-white/10 pl-4">
                              {item.children.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className="block py-2 text-sm text-on-dark transition-colors hover:text-white"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    ) : null}
                  </motion.div>
                );
              })}
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.5, ease: EASE }}
              className="grid gap-2.5 border-t border-white/[0.06] px-6 py-6"
            >
              <Link
                href="/contact"
                className={`${buttonClass({ variant: "onDark", size: "lg" })} w-full`}
              >
                Start a project
                <Arrow />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${buttonClass({ variant: "outlineOnDark", size: "lg" })} w-full`}
              >
                <WhatsappLogo weight="fill" className="h-4 w-4 text-[#5fd39e]" />
                Chat on WhatsApp
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
